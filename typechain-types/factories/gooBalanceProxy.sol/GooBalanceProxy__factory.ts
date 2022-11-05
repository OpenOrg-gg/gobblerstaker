/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  GooBalanceProxy,
  GooBalanceProxyInterface,
} from "../../gooBalanceProxy.sol/GooBalanceProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
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
  {
    inputs: [],
    name: "gobblers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gooToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405273600000000a36f3cd48407e35eb7c5c910dc1f7a86080527360bb1e2aa1c9acafb4d34f71585d7e959f38776960a05234801561004057600080fd5b5060805160a05161029b6100716000396000818160b001526101800152600081816071015260f6015261029b6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806370a08231146100465780637b10c7df1461006c5780637da066c6146100ab575b600080fd5b6100596100543660046101fc565b6100d2565b6040519081526020015b60405180910390f35b6100937f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610063565b6100937f000000000000000000000000000000000000000000000000000000000000000081565b6040516370a0823160e01b81526001600160a01b03828116600483015260009182917f000000000000000000000000000000000000000000000000000000000000000016906370a0823190602401602060405180830381865afa15801561013d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101619190610225565b60405163683afddd60e11b81526001600160a01b0385811660048301527f0000000000000000000000000000000000000000000000000000000000000000169063d075fbba90602401602060405180830381865afa1580156101c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101eb9190610225565b6101f5919061023e565b9392505050565b60006020828403121561020e57600080fd5b81356001600160a01b03811681146101f557600080fd5b60006020828403121561023757600080fd5b5051919050565b8082018082111561025f57634e487b7160e01b600052601160045260246000fd5b9291505056fea2646970667358221220d4f16c563a1a47a59d4d5c1f7febae9058c37e1e1a35823b9e20d5a87ecb721f64736f6c63430008110033";

type GooBalanceProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GooBalanceProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GooBalanceProxy__factory extends ContractFactory {
  constructor(...args: GooBalanceProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GooBalanceProxy> {
    return super.deploy(overrides || {}) as Promise<GooBalanceProxy>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GooBalanceProxy {
    return super.attach(address) as GooBalanceProxy;
  }
  override connect(signer: Signer): GooBalanceProxy__factory {
    return super.connect(signer) as GooBalanceProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GooBalanceProxyInterface {
    return new utils.Interface(_abi) as GooBalanceProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GooBalanceProxy {
    return new Contract(address, _abi, signerOrProvider) as GooBalanceProxy;
  }
}