import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { config, tenderly } from "hardhat";
import hh from "hardhat"

import { advanceBlockHeight, fastForward, mineBlock, OneWeek, OneYear } from "./block";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { TenderlyContract } from "@tenderly/hardhat-tenderly/dist/tenderly/types";

export const DeployContract = async (factory: ContractFactory, deployer: Signer, ...args: any[]): Promise<any> => {
    const uVC = await factory.connect(deployer).deploy(...args)
    await mineBlock()
    await uVC.deployed()
    return mineBlock().then(() => { return factory.attach(uVC.address) })
}
