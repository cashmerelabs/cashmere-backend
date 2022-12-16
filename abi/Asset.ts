import { ContractTransaction, ContractInterface, BytesLike as Arrayish, BigNumber, BigNumberish } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<Asset, AssetMethodNames, AssetEventsContext, AssetEvents>;

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
export type AssetEvents =
  | 'Approval'
  | 'CashAdded'
  | 'CashRemoved'
  | 'FeeCollectorUpdated'
  | 'LiabilityAdded'
  | 'LiabilityRemoved'
  | 'MaxSupplyUpdated'
  | 'OwnershipTransferred'
  | 'PoolUpdated'
  | 'Transfer';
export interface AssetEventsContext {
  Approval(...parameters: any): EventFilter;
  CashAdded(...parameters: any): EventFilter;
  CashRemoved(...parameters: any): EventFilter;
  FeeCollectorUpdated(...parameters: any): EventFilter;
  LiabilityAdded(...parameters: any): EventFilter;
  LiabilityRemoved(...parameters: any): EventFilter;
  MaxSupplyUpdated(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  PoolUpdated(...parameters: any): EventFilter;
  Transfer(...parameters: any): EventFilter;
}
export type AssetMethodNames =
  | 'new'
  | '_name'
  | '_symbol'
  | 'addCash'
  | 'addLiability'
  | 'aggregateAccount'
  | 'allowance'
  | 'approve'
  | 'balanceOf'
  | 'burn'
  | 'cash'
  | 'decimals'
  | 'decreaseAllowance'
  | 'feeCollector'
  | 'getCompensationRatio'
  | 'increaseAllowance'
  | 'liability'
  | 'maxSupply'
  | 'mint'
  | 'name'
  | 'owner'
  | 'pool'
  | 'removeCash'
  | 'removeLiability'
  | 'renounceOwnership'
  | 'setAggregateAccount'
  | 'setFeeCollector'
  | 'setMaxSupply'
  | 'setPool'
  | 'symbol'
  | 'totalSupply'
  | 'transfer'
  | 'transferFrom'
  | 'transferOwnership'
  | 'transferUnderlyingToken'
  | 'underlyingToken'
  | 'underlyingTokenBalance';
export interface ApprovalEventEmittedResponse {
  owner: string;
  spender: string;
  value: BigNumberish;
}
export interface CashAddedEventEmittedResponse {
  previousCashPosition: BigNumberish;
  cashBeingAdded: BigNumberish;
}
export interface CashRemovedEventEmittedResponse {
  previousCashPosition: BigNumberish;
  cashBeingRemoved: BigNumberish;
}
export interface FeeCollectorUpdatedEventEmittedResponse {
  previousFeeCollector: string;
  newFeeCollector: string;
}
export interface LiabilityAddedEventEmittedResponse {
  previousLiabilityPosition: BigNumberish;
  liabilityBeingAdded: BigNumberish;
}
export interface LiabilityRemovedEventEmittedResponse {
  previousLiabilityPosition: BigNumberish;
  liabilityBeingRemoved: BigNumberish;
}
export interface MaxSupplyUpdatedEventEmittedResponse {
  previousMaxSupply: BigNumberish;
  newMaxSupply: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PoolUpdatedEventEmittedResponse {
  previousPool: string;
  newPool: string;
}
export interface TransferEventEmittedResponse {
  from: string;
  to: string;
  value: BigNumberish;
}
export interface Asset {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param underlyingToken_ Type: address, Indexed: false
   * @param name_ Type: string, Indexed: false
   * @param symbol_ Type: string, Indexed: false
   * @param aggregateAccount_ Type: address, Indexed: false
   */
  'new'(underlyingToken_: string, name_: string, symbol_: string, aggregateAccount_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  _name(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  _symbol(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  addCash(amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  addLiability(amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  aggregateAccount(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   */
  allowance(owner: string, spender: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  approve(spender: string, amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  balanceOf(account: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  burn(to: string, amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  cash(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  decimals(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param subtractedValue Type: uint256, Indexed: false
   */
  decreaseAllowance(spender: string, subtractedValue: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
  getCompensationRatio(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param addedValue Type: uint256, Indexed: false
   */
  increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  liability(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  maxSupply(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  mint(to: string, amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pool(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  removeCash(amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  removeLiability(amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param aggregateAccount_ Type: address, Indexed: false
   */
  setAggregateAccount(aggregateAccount_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   * @param maxSupply_ Type: uint256, Indexed: false
   */
  setMaxSupply(maxSupply_: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pool_ Type: address, Indexed: false
   */
  setPool(pool_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalSupply(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  transfer(to: string, amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  transferFrom(from: string, to: string, amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  transferUnderlyingToken(to: string, amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  underlyingToken(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  underlyingTokenBalance(overrides?: ContractCallOverrides): Promise<BigNumber>;
}
