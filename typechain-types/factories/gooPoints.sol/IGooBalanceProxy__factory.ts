/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IGooBalanceProxy,
  IGooBalanceProxyInterface,
} from "../../gooPoints.sol/IGooBalanceProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IGooBalanceProxy__factory {
  static readonly abi = _abi;
  static createInterface(): IGooBalanceProxyInterface {
    return new utils.Interface(_abi) as IGooBalanceProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGooBalanceProxy {
    return new Contract(address, _abi, signerOrProvider) as IGooBalanceProxy;
  }
}
