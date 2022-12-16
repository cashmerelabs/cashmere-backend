import { ContractTransaction, ContractInterface, BytesLike as Arrayish, BigNumber, BigNumberish } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<PoolCrossChain, PoolCrossChainMethodNames, PoolCrossChainEventsContext, PoolCrossChainEvents>;

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
export type PoolCrossChainEvents =
  | 'AssetAdded'
  | 'CrossChainSwap'
  | 'Deposit'
  | 'DevUpdated'
  | 'FeeCollectorUpdated'
  | 'HaircutRateUpdated'
  | 'OracleUpdated'
  | 'OwnershipTransferred'
  | 'Paused'
  | 'PriceDeviationUpdated'
  | 'RetentionRatioUpdated'
  | 'RouterUpdated'
  | 'SlippageParamsUpdated'
  | 'Swap'
  | 'Unpaused'
  | 'Withdraw';
export interface PoolCrossChainEventsContext {
  AssetAdded(...parameters: any): EventFilter;
  CrossChainSwap(...parameters: any): EventFilter;
  Deposit(...parameters: any): EventFilter;
  DevUpdated(...parameters: any): EventFilter;
  FeeCollectorUpdated(...parameters: any): EventFilter;
  HaircutRateUpdated(...parameters: any): EventFilter;
  OracleUpdated(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  Paused(...parameters: any): EventFilter;
  PriceDeviationUpdated(...parameters: any): EventFilter;
  RetentionRatioUpdated(...parameters: any): EventFilter;
  RouterUpdated(...parameters: any): EventFilter;
  SlippageParamsUpdated(...parameters: any): EventFilter;
  Swap(...parameters: any): EventFilter;
  Unpaused(...parameters: any): EventFilter;
  Withdraw(...parameters: any): EventFilter;
}
export type PoolCrossChainMethodNames =
  | 'new'
  | 'addAsset'
  | 'assetOf'
  | 'c1'
  | 'chainId'
  | 'deposit'
  | 'dev'
  | 'feeCollector'
  | 'getEquilibriumCoverageRatio'
  | 'getTokenAddresses'
  | 'haircutRate'
  | 'maxPriceDeviation'
  | 'owner'
  | 'pause'
  | 'paused'
  | 'priceOracle'
  | 'quoteMaxInitialAssetWithdrawable'
  | 'quotePotentialSwap'
  | 'quotePotentialWithdraw'
  | 'quotePotentialWithdrawFromOtherAsset'
  | 'receiveSwapCrossChain'
  | 'recoverUserFunds'
  | 'removeAsset'
  | 'renounceOwnership'
  | 'retentionRatio'
  | 'router'
  | 'setDev'
  | 'setFeeCollector'
  | 'setHaircutRate'
  | 'setMaxPriceDeviation'
  | 'setPriceOracle'
  | 'setRetentionRatio'
  | 'setRouter'
  | 'setSlippageParams'
  | 'slippageParamK'
  | 'slippageParamN'
  | 'swapCrossChain'
  | 'transferOwnership'
  | 'unpause'
  | 'withdraw'
  | 'withdrawFromOtherAsset'
  | 'xThreshold';
export interface AssetAddedEventEmittedResponse {
  token: string;
  asset: string;
}
export interface CrossChainSwapEventEmittedResponse {
  sender: string;
  srcAsset: string;
  dstAsset: string;
  chainId: BigNumberish;
  fromAmount: BigNumberish;
  toAmount: BigNumberish;
}
export interface DepositEventEmittedResponse {
  sender: string;
  token: string;
  amount: BigNumberish;
  liquidity: BigNumberish;
  to: string;
}
export interface DevUpdatedEventEmittedResponse {
  previousDev: string;
  newDev: string;
}
export interface FeeCollectorUpdatedEventEmittedResponse {
  previousCollector: string;
  newCollector: string;
}
export interface HaircutRateUpdatedEventEmittedResponse {
  previousHaircut: BigNumberish;
  newHaircut: BigNumberish;
}
export interface OracleUpdatedEventEmittedResponse {
  previousOracle: string;
  newOracle: string;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PausedEventEmittedResponse {
  account: string;
}
export interface PriceDeviationUpdatedEventEmittedResponse {
  previousPriceDeviation: BigNumberish;
  newPriceDeviation: BigNumberish;
}
export interface RetentionRatioUpdatedEventEmittedResponse {
  previousRetentionRatio: BigNumberish;
  newRetentionRatio: BigNumberish;
}
export interface RouterUpdatedEventEmittedResponse {
  oldRouter: string;
  newRouter: string;
}
export interface SlippageParamsUpdatedEventEmittedResponse {
  previousK: BigNumberish;
  newK: BigNumberish;
  previousN: BigNumberish;
  newN: BigNumberish;
  previousC1: BigNumberish;
  newC1: BigNumberish;
  previousXThreshold: BigNumberish;
  newXThreshold: BigNumberish;
}
export interface SwapEventEmittedResponse {
  sender: string;
  fromToken: string;
  toToken: string;
  fromAmount: BigNumberish;
  toAmount: BigNumberish;
  to: string;
}
export interface UnpausedEventEmittedResponse {
  account: string;
}
export interface WithdrawEventEmittedResponse {
  sender: string;
  token: string;
  amount: BigNumberish;
  liquidity: BigNumberish;
  to: string;
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
export interface ReceiveSwapCrossChainRequest {
  sender: string;
  srcChainId: BigNumberish;
  srcAsset: string;
  dstAsset: string;
  amount: BigNumberish;
  haircut: BigNumberish;
  signature: Arrayish;
  id: Arrayish;
}
export interface SwapCrossChainRequest {
  fromToken: string;
  fromAmount: BigNumberish;
  minimumToAmount: BigNumberish;
  destinationAsset: BigNumberish;
  destinationChain: BigNumberish;
  deadline: BigNumberish;
  signature: Arrayish;
}
export interface PoolCrossChain {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param chainId_ Type: uint16, Indexed: false
   */
  'new'(chainId_: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param asset Type: address, Indexed: false
   */
  addAsset(token: string, asset: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   */
  c1(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  chainId(overrides?: ContractCallOverrides): Promise<number>;
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
  dev(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feeCollector(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getEquilibriumCoverageRatio(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getTokenAddresses(overrides?: ContractCallOverrides): Promise<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  haircutRate(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  maxPriceDeviation(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  pause(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  paused(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  priceOracle(overrides?: ContractCallOverrides): Promise<string>;
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
   * @param destinationAsset Type: uint256, Indexed: false
   * @param destinationChain Type: uint16, Indexed: false
   */
  quotePotentialSwap(
    fromToken: string,
    toToken: string,
    fromAmount: BigNumberish,
    destinationAsset: BigNumberish,
    destinationChain: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<QuotePotentialSwapResponse>;
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
   * @param params Type: tuple, Indexed: false
   */
  receiveSwapCrossChain(params: ReceiveSwapCrossChainRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   */
  recoverUserFunds(token: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param key Type: address, Indexed: false
   */
  removeAsset(key: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  retentionRatio(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  router(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param dev_ Type: address, Indexed: false
   */
  setDev(dev_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param feeCollector_ Type: address, Indexed: false
   */
  setFeeCollector(feeCollector_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param haircutRate_ Type: uint256, Indexed: false
   */
  setHaircutRate(haircutRate_: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param maxPriceDeviation_ Type: uint256, Indexed: false
   */
  setMaxPriceDeviation(maxPriceDeviation_: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param priceOracle_ Type: address, Indexed: false
   */
  setPriceOracle(priceOracle_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param retentionRatio_ Type: uint256, Indexed: false
   */
  setRetentionRatio(retentionRatio_: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param router_ Type: address, Indexed: false
   */
  setRouter(router_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param k_ Type: uint256, Indexed: false
   * @param n_ Type: uint256, Indexed: false
   * @param c1_ Type: uint256, Indexed: false
   * @param xThreshold_ Type: uint256, Indexed: false
   */
  setSlippageParams(k_: BigNumberish, n_: BigNumberish, c1_: BigNumberish, xThreshold_: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  slippageParamK(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  slippageParamN(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param requestParams_ Type: tuple, Indexed: false
   */
  swapCrossChain(requestParams_: SwapCrossChainRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(newOwner: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  unpause(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  xThreshold(overrides?: ContractCallOverrides): Promise<BigNumber>;
}
