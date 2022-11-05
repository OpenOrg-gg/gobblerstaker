import { s } from "../../test/scope";
import { BigNumber, Event, utils } from "ethers";
import { ethers } from "hardhat"
import { advanceBlockHeight, nextBlockTime, fastForward, mineBlock, OneWeek, OneYear } from "./block";
import { BN } from "./number";
import { showBody } from "./format";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {  } from "../../typechain-types";

/**
 * @dev takes interest factor and returns new interest factor - pulls block time from network and latestInterestTime from contract
 * @param interestFactor  - current interest factor read from contract
 * @returns new interest factor based on time elapsed and reserve ratio (read from contract atm)
 */
export const payInterestMath = async (interestFactor: BigNumber) => {
    const nullAddr = "0x0000000000000000000000000000000000000000"

    /**
     * get interest factor from contract
     * //time passes
     * run payInterestMath to get new interest factor
     * calculate_interest()
     * get interest factor from contract
     * should match interestFactor calculated in payInterestMath
     * after confirming they match, use calculated interest factor go calc balance, liability, etc
     */

    //let interestFactor = await s.VaultController.interestFactor()

    const currentBlock = await ethers.provider.getBlockNumber()
    const currentTime = (await ethers.provider.getBlock(currentBlock)).timestamp
    await nextBlockTime(currentTime)
    //await network.provider.send("evm_mine")

}


/**
 * 
 * @param borrowAmount original borrow amount
 * @param currentInterestFactor current interest factor read from contract 
 * @param initialInterestFactor original interest factor from when borrow took place
 * @returns 
 */
export const calculateAccountLiability = async (borrowAmount: BigNumber, currentInterestFactor: BigNumber, initialInterestFactor: BigNumber) => {

    let baseAmount = borrowAmount.mul(BN("1e18"))
    baseAmount = baseAmount.div(initialInterestFactor)
    let currentLiability = baseAmount.mul(currentInterestFactor)
    currentLiability = await truncate(currentLiability)

    return currentLiability
}

export const getGas = async (result: any) => {
    const receipt = await result.wait()
    return receipt.gasUsed
}

export const truncate = async (value: BigNumber) => {
    return value.div(BN("1e18"))
}

export const getEvent = async (result: any, event: string) => {
    const receipt = await result.wait()
    let parsedEvent = receipt.events?.filter((x: Event) => {
        return x.event == event
    }).pop()//?.event//get just event name
    return parsedEvent
}

/**
 * 
 * @param result object returned from a transaction that emits an event 
 * @returns the args from the last event emitted from the transaction
 */
export const getArgs = async (result: any) => {
    await advanceBlockHeight(1)
    const receipt = await result.wait()
    await advanceBlockHeight(1)
    const events = receipt.events
    const args = events[events.length - 1].args

    return args
}


export const toNumber = async (bigboi: BigNumber) => {
    return Number(utils.formatEther(bigboi.toString()))
}

export type minter = {
    minter: string
    amount: number
}

/**
 * expected merge length should be: 
 * borrowerList + uniList - dupes
 * 29 + 18 - 8 = 39
 */
export const mergeLists = async (borrowList: minter[], uniList: minter[]) => {


    let merged: minter[] = []
    merged = borrowList

    let dupes: any[] = []

    for (let i = 0; i < merged.length; i++) {
        for (let j = 0; j < uniList.length; j++) {
            if (uniList[j].minter == merged[i].minter) {
                merged[i].amount += uniList[j].amount
                //showBodyCyan("Merged: ", merged[i])
                dupes.push(uniList[j])
            }
        }
    }
    for (let i = 0; i < uniList.length; i++) {
        let dupe = false
        for (let j = 0; j < dupes.length; j++) {
            if (uniList[i] == dupes[j]) {
                dupe = true
            }
        }
        if (!dupe) {
            merged.push(uniList[i])
        }
    }
    return merged

}