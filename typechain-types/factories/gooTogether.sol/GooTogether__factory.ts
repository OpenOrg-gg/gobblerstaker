/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  GooTogether,
  GooTogetherInterface,
} from "../../gooTogether.sol/GooTogether";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_setGooPoints",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "_gooPoints",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "getUserData",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gooPoints",
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
    name: "pay_interest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "poolMulitple",
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
    name: "totalGooInContract",
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
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "userTotalGooEstimated",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60e06040527360bb1e2aa1c9acafb4d34f71585d7e959f387769608052736761a059eb3881627ad33553dbef81a2ba576dbf60a05273600000000a36f3cd48407e35eb7c5c910dc1f7a860c05234801561005857600080fd5b50604051610fc8380380610fc8833981016040819052610077916100a5565b600060025542600355600180546001600160a01b0319166001600160a01b03929092169190911790556100d5565b6000602082840312156100b757600080fd5b81516001600160a01b03811681146100ce57600080fd5b9392505050565b60805160a05160c051610e77610151600039600081816104b3015281816105940152610687015260006104e2015260008181610236015281816102ce015281816104250152818161070f015281816107ba01528181610847015281816108ed01528181610a5401528181610ad00152610c100152610e776000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80634cd01af1116100665780634cd01af114610106578063588c4f9a14610141578063ae4b5ae414610152578063b6b55f251461015a578063cfe148751461016d57600080fd5b8063238c16c914610098578063273e0c1a146100be5780632e1a7d4d146100e957806336088b92146100fe575b600080fd5b6100ab6100a6366004610ca6565b610175565b6040519081526020015b60405180910390f35b6001546100d1906001600160a01b031681565b6040516001600160a01b0390911681526020016100b5565b6100fc6100f7366004610cc8565b6101ea565b005b6100ab61066f565b610131610114366004610ce1565b600060208181529281526040808220909352908152205460ff1681565b60405190151581526020016100b5565b6001546001600160a01b03166100d1565b6100ab610791565b6100fc610168366004610cc8565b610a29565b6100ab610beb565b6001546040516370a0823160e01b81526001600160a01b03838116600483015260009216906370a0823190602401602060405180830381865afa1580156101c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e49190610d0b565b92915050565b3360009081526020818152604080832084845290915290205460ff16151560011461021457600080fd5b61021c610791565b5060405163fa522a1560e01b8152600481018290526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063fa522a1590602401602060405180830381865afa158015610285573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102a99190610d0b565b604051632142170760e11b8152306004820152336024820152604481018490529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906342842e0e90606401600060405180830381600087803b15801561031a57600080fd5b505af115801561032e573d6000803e3d6000fd5b5050600154604051633f34d4cf60e21b8152600481018590523360248201526001600160a01b03909116925063fcd3533c9150604401600060405180830381600087803b15801561037e57600080fd5b505af1158015610392573d6000803e3d6000fd5b505050506000600160009054906101000a90046001600160a01b03166001600160a01b0316630c7d5cd86040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040f9190610d0b565b6104199083610d3a565b90506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016639cc397fb6064610457846062610d3a565b6104619190610d51565b6040518263ffffffff1660e01b815260040161047f91815260200190565b600060405180830381600087803b15801561049957600080fd5b505af11580156104ad573d6000803e3d6000fd5b505050507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a9059cbb7f000000000000000000000000000000000000000000000000000000000000000060648460026105109190610d3a565b61051a9190610d51565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af1158015610565573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105899190610d73565b506001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001663a9059cbb3360646105c7856060610d3a565b6105d19190610d51565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af115801561061c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106409190610d73565b50336000908152602081815260408083208684529091529020805460ff19169055610669610791565b50505050565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa1580156106d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106fa9190610d0b565b60405163683afddd60e11b81523060048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063d075fbba90602401602060405180830381865afa15801561075e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107829190610d0b565b61078c9190610d95565b905090565b60405160016236769560e01b031981523060048201526000908190819081906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063ffc9896b90602401608060405180830381865afa158015610801573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108259190610dbc565b67ffffffffffffffff1693506001600160801b0316935063ffffffff169350507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316639cc397fb60006040518263ffffffff1660e01b815260040161089491815260200190565b600060405180830381600087803b1580156108ae57600080fd5b505af11580156108c2573d6000803e3d6000fd5b505060405160016236769560e01b031981523060048201526000925082915081906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063ffc9896b90602401608060405180830381865afa158015610934573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109589190610dbc565b67ffffffffffffffff1693506001600160801b0316935063ffffffff16935050600084826109869190610e2e565b90508060000361099e57600097505050505050505090565b60006109aa8785610e2e565b90506000600254826109bc9190610d51565b60015460405163f14faf6f60e01b8152600481018390529192506001600160a01b03169063f14faf6f90602401600060405180830381600087803b158015610a0357600080fd5b505af1158015610a17573d6000803e3d6000fd5b50929c9b505050505050505050505050565b610a31610791565b50604051632142170760e11b8152336004820152306024820152604481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906342842e0e90606401600060405180830381600087803b158015610aa057600080fd5b505af1158015610ab4573d6000803e3d6000fd5b505060405163fa522a1560e01b815260048101849052600092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316915063fa522a1590602401602060405180830381865afa158015610b20573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b449190610d0b565b336000908152602081815260408083208684529091528120805460ff19166001179055600280549293508392909190610b7e908490610d95565b90915550506001546040516394bf804d60e01b8152600481018390523360248201526001600160a01b03909116906394bf804d90604401600060405180830381600087803b158015610bcf57600080fd5b505af1158015610be3573d6000803e3d6000fd5b505050505050565b60405160016236769560e01b0319815230600482015260009081906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063ffc9896b90602401608060405180830381865afa158015610c57573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c7b9190610dbc565b505063ffffffff169392505050565b80356001600160a01b0381168114610ca157600080fd5b919050565b600060208284031215610cb857600080fd5b610cc182610c8a565b9392505050565b600060208284031215610cda57600080fd5b5035919050565b60008060408385031215610cf457600080fd5b610cfd83610c8a565b946020939093013593505050565b600060208284031215610d1d57600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b80820281158282048414176101e4576101e4610d24565b600082610d6e57634e487b7160e01b600052601260045260246000fd5b500490565b600060208284031215610d8557600080fd5b81518015158114610cc157600080fd5b808201808211156101e4576101e4610d24565b805163ffffffff81168114610ca157600080fd5b60008060008060808587031215610dd257600080fd5b610ddb85610da8565b9350610de960208601610da8565b925060408501516001600160801b0381168114610e0557600080fd5b606086015190925067ffffffffffffffff81168114610e2357600080fd5b939692955090935050565b818103818111156101e4576101e4610d2456fea2646970667358221220e6db2154359f6ee22b1f091534a40d9f9e46bfe9ff16cf136fc50ebe68748b6f64736f6c63430008110033";

type GooTogetherConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GooTogetherConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GooTogether__factory extends ContractFactory {
  constructor(...args: GooTogetherConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _setGooPoints: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GooTogether> {
    return super.deploy(_setGooPoints, overrides || {}) as Promise<GooTogether>;
  }
  override getDeployTransaction(
    _setGooPoints: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_setGooPoints, overrides || {});
  }
  override attach(address: string): GooTogether {
    return super.attach(address) as GooTogether;
  }
  override connect(signer: Signer): GooTogether__factory {
    return super.connect(signer) as GooTogether__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GooTogetherInterface {
    return new utils.Interface(_abi) as GooTogetherInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GooTogether {
    return new Contract(address, _abi, signerOrProvider) as GooTogether;
  }
}
