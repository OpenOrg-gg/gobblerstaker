import * as dotenv from "dotenv";
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
import { upgrades } from "hardhat";
import { showBodyCyan } from "./util/format";
import {
    GooBalanceProxy__factory,
    GooPoints__factory,
    GooTogether__factory,
    IGooPoints__factory,
    IGooPoints
} from "../typechain-types";
import {
  fastForward,
  OneWeek,
  OneYear,
} from "./util/block";
import { expect, assert } from "chai";
import { ethers, network, tenderly} from "hardhat";
import { stealMoney } from "./util/money";
import { showBody } from "./util/format";
import { BN } from "./util/number";
import { s } from "./scope";
import { advanceBlockHeight, reset, mineBlock } from "./util/block";
import { IERC20__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";


require("chai").should();
describe("Deploy Contracts", function (){
 
async function deploy(){
  const GooPoints = await ethers.getContractFactory("gooPoints");
  const [owner, addr1, addr2] = await ethers.getSigners();
  const GooPointsLive = await GooPoints.deploy();
  await GooPointsLive.deployed();

  const GooTogether = await ethers.getContractFactory("gooTogether");
  const GooTogetherLive = await GooPoints.deploy();
  await GooTogetherLive.deployed();
  
  await mineBlock();

  const GooBalanceProxy = await ethers.getContractFactory("gooBalanceProxy");
  const GooBalanceProxyLive = await GooPoints.deploy();
  await GooBalanceProxyLive.deployed();

  await expect(GooPointsLive.initialize(GooBalanceProxyLive.address, GooTogetherLive.address))
 
  return {GooBalanceProxyLive, GooPointsLive, GooTogetherLive}
}});

describe("test contracts", function ()  {
    
    it("Verify deployment of gooPoints deploy", async function () {
        const {GooBalanceProxyLive, GooPointsLive, GooTogetherLive} = await loadFixture(deploy)
        expect(await GooPointsLive.name()).to.equal("gooTogetherPoints");
      });
      it("Verify deployment of gooTogether proxy", async function () {
        const reserveAddress = await GooTogetherLive.gooPoints();
        await mineBlock();
        const expectedReserveAddress = GooPointsLive.address;
        assert.equal(reserveAddress, expectedReserveAddress, "gooTogether correctly deployed");
      });
      describe("Sanity check gooPoints deploy", function () {
        it("Should return the right name, symbol, and decimals", async () => {
          expect(await GooPointsLive.name()).to.equal("gooTogetherPoints");
          expect(await GooPointsLive.symbol()).to.equal("GOOT");
          expect(await GooPointsLive.decimals()).to.equal(18);
        });
    
      });
    })

