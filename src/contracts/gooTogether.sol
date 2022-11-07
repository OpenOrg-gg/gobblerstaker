// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.17;

import "./IGobblers.sol";

import "./IGooPoints.sol";
import "./IERC721.sol";

import "./IERC20.sol";
import "./IERC20Full.sol";
import "./IUFragments.sol";

interface IERC721Receiver {
    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721Receiver.onERC721Received.selector`.
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}


contract gooTogether {

    //GooTogether is a Gobbler Pooling contract by the Gobbler's Union
    //You deposit you Gobbler and compound Goo within the contract.
    //By goo'ing together, your Goo compounds faster.
    //You can claim your goo or withdraw your gobbler at any time.
    //The contract takes a small fee with part staying in the contract 
    //to improve the rate of other stakers forever, and the rest
    //goes to the gobblers union.

    mapping(address => mapping(uint256 => bool)) public getUserData;
    
    mapping(address => uint256[]) public userGobblers;

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
    userGobblers[msg.sender].push(_id);
    totalMultiple += multiRate;
    IGooPoints(_gooPoints).mint(multiRate , msg.sender);
    //we sandwich the pay interest on both deposit and withdraw so we always have the latest total multiple and time stamp
    //this prevents any exploits in rounding on rapid withdraw/deposit.
    pay_interest();
}

function withdraw() external {
    
    pay_interest();
    uint256 len = userGobblers[msg.sender].length;
    uint256 userMulti;
    for(uint i=len; i > len; i--){
            uint256 multiRate = IGobblers(gobblers).getGobblerEmissionMultiple(i);
            userMulti += multiRate;
            IERC721(gobblers).safeTransferFrom(address(this), msg.sender, i);
            totalMultiple -= multiRate;
            userGobblers[msg.sender].pop();
            getUserData[msg.sender][i] = false;
    }
    uint256 userBalance = IERC20Full(_gooPoints).balanceOf(msg.sender);
    IGooPoints(_gooPoints).burn(userMulti, msg.sender);

    uint256 awardRate = userBalance * (IUFragments(_gooPoints).gooSharePerFragment());

    //2% fee all stakers share
    IGobblers(gobblers).removeGoo((awardRate * 98) / 100);

    //2% fee to union
    IERC20Full(gooAddress).transfer(gobblerUnion, ((awardRate * 2) / 100));
    IERC20Full(gooAddress).transfer(msg.sender, ((awardRate * 96) / 100));

    IGooPoints(_gooPoints).loss(awardRate);

    pay_interest();
}


function userTotalGooEstimated(address _user) public view returns(uint256) {
    return IERC20Full(_gooPoints).balanceOf(_user);
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
    uint256 adjustment;
    (,uint256 emissionsMultiple, uint256 lastBalance, uint256 lastTimestamp) = IGobblers(gobblers).getUserData(address(this));   
    IGobblers(gobblers).removeGoo(0);
    (,uint256 newMultiple, uint256 newBalance, uint256 newTimestamp) = IGobblers(gobblers).getUserData(address(this));   
    
    // calculate the time difference between the current block and the last time the block was called
    uint256 timeDifference = newTimestamp - lastTimestamp;
    
    // if the time difference is 0, there is no interest. this saves gas in the case that
    // if multiple users call interest paying functions in the same block
    if (timeDifference == 0) {
      adjustment = 0;
      return adjustment;
    }


    //We increase the ratio by the multiple, times the number of seconds passed / 5, to roughly align with block times.
    uint256 gonAdjust = ((totalMultiple) * ((timeDifference) / 5));
    uint256 fragmentAdjust;

    ///MAYBE NEED TO SWITCH GON FOR FRAGMENTS? FRAGMENTS GOING DOWN OVER TIME SHOULD BE GOING UP.
    if(emissionsMultiple > newMultiple){
        fragmentAdjust = emissionsMultiple - newMultiple;
        IUFragments(_gooPoints).rebase(0,fragmentAdjust*10e18);
    }

    if(emissionsMultiple < newMultiple){
        fragmentAdjust = newMultiple - emissionsMultiple;
        IUFragments(_gooPoints).rebase(fragmentAdjust*10e18,0);
    }

    IUFragments(_gooPoints).rebaseGons(gonAdjust, 0);
    
    //if(newBalance > lastBalance){
       // IGooPoints(_gooPoints).donate(adjustment);
   // }

   // if(lastBalance > newBalance){
       // adjustment = lastBalance - newBalance;
        //IGooPoints(_gooPoints).loss(adjustment);
   // }
    
    //if(lastBalance == newBalance){
        //adjustment = 0;
    //}


    return gonAdjust;
  }

  function gooPoints() external view returns (address){
    return _gooPoints;
  }

  function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
    return IERC721Receiver.onERC721Received.selector;
  }

  function viewGobblers() external view returns (address){
    return gobblers;
  }
}