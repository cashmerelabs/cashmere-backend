import { ContractTransaction, ContractInterface, BytesLike as Arrayish, BigNumber, BigNumberish } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<OffchainOracle, OffchainOracleMethodNames, OffchainOracleEventsContext, OffchainOracleEvents>;

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
export type OffchainOracleEvents = 'ConnectorAdded' | 'ConnectorRemoved' | 'MultiWrapperUpdated' | 'OracleAdded' | 'OracleRemoved' | 'OwnershipTransferred';
export interface OffchainOracleEventsContext {
  ConnectorAdded(...parameters: any): EventFilter;
  ConnectorRemoved(...parameters: any): EventFilter;
  MultiWrapperUpdated(...parameters: any): EventFilter;
  OracleAdded(...parameters: any): EventFilter;
  OracleRemoved(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
}
export type OffchainOracleMethodNames =
  | 'new'
  | 'addConnector'
  | 'addOracle'
  | 'connectors'
  | 'getRate'
  | 'getRateToEth'
  | 'multiWrapper'
  | 'oracles'
  | 'owner'
  | 'removeConnector'
  | 'removeOracle'
  | 'renounceOwnership'
  | 'setMultiWrapper'
  | 'transferOwnership';
export interface ConnectorAddedEventEmittedResponse {
  connector: string;
}
export interface ConnectorRemovedEventEmittedResponse {
  connector: string;
}
export interface MultiWrapperUpdatedEventEmittedResponse {
  multiWrapper: string;
}
export interface OracleAddedEventEmittedResponse {
  oracle: string;
  oracleType: BigNumberish;
}
export interface OracleRemovedEventEmittedResponse {
  oracle: string;
  oracleType: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface OraclesResponse {
  allOracles: string[];
  0: string[];
  oracleTypes: number[];
  1: number[];
  length: 2;
}
export interface OffchainOracle {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _multiWrapper Type: address, Indexed: false
   * @param existingOracles Type: address[], Indexed: false
   * @param oracleTypes Type: uint8[], Indexed: false
   * @param existingConnectors Type: address[], Indexed: false
   * @param wBase Type: address, Indexed: false
   */
  'new'(
    _multiWrapper: string,
    existingOracles: string[],
    oracleTypes: BigNumberish[],
    existingConnectors: string[],
    wBase: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param connector Type: address, Indexed: false
   */
  addConnector(connector: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param oracle Type: address, Indexed: false
   * @param oracleKind Type: uint8, Indexed: false
   */
  addOracle(oracle: string, oracleKind: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  connectors(overrides?: ContractCallOverrides): Promise<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param srcToken Type: address, Indexed: false
   * @param dstToken Type: address, Indexed: false
   * @param useWrappers Type: bool, Indexed: false
   */
  getRate(srcToken: string, dstToken: string, useWrappers: boolean, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param srcToken Type: address, Indexed: false
   * @param useSrcWrappers Type: bool, Indexed: false
   */
  getRateToEth(srcToken: string, useSrcWrappers: boolean, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  multiWrapper(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  oracles(overrides?: ContractCallOverrides): Promise<OraclesResponse>;
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
   * @param connector Type: address, Indexed: false
   */
  removeConnector(connector: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param oracle Type: address, Indexed: false
   * @param oracleKind Type: uint8, Indexed: false
   */
  removeOracle(oracle: string, oracleKind: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   * @param _multiWrapper Type: address, Indexed: false
   */
  setMultiWrapper(_multiWrapper: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(newOwner: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
}
