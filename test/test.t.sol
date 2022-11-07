pragma solidity 0.8.17;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/contracts/IERC721.sol";
import "../src/contracts/gooBalanceProxy.sol";
import "../src/contracts/gooPoints.sol";
import "../src/contracts/gooTogether.sol";
import "../src/contracts/IGobblers.sol";
import "../src/contracts/IUFragments.sol";

interface Iufragments{
    function balanceOf(address) external view returns (uint256);
}

contract ContractBTest is Test {
    uint256 testNumber;
    address gobblerContract = address(0x60bb1e2AA1c9ACAfB4d34F71585D7e959f387769);
    mapping(uint256 => address) gobblerOwner;

    gooBalanceProxy GooBalanceProxy;
    gooPoints GooPoints;
    gooTogether GooTogether;
    IGobblers GobblerContract = IGobblers(gobblerContract);

    address mary = 0x69166e49d2fd23E4cbEA767d7191bE423a7733A5;
    address bob = 0x5a52E96BAcdaBb82fd05763E25335261B270Efcb;
    address joe = 0xC882b111A75C0c657fC507C04FbFcD2cC984F071;

    function setUp() public {

        GooBalanceProxy = new gooBalanceProxy();
        GooPoints = new gooPoints();
        GooTogether = new gooTogether(address(GooPoints));

        for(uint i=1; i < 15; i++){
            gobblerOwner[i] = IGobblers(gobblerContract).ownerOf(i);
        }

        for(uint a=1; a <= 5; a++){
            vm.startPrank(gobblerOwner[a]);
            IERC721(gobblerContract).transferFrom(gobblerOwner[a], mary, a);
            vm.stopPrank();
        }

        for(uint b=6; b <= 10; b++){
            vm.startPrank(gobblerOwner[b]);
            IERC721(gobblerContract).transferFrom(gobblerOwner[b], bob, b);
            vm.stopPrank();
        }

        for(uint c=11; c <= 14; c++){
            vm.startPrank(gobblerOwner[c]);
            IERC721(gobblerContract).transferFrom(gobblerOwner[c], joe, c);
            vm.stopPrank();
        }

        GooPoints.initialize(address(GooBalanceProxy), address(GooTogether));
        
        console.log("current reserve %s", GooPoints.currentReserve());
        console.log("reserveRatio %s", GooPoints.reserveRatio());
    }

    function testDepositToContractTest() public {
        (uint256 startingGobblersOwned, uint256 startingMainMultiplier,,) = GobblerContract.getUserData(address(GooTogether));
        uint256 startingGooBalance = GobblerContract.gooBalance(address(GooTogether));
        vm.startPrank(mary);
        IERC721(gobblerContract).approve(address(GooTogether),1);
        GooTogether.deposit(1);

        //Recheck Balance
        (uint256 newGobblersOwned, uint256 newMainMultiplier,,) = GobblerContract.getUserData(address(GooTogether));
        uint256 newGooBalance = GobblerContract.gooBalance(address(GooTogether));
        console.log(" ");
        console.log(" ");

        uint256 totalSupply = IUFragments(address(GooPoints)).totalSupply();
        uint256 totalGons = IUFragments(address(GooPoints)).scaledTotalSupply();
        //starting reference
        console.log("Total Fragments: %s", (totalSupply/1e18));
        console.log("Total Gons: %s", (totalGons/1e18));

        //check increases
        assertTrue(newGobblersOwned > startingGobblersOwned, "Gobblers did increase");
        assertTrue(newMainMultiplier > startingMainMultiplier, "Multiplier increased");

        console.log("Gobblers owned is %s", newGobblersOwned);
        console.log("Multiplier is %s", newMainMultiplier);

        uint256 currentBalanceOfMary = IUFragments(address(GooPoints)).balanceOf(mary);
        uint256 currentGooOfMary = IUFragments(address(GooPoints)).estUserGooAmount(mary);
        uint256 currentGonOfMary = IUFragments(address(GooPoints)).scaledBalanceOf(mary);
        console.log(" ");
        console.log(" ");
        console.log("---Before Time Skip----");
        console.log("Mary's fragment balance is %s", (currentBalanceOfMary/1e18));
        console.log("Mary's goo balance is %s", (currentGooOfMary/1e18));
        console.log("Mary's gon balance is %s", (currentGonOfMary/1e18));
        console.log("Total Fragments: %s", (totalSupply/1e18));
        console.log("Total Gons: %s", (totalGons/1e18));
        console.log(" ");
        console.log(" ");
        skip(360000);
        GooTogether.pay_interest();
        uint256 newBalanceOfMary = IUFragments(address(GooPoints)).balanceOf(mary);
        uint256 newGooOfMary = IUFragments(address(GooPoints)).estUserGooAmount(mary);
        uint256 newGonOfMary = IUFragments(address(GooPoints)).scaledBalanceOf(mary);

        if(newBalanceOfMary > currentBalanceOfMary){
            console.log("Mary's fragment balance increased from %s to %s", (currentBalanceOfMary/1e18), (newBalanceOfMary/1e18));
        }

        if(newBalanceOfMary < currentBalanceOfMary){
            console.log("Mary's fragment balance decreased from %s to %s", (currentBalanceOfMary/1e18), (newBalanceOfMary/1e18));
        }

        if(currentBalanceOfMary == newBalanceOfMary){
            console.log("Mary's fragment balance remains unchanged");
        }

        if(newGooOfMary > currentGooOfMary){
            console.log("Mary's goo balance increased from %s to %s", (currentGooOfMary/1e18), (newGooOfMary/1e18));
        }

        if(newGooOfMary < currentGooOfMary){
            console.log("Mary's goo balance decreased from %s to %s", (currentGooOfMary/1e18), (newGooOfMary/1e18));
        }

        if(newGooOfMary == currentGooOfMary){
            console.log("Mary's goo balance remains unchanged");
        }

        console.log(" ");
        console.log(" ");
        console.log("---After Time Skip----");
        console.log("Mary's fragment balance is %s", (newBalanceOfMary/1e18));
        console.log("Mary's goo balance is %s", (newGooOfMary/1e18));
        console.log("Mary's gon balance is %s", (newGonOfMary/1e18));
        console.log("Total Fragments: %s", (totalSupply/1e18));
        console.log("Total Gons: %s", (totalGons/1e18));
        console.log(" ");
        console.log(" ");


        currentBalanceOfMary = IUFragments(address(GooPoints)).balanceOf(mary);
        currentGooOfMary = IUFragments(address(GooPoints)).estUserGooAmount(mary);
        currentGonOfMary = IUFragments(address(GooPoints)).scaledBalanceOf(mary);
        IERC721(gobblerContract).approve(address(GooTogether),2);

        GooTogether.deposit(2);

        newBalanceOfMary = IUFragments(address(GooPoints)).balanceOf(mary);
        newGooOfMary = IUFragments(address(GooPoints)).estUserGooAmount(mary);
        newGonOfMary = IUFragments(address(GooPoints)).scaledBalanceOf(mary);

        console.log(" ");
        console.log(" ");
        console.log("---After Deposit 2---");
        totalSupply = IUFragments(address(GooPoints)).totalSupply();
        totalGons = IUFragments(address(GooPoints)).scaledTotalSupply();
        console.log("Total Fragments: %s", (totalSupply/1e18));
        console.log("Total Gons: %s", (totalGons/1e18));

        if(newBalanceOfMary > currentBalanceOfMary){
            console.log("Mary's fragment balance increased from %s to %s", (currentBalanceOfMary/1e18), (newBalanceOfMary/1e18));
        }

        if(newBalanceOfMary < currentBalanceOfMary){
            console.log("Mary's fragment balance decreased from %s to %s", (currentBalanceOfMary/1e18), (newBalanceOfMary/1e18));
        }

        if(currentBalanceOfMary == newBalanceOfMary){
            console.log("Mary's fragment balance remains unchanged");
        }

        if(newGooOfMary > currentGooOfMary){
            console.log("Mary's goo balance increased from %s to %s", (currentGooOfMary/1e18), (newGooOfMary/1e18));
        }

        if(newGooOfMary < currentGooOfMary){
            console.log("Mary's goo balance decreased from %s to %s", (currentGooOfMary/1e18), (newGooOfMary/1e18));
        }

        if(newGooOfMary == currentGooOfMary){
            console.log("Mary's goo balance remains unchanged");
        }

        console.log("Mary's fragment balance is %s", (newBalanceOfMary/1e18));
        console.log("Mary's goo balance is %s", (newGooOfMary/1e18));
        console.log("Mary's gon balance is %s", (newGonOfMary/1e18));

        console.log("The contracts Goo Balance is %s", (GobblerContract.gooBalance(address(GooTogether))/1e18));

        vm.stopPrank();
        vm.startPrank(bob);
        IERC721(gobblerContract).approve(address(GooTogether),6);
        GooTogether.deposit(6);

        uint256 currentBalanceOfBob = IUFragments(address(GooPoints)).balanceOf(bob);
        uint256 currentGooOfBob = IUFragments(address(GooPoints)).estUserGooAmount(bob);
        uint256 currentGonOfBob = IUFragments(address(GooPoints)).scaledBalanceOf(bob);
        newBalanceOfMary = IUFragments(address(GooPoints)).balanceOf(mary);
        newGooOfMary = IUFragments(address(GooPoints)).estUserGooAmount(mary);
        newGonOfMary = IUFragments(address(GooPoints)).scaledBalanceOf(mary);

        console.log(" ");
        console.log(" ");
        console.log("---After Bob Deposit---");
        console.log("Mary's fragment balance is %s", (newBalanceOfMary/1e18));
        console.log("Mary's goo balance is %s", (newGooOfMary/1e18));
        console.log("Mary's gon balance is %s", (newGonOfMary/1e18));
        console.log("Bob's fragment balance is %s", (currentBalanceOfBob/1e18));
        console.log("Bob's goo balance is %s", (currentGooOfBob/1e18));
        console.log("Bob's gon balance is %s", (currentGonOfBob/1e18));
    }

    
}
