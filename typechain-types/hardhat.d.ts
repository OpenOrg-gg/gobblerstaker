/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "ERC20Detailed",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Detailed__factory>;
    getContractFactory(
      name: "GooBalanceProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GooBalanceProxy__factory>;
    getContractFactory(
      name: "IGobblers",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGobblers__factory>;
    getContractFactory(
      name: "GooPoints",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GooPoints__factory>;
    getContractFactory(
      name: "IGooBalanceProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGooBalanceProxy__factory>;
    getContractFactory(
      name: "IGooTogether",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGooTogether__factory>;
    getContractFactory(
      name: "GooTogether",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GooTogether__factory>;
    getContractFactory(
      name: "IGobblers",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGobblers__factory>;
    getContractFactory(
      name: "IGooPoints",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGooPoints__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IERC20Full",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Full__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IGooPoints",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGooPoints__factory>;
    getContractFactory(
      name: "Lock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Lock__factory>;
    getContractFactory(
      name: "UFragments",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UFragments__factory>;

    getContractAt(
      name: "ERC20Detailed",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Detailed>;
    getContractAt(
      name: "GooBalanceProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GooBalanceProxy>;
    getContractAt(
      name: "IGobblers",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGobblers>;
    getContractAt(
      name: "GooPoints",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GooPoints>;
    getContractAt(
      name: "IGooBalanceProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGooBalanceProxy>;
    getContractAt(
      name: "IGooTogether",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGooTogether>;
    getContractAt(
      name: "GooTogether",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GooTogether>;
    getContractAt(
      name: "IGobblers",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGobblers>;
    getContractAt(
      name: "IGooPoints",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGooPoints>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IERC20Full",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Full>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IGooPoints",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGooPoints>;
    getContractAt(
      name: "Lock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Lock>;
    getContractAt(
      name: "UFragments",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UFragments>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}