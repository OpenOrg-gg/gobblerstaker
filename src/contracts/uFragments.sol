// SPDX-License-Identifier: MIT
/* solhint-disable */
pragma solidity 0.8.17;

import "./ERC20Detailed.sol";

import "./Initializable.sol";

import "./IGooPoints.sol";

import "./IGobblers.sol";

/**
 * @title uFragments ERC20 token
 * @dev GooPoints uses the Ampleforth UFragments model to track value.
 * Users are assigned `fragments` on the basis of an internal balance called `gons`
 * Initial Fragments start at a specific ratio based on the multiplier of the Gobbler Mulitpliers a user deposits
 * Each time a deposit, withdraw, or update command is issued, the Fragments rebase to account for the number of seconds.
 * This means that users accrue value based on time in the pool.
 * An additional internal balance looks at how much Goo is in the pool.
 */
contract UFragments is Initializable, ERC20Detailed {
  // PLEASE READ BEFORE CHANGING ANY ACCOUNTING OR MATH
  // Anytime there is division, there is a risk of numerical instability from rounding errors. In
  // order to minimize this risk, we adhere to the following guidelines:
  // 1) The conversion rate adopted is the number of gons that equals 1 fragment.
  //    The inverse rate must not be used--_totalGons is always the numerator and _totalSupply is
  //    always the denominator. (i.e. If you want to convert gons to fragments instead of
  //    multiplying by the inverse rate, you should divide by the normal rate)
  // 2) Gon balances converted into Fragments are always rounded down (truncated).
  //
  // We make the following guarantees:
  // - If address 'A' transfers x Fragments to address 'B'. A's resulting external balance will
  //   be decreased by precisely x Fragments, and B's external balance will be precisely
  //   increased by x Fragments.
  //
  // We do not guarantee that the sum of all balances equals the result of calling totalSupply().
  // This is because, for any conversion function 'f()' that has non-zero rounding error,
  // f(x0) + f(x1) + ... + f(xn) is not always equal to f(x0 + x1 + ... xn).

  event LogRebase(uint256 indexed epoch, uint256 totalSupply);
  event LogMonetaryPolicyUpdated(address monetaryPolicy);
  event feePaid(address from, uint256 amount);

  modifier validRecipient(address to) {
    require(to != address(0x0));
    require(to != address(this));
    _;
  }

  uint256 private constant DECIMALS = 18;
  uint256 private constant MAX_UINT256 = 2**256 - 1;
  uint256 private constant INITIAL_FRAGMENTS_SUPPLY = 1e18;

  // _totalGons is a multiple of INITIAL_FRAGMENTS_SUPPLY so that _gonsPerFragment is an integer.
  // Use the highest value that fits in a uint256 for max granularity.
  uint256 public _totalGons; // = INITIAL_FRAGMENTS_SUPPLY * 10**48;

  // MAX_SUPPLY = maximum integer < (sqrt(4*_totalGons + 1) - 1) / 2
  uint256 public MAX_SUPPLY; // = type(uint128).max; // (2^128) - 1

  uint256 public _totalSupply;
  uint256 public _gonsPerFragment;
  address public gobblerUnion;
  address public gobblers;
  address public gooTogether;
  uint256 public epoch;
  uint256 public startTime;
  uint256 public internalGooBalance;
  mapping(address => uint256) public _gonBalances;

  // This is denominated in Fragments, because the gons-fragments conversion might change before
  // it's fully paid.
  mapping(address => mapping(address => uint256)) private _allowedFragments;

  // EIP-2612: permit – 712-signed approvals
  // https://eips.ethereum.org/EIPS/eip-2612
  string public constant EIP712_REVISION = "1";
  bytes32 public constant EIP712_DOMAIN =
    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
  bytes32 public constant PERMIT_TYPEHASH =
    keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");

  // EIP-2612: keeps track of number of permits per address
  mapping(address => uint256) private _nonces;

  function __UFragments_init(string memory name, string memory symbol, address _gooTogether) public initializer {
    __ERC20Detailed_init(name, symbol, uint8(DECIMALS));

    //set og initial values
    _totalGons = 2e18;
    MAX_SUPPLY = MAX_UINT256;

    _totalSupply = INITIAL_FRAGMENTS_SUPPLY;
    _gonBalances[address(0x0)] = _totalGons; //send starting supply to a burner address so _totalSupply is never 0
    _gonsPerFragment = _totalGons / _totalSupply;

    gobblerUnion = address(0x6761A059Eb3881627ad33553DbeF81a2ba576DBf);
    gobblers = address(0x60bb1e2AA1c9ACAfB4d34F71585D7e959f387769);
    gooTogether = address(_gooTogether);

    emit Transfer(address(this), address(0x0), _totalSupply);
  }

  /**
   * @dev Notifies Fragments contract about a new rebase cycle.
   * @param supplyAdd The number of new fragment tokens to add into circulation via expansion.
   * @param supplyRemove The number of new fragment tokens to remove into circulation via expansion.
   * @return The total number of fragments after the supply adjustment.
   */
  function rebase(
    uint256 supplyAdd,
    uint256 supplyRemove
  ) external returns (uint256) {
    require(msg.sender == gooTogether); 
    epoch += 1; 
    if (supplyAdd == 0 && supplyRemove == 0) {
      emit LogRebase(epoch, _totalSupply);
      return _totalSupply;
    }

    if (supplyAdd > 0) {
      _totalSupply = _totalSupply + supplyAdd;
    } else {
      _totalSupply = _totalSupply - supplyRemove;
    }

    if (_totalSupply > MAX_SUPPLY) {
      _totalSupply = MAX_SUPPLY;
    }

    _gonsPerFragment = _totalGons / _totalSupply;

    // From this point forward, _gonsPerFragment is taken as the source of truth.
    // We recalculate a new _totalSupply to be in agreement with the _gonsPerFragment
    // conversion rate.
    // This means our applied Deltas can deviate from the requested Deltas,
    // but this deviation is guaranteed to be < (_totalSupply^2)/(_totalGons - _totalSupply).
    //
    // In the case of _totalSupply <= MAX_UINT128 (our current supply cap), this
    // deviation is guaranteed to be < 1, so we can omit this step. If the supply cap is
    // ever increased, it must be re-included.
    // _totalSupply = _totalGons - _gonsPerFragment

    emit LogRebase(epoch, _totalSupply);
    return _totalSupply;
  }

    /**
   * @dev Notifies Fragments contract about a new rebase cycle.
   * @param supplyAdd The number of new fragment tokens to add into circulation via expansion.
   * @param supplyRemove The number of new fragment tokens to remove into circulation via expansion.
   * @return The total number of fragments after the supply adjustment.
   */
  function rebaseGons(
    uint256 supplyAdd,
    uint256 supplyRemove
  ) external returns (uint256) {
    require(msg.sender == gooTogether); 
    epoch += 1; 
    if (supplyAdd == 0 && supplyRemove == 0) {
      emit LogRebase(epoch, _totalGons);
      return _totalGons;
    }

    if (supplyAdd > 0) {
      _totalGons = _totalGons + supplyAdd;
    } else {
      _totalGons = _totalGons - supplyRemove;
    }

    _gonsPerFragment = _totalGons / _totalSupply;

    // From this point forward, _gonsPerFragment is taken as the source of truth.
    // We recalculate a new _totalSupply to be in agreement with the _gonsPerFragment
    // conversion rate.
    // This means our applied Deltas can deviate from the requested Deltas,
    // but this deviation is guaranteed to be < (_totalSupply^2)/(_totalGons - _totalSupply).
    //
    // In the case of _totalSupply <= MAX_UINT128 (our current supply cap), this
    // deviation is guaranteed to be < 1, so we can omit this step. If the supply cap is
    // ever increased, it must be re-included.
    // _totalSupply = _totalGons - _gonsPerFragment

    emit LogRebase(epoch, _totalSupply);
    return _totalSupply;
  }
  /**
   * @return The total number of fragments.
   */
  function totalSupply() external view override returns (uint256) {
    return _totalSupply;
  }

  /**
   * @param who The address to query.
   * @return The balance of the specified address in fragments
   */
  function balanceOf(address who) external view override returns (uint256) {
    return _gonBalances[who] / _gonsPerFragment;
  }

  function gooSharePerGon() external view returns (uint256){
    return internalGooBalance / _totalGons;
  }

  function gooSharePerFragment() external view returns (uint256){
    return internalGooBalance / (_totalGons / _gonsPerFragment);
  }

  function userGooAmount(address who) external view returns (uint256){
    return (internalGooBalance / (_totalGons / _gonsPerFragment)) * (_gonBalances[who] / _gonsPerFragment);
  }

  function estUserGooAmount(address who) external view returns (uint256){
    return ((IGobblers(gobblers).gooBalance(address(gooTogether)) / _totalGons) * _gonBalances[who]);
  }

  /**
   * @param who The address to query.
   * @return The gon balance of the specified address.
   */
  function scaledBalanceOf(address who) external view returns (uint256) {
    return _gonBalances[who];
  }

  /**
   * @return the total number of gons.
   */
  function scaledTotalSupply() external view returns (uint256) {
    return _totalGons;
  }

  /**
   * @return The number of successful permits by the specified address.
   */
  function nonces(address who) public view returns (uint256) {
    return _nonces[who];
  }

  /**
   * @return The computed DOMAIN_SEPARATOR to be used off-chain services
   *         which implement EIP-712.
   *         https://eips.ethereum.org/EIPS/eip-2612
   */
  function DOMAIN_SEPARATOR() public view returns (bytes32) {
    uint256 chainId;
    assembly {
      chainId := chainid()
    }
    return
      keccak256(
        abi.encode(EIP712_DOMAIN, keccak256(bytes(name())), keccak256(bytes(EIP712_REVISION)), chainId, address(this))
      );
  }
}
/* solhint-enable */
