import { ContractTransaction, ContractInterface, BytesLike as Arrayish, BigNumber, BigNumberish } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<Pool, PoolMethodNames, PoolEventsContext, PoolEvents>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type PoolEvents = undefined;
export interface PoolEventsContext {}
export type PoolMethodNames =
  | 'assetOf'
  | 'containsAsset'
  | 'deposit'
  | 'getHighestAndLowestCompRatioAssets'
  | 'getTokenAddresses'
  | 'noHaircutSwap'
  | 'quoteMaxInitialAssetWithdrawable'
  | 'quotePotentialSwap'
  | 'quotePotentialWithdraw'
  | 'quotePotentialWithdrawFromOtherAsset'
  | 'swap'
  | 'withdraw'
  | 'withdrawFromOtherAsset';
export interface GetHighestAndLowestCompRatioAssetsResponse {
  lowestAsset: string;
  0: string;
  highestAsset: string;
  1: string;
  length: 2;
}
export interface QuotePotentialSwapResponse {
  potentialOutcome: BigNumber;
  0: BigNumber;
  haircut: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface QuotePotentialWithdrawResponse {
  amount: BigNumber;
  0: BigNumber;
  fee: BigNumber;
  1: BigNumber;
  enoughCash: boolean;
  2: boolean;
  length: 3;
}
export interface QuotePotentialWithdrawFromOtherAssetResponse {
  amount: BigNumber;
  0: BigNumber;
  fee: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface Pool {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   */
  assetOf(token: string, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param key Type: address, Indexed: false
   */
  containsAsset(key: string, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  deposit(token: string, amount: BigNumberish, to: string, deadline: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getHighestAndLowestCompRatioAssets(overrides?: ContractCallOverrides): Promise<GetHighestAndLowestCompRatioAssetsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getTokenAddresses(overrides?: ContractCallOverrides): Promise<string[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param fromToken Type: address, Indexed: false
   * @param toToken Type: address, Indexed: false
   * @param fromAmount Type: uint256, Indexed: false
   * @param minimumToAmount Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  noHaircutSwap(
    fromToken: string,
    toToken: string,
    fromAmount: BigNumberish,
    minimumToAmount: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param initialToken Type: address, Indexed: false
   * @param wantedToken Type: address, Indexed: false
   */
  quoteMaxInitialAssetWithdrawable(initialToken: string, wantedToken: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param fromToken Type: address, Indexed: false
   * @param toToken Type: address, Indexed: false
   * @param fromAmount Type: uint256, Indexed: false
   */
  quotePotentialSwap(fromToken: string, toToken: string, fromAmount: BigNumberish, overrides?: ContractCallOverrides): Promise<QuotePotentialSwapResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param liquidity Type: uint256, Indexed: false
   */
  quotePotentialWithdraw(token: string, liquidity: BigNumberish, overrides?: ContractCallOverrides): Promise<QuotePotentialWithdrawResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param initialToken Type: address, Indexed: false
   * @param wantedToken Type: address, Indexed: false
   * @param liquidity Type: uint256, Indexed: false
   */
  quotePotentialWithdrawFromOtherAsset(
    initialToken: string,
    wantedToken: string,
    liquidity: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<QuotePotentialWithdrawFromOtherAssetResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param fromToken Type: address, Indexed: false
   * @param toToken Type: address, Indexed: false
   * @param fromAmount Type: uint256, Indexed: false
   * @param minimumToAmount Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swap(
    fromToken: string,
    toToken: string,
    fromAmount: BigNumberish,
    minimumToAmount: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param liquidity Type: uint256, Indexed: false
   * @param minimumAmount Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  withdraw(
    token: string,
    liquidity: BigNumberish,
    minimumAmount: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param initialToken Type: address, Indexed: false
   * @param wantedToken Type: address, Indexed: false
   * @param liquidity Type: uint256, Indexed: false
   * @param minimumAmount Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  withdrawFromOtherAsset(
    initialToken: string,
    wantedToken: string,
    liquidity: BigNumberish,
    minimumAmount: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
}
