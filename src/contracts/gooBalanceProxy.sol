// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IGobblers{
    function gooBalance(address) external view returns (uint256);
    function balanceOf(address) external view returns (uint256);
}

contract gooBalanceProxy{
    address public immutable gooToken = address(0x600000000a36F3cD48407e35eB7C5c910dc1f7a8);
    address public immutable gobblers = address(0x60bb1e2AA1c9ACAfB4d34F71585D7e959f387769);

    function balanceOf(address _address) public view returns(uint256){
        uint256 amount = IGobblers(gobblers).gooBalance(address(_address)) + IGobblers(gooToken).balanceOf(address(_address));
        return amount;
    }
}