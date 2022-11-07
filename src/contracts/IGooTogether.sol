
interface IGooTogether{
  function pay_interest() external;
  function gooPoints() external view returns (address);
  function deposit(uint256) external;
  function viewGobblers() external view returns (address);
}