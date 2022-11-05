/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface IGooTogetherInterface extends utils.Interface {
  functions: {
    "calculateInterest()": FunctionFragment;
    "gooPoints()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "calculateInterest"
      | "calculateInterest()"
      | "gooPoints"
      | "gooPoints()"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "calculateInterest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "calculateInterest()",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "gooPoints", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "gooPoints()",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "calculateInterest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateInterest()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "gooPoints", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "gooPoints()",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IGooTogether extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IGooTogetherInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    calculateInterest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "calculateInterest()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    gooPoints(overrides?: CallOverrides): Promise<[string]>;

    "gooPoints()"(overrides?: CallOverrides): Promise<[string]>;
  };

  calculateInterest(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "calculateInterest()"(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  gooPoints(overrides?: CallOverrides): Promise<string>;

  "gooPoints()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    calculateInterest(overrides?: CallOverrides): Promise<void>;

    "calculateInterest()"(overrides?: CallOverrides): Promise<void>;

    gooPoints(overrides?: CallOverrides): Promise<string>;

    "gooPoints()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    calculateInterest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "calculateInterest()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    gooPoints(overrides?: CallOverrides): Promise<BigNumber>;

    "gooPoints()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    calculateInterest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "calculateInterest()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    gooPoints(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "gooPoints()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}