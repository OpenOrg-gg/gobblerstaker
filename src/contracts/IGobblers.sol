
interface IGobblers{
    function gooBalance(address) external view returns (uint256);
    function balanceOf(address) external view returns (uint256);
    function getGobblerEmissionMultiple(uint256) external view returns (uint256);
    function getUserEmissionMultiple(address) external view returns (uint256);
    function getUserData(address) external view returns (uint32, uint32, uint128, uint64);
    function addGoo(uint256) external;
    function removeGoo(uint256) external;
    function ownerOf(uint256) external view returns (address);
}