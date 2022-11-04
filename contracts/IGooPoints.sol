interface IGooPoints {
    function reserveAddress() external view returns (address);
    function currentReserve() external view returns (uint256);
    function mint(uint256, address) external;
    function burn(uint256, address) external;
    function donate(uint256) external;
    function reserveRatio() external view returns (uint256);
    function initialize(address, address) external;
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}