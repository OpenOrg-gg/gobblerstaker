// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IGooTogether{
  function calculateInterest() external;
  function gooPoints() external view returns (address);
}

interface IGooBalanceProxy{
  function balanceOf(address) external view returns (uint256);
}

import "./IGooPoints.sol";

import "./uFragments.sol";

import "./IERC20.sol";

/// @title gooPoints token contract
/// @notice handles all minting/burning of gooPoints
/// @dev extends UFragments
contract gooPoints is UFragments, IGooPoints {
  address public _reserve;

  /// @notice any function with this modifier will call the pay_interest() function before any function logic is called
  modifier paysInterest() {
    IGooTogether(gooTogether).calculateInterest();
    _;
  }

  /// @notice initializer for contract
  /// @dev consider adding decimals?
  function initialize(address _proxyAddress, address _gooTogether) public {
    __UFragments_init("gooTogetherPoints", "GOOT", _gooTogether);
    _reserve = _proxyAddress;
  }

  /// @notice getter for name
  /// @return name of token
  function name() public view override(IGooPoints, ERC20Detailed) returns (string memory) {
    return super.name();
  }

  /// @notice getter for symbol
  /// @return symbol for token
  function symbol() public view override(IGooPoints, ERC20Detailed) returns (string memory) {
    return super.symbol();
  }

  /// @notice getter for decimals
  /// @return decimals for token
  function decimals() public view override(IGooPoints, ERC20Detailed) returns (uint8) {
    return super.decimals();
  }

  /// @notice getter for address of the reserve currency, or proxy address
  /// @return decimals for of reserve currency
  function reserveAddress() public view override returns (address) {
    return address(_reserve);
  }

  function currentReserve() public view returns (uint256){
    uint256 reserve = IGooBalanceProxy(_reserve).balanceOf(address(this));
    return reserve;
  }

  /// @notice admin function to adjust multiPoints
  function mint(uint256 multiPoints, address _user) external override paysInterest {
    require(msg.sender == gooTogether); 
    // see comments in the deposit function for an explaination of this math
    _gonBalances[_user] = _gonBalances[_user] + multiPoints * _gonsPerFragment;
    _totalSupply = _totalSupply + multiPoints;
    _totalGons = _totalGons + multiPoints * _gonsPerFragment;
    // emit both a mint and transfer event
    emit Mint(_user, multiPoints);
    emit Transfer(address(0), _user, multiPoints);
  }

  /// @notice admin function to burn gooPoints
  function burn(uint256 multiPoints, address _user) external override paysInterest {
    require(multiPoints != 0, "Cannot burn 0");
    require(msg.sender == gooTogether);
    // see comments in the deposit function for an explaination of this math
    _gonBalances[_user] = _gonBalances[_user] - multiPoints * _gonsPerFragment;
    _totalSupply = _totalSupply - multiPoints;
    _totalGons = _totalGons - multiPoints * _gonsPerFragment;
    // emit both a mint and transfer event
    emit Transfer(_user, address(0), multiPoints);
    emit Burn(_user, multiPoints);
  }

  /// @notice donates goo to the protocol reserve
  function donate(uint256 goo) external override paysInterest {
    require(msg.sender == gooTogether);
    _donation(goo);
  }


  /// @notice function for distributing the donation to all USDa holders
  /// @param amount amount of USDa to donate
  function _donation(uint256 amount) internal {
    _totalSupply = _totalSupply + amount;
    if (_totalSupply > MAX_SUPPLY) {
      _totalSupply = MAX_SUPPLY;
    }
    _gonsPerFragment = _totalGons / _totalSupply;
    emit Donation(msg.sender, amount, _totalSupply);
  }

  /// @notice get reserve ratio
  /// @return e18_reserve_ratio USDa reserve ratio
  function reserveRatio() external view override returns (uint256 e18_reserve_ratio) {
    return _gonsPerFragment;
  }
}
