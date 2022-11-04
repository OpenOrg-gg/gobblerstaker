// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.17;

interface IGobblers{
    function getGobblerEmissionMultiple(uint256) external view returns (uint256);
    function getUserEmissionMultiple(address) external view returns (uint256);
    function getUserData(address) external view returns (uint32, uint32, uint128, uint64);
    function addGoo(uint256) external;
    function removeGoo(uint256) external;
    function gooBalance(address) external view returns (uint256);
}

interface IGooPoints{
    function mint(uint256, address) external;
    function burn(uint256, address) external;
    function reserveRatio() external view returns(uint256);
    function balanceOf(address) external view returns (uint256);
    function donate(uint256) external;
}

import "./IERC721.sol";

import "./IERC20.sol";
import "./IERC20Full.sol";

contract gooTogether {

    //GooTogether is a Gobbler Pooling contract by the Gobbler's Union
    //You deposit you Gobbler and compound Goo within the contract.
    //By goo'ing together, your Goo compounds faster.
    //You can claim your goo or withdraw your gobbler at any time.
    //The contract takes a small fee with part staying in the contract 
    //to improve the rate of other stakers forever, and the rest
    //goes to the gobblers union.

    mapping(address => mapping(uint256 => bool)) public getUserData;

    address immutable gobblers = address(0x60bb1e2AA1c9ACAfB4d34F71585D7e959f387769);
    address immutable gobblerUnion = address(0x6761A059Eb3881627ad33553DbeF81a2ba576DBf);
    address public _gooPoints;
    address immutable gooAddress = address(0x600000000a36F3cD48407e35eB7C5c910dc1f7a8);

    uint256 totalMultiple;
    uint256 lastRewardBlock;

    constructor(address _setGooPoints){
        totalMultiple = 0;
        lastRewardBlock = block.timestamp;
        _gooPoints = _setGooPoints;
    }

function deposit(uint256 _id) external {
    pay_interest();
    IERC721(gobblers).safeTransferFrom(msg.sender, address(this), _id);
    uint256 multiRate = IGobblers(gobblers).getGobblerEmissionMultiple(_id);
    getUserData[msg.sender][_id] = true;
    totalMultiple += multiRate;
    IGooPoints(_gooPoints).mint(multiRate, msg.sender);
}

function withdraw(uint256 _id) external {
    require(getUserData[msg.sender][_id] == true);
    pay_interest();
    uint256 multiRate = IGobblers(gobblers).getGobblerEmissionMultiple(_id);
    IERC721(gobblers).safeTransferFrom(address(this), msg.sender, _id);
    IGooPoints(_gooPoints).burn(multiRate, msg.sender);
    
    uint256 awardRate = multiRate * IGooPoints(_gooPoints).reserveRatio();

    //2% fee all stakers share
    IGobblers(gobblers).removeGoo((awardRate * 98) / 100);

    //2% fee to union
    IERC20Full(gooAddress).transfer(gobblerUnion, ((awardRate * 2) / 100));
    IERC20Full(gooAddress).transfer(msg.sender, ((awardRate * 96) / 100));
    getUserData[msg.sender][_id] = false;
    pay_interest();
}


function userTotalGooEstimated(address _user) public view returns(uint256) {
    return IGooPoints(_gooPoints).balanceOf(_user);
}

function totalGooInContract() external view returns(uint256){
    return IGobblers(gobblers).gooBalance(address(this)) + IERC20Full(gooAddress).balanceOf(address(this));
}

function poolMulitple() external view returns(uint256){
    (,uint256 emissionsMulitple,,) = IGobblers(gobblers).getUserData(address(this)); 
    return emissionsMulitple;
}

  /// @notice accrue interest to borrowers and distribute it to USDa holders.
  /// this function is called before any function that changes the reserve ratio
  function pay_interest() public returns (uint256) {

    (,uint256 emissionsMulitple, uint256 lastBalance, uint256 lastTimestamp) = IGobblers(gobblers).getUserData(address(this));   
    IGobblers(gobblers).removeGoo(0);
    (,uint256 newMulitple, uint256 newBalance, uint256 newTimestamp) = IGobblers(gobblers).getUserData(address(this));   
    
    // calculate the time difference between the current block and the last time the block was called
    uint256 timeDifference = newTimestamp - lastTimestamp;
    
    // if the time difference is 0, there is no interest. this saves gas in the case that
    // if multiple users call interest paying functions in the same block
    if (timeDifference == 0) {
      return 0;
    }

    uint256 newGoo = newBalance - lastBalance;
    
    uint256 adjustment = newGoo / totalMultiple;

    IGooPoints(_gooPoints).donate(adjustment);

    return adjustment;
  }

  function gooPoints() external view returns (address){
    return _gooPoints;
  }
}