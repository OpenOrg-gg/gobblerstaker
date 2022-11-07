interface IUFragments{
    function rebase(uint256 supplyAdd, uint256 supplyRemove) external returns (uint256);
    function rebaseGons(uint256 supplyAdd, uint256 supplyRemove) external returns (uint256);
    function gooSharePerFragment() external view returns (uint256);
    function balanceOf(address who) external view returns (uint256);
    function gooSharePerGon() external view returns (uint256);
    function userGooAmount(address who) external view returns (uint256);
    function estUserGooAmount(address who) external view returns (uint256);
    function scaledTotalSupply() external view returns(uint256);
    function totalSupply() external view returns(uint256);
    function scaledBalanceOf(address who) external view returns(uint256);
}
