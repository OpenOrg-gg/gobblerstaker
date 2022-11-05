import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { IERC20, IGooPoints, IGobblers, IGooBalanceProxy, IGooTogether, GooPoints, GooBalanceProxy, GooTogether } from "../typechain-types";
import { Addresser, MainnetAddresses } from "./util/addresser";
import { BN } from "./util/number";

export class TestScope {
    USDC!: IERC20;
    WETH!: IERC20;
    GOO!: IERC20;
    GooPoints!: IGooPoints;
    GooBalanceProxy!: IGooBalanceProxy;
    GooTogether!: IGooTogether;
    Gobblers!: IGobblers;

    wETH_LTV = BN("5e17")
    COMP_LTV = BN("4e17")
    UNI_LTV = BN("4e17")
    wBTC_LTV = BN("80e16")


    Frank!: SignerWithAddress  // frank is the Frank and master of USDI, and symbolizes the power of governance

    constructor() {
    }


}
const ts = new TestScope();
export const s = ts
