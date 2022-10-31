import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CSMCrossChainRouter,
  CSMCrossChainRouterMethodNames,
  CSMCrossChainRouterEventsContext,
  CSMCrossChainRouterEvents
>;

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
export type CSMCrossChainRouterEvents =
  | 'ExecutionFeeChanged'
  | 'ForceResumeL0'
  | 'MessageFailed'
  | 'MessageReceived'
  | 'MessageRouted'
  | 'ModifyCrossChainParams'
  | 'RetryL0Payload'
  | 'RoleAdminChanged'
  | 'RoleGranted'
  | 'RoleRevoked'
  | 'ToggleApprovedRouter'
  | 'ToggleAssetAndChain'
  | 'TogglePoolPerAssets';
export interface CSMCrossChainRouterEventsContext {
  ExecutionFeeChanged(...parameters: any): EventFilter;
  ForceResumeL0(...parameters: any): EventFilter;
  MessageFailed(...parameters: any): EventFilter;
  MessageReceived(...parameters: any): EventFilter;
  MessageRouted(...parameters: any): EventFilter;
  ModifyCrossChainParams(...parameters: any): EventFilter;
  RetryL0Payload(...parameters: any): EventFilter;
  RoleAdminChanged(...parameters: any): EventFilter;
  RoleGranted(...parameters: any): EventFilter;
  RoleRevoked(...parameters: any): EventFilter;
  ToggleApprovedRouter(...parameters: any): EventFilter;
  ToggleAssetAndChain(...parameters: any): EventFilter;
  TogglePoolPerAssets(...parameters: any): EventFilter;
}
export type CSMCrossChainRouterMethodNames =
  | 'new'
  | 'ACCOUNTANT_ROLE'
  | 'DEFAULT_ADMIN_ROLE'
  | 'ROUTE_ROLE'
  | 'deBridgeGate'
  | 'estimateFee'
  | 'getApprovedAssetId'
  | 'getAssetData'
  | 'getAssetData'
  | 'getCrossChainAssetParams'
  | 'getRoleAdmin'
  | 'grantRole'
  | 'hasRole'
  | 'isApprovedAsset'
  | 'isApprovedAsset'
  | 'isApprovedRouter'
  | 'modifyCrossChainParams'
  | 'refundAddress'
  | 'renounceRole'
  | 'revokeRole'
  | 'route'
  | 'routerReceive'
  | 'supportsInterface'
  | 'toggleApprovedRouters'
  | 'toggleAssetAndChain'
  | 'togglePoolPerAssets';
export interface ExecutionFeeChangedEventEmittedResponse {
  _oldFee: BigNumberish;
  _newFee: BigNumberish;
}
export interface ForceResumeL0EventEmittedResponse {
  srcChain: BigNumberish;
  srcAddress: Arrayish;
}
export interface MessageFailedEventEmittedResponse {
  _srcChainId: BigNumberish;
  _srcAddress: Arrayish;
  _nonce: BigNumberish;
  _payload: Arrayish;
}
export interface MessageReceivedEventEmittedResponse {
  sender: string;
  srcAsset: string;
  dstAsset: string;
  amount: BigNumberish;
  haircut: BigNumberish;
}
export interface MessageRoutedEventEmittedResponse {
  destinationChain: BigNumberish;
  destinationAddress: string;
}
export interface ModifyCrossChainParamsEventEmittedResponse {
  chainId: BigNumberish;
  assetId: BigNumberish;
  cash: BigNumberish;
  liability: BigNumberish;
}
export interface RetryL0PayloadEventEmittedResponse {
  srcChain: BigNumberish;
  srcAddress: Arrayish;
  payload: Arrayish;
}
export interface RoleAdminChangedEventEmittedResponse {
  role: Arrayish;
  previousAdminRole: Arrayish;
  newAdminRole: Arrayish;
}
export interface RoleGrantedEventEmittedResponse {
  role: Arrayish;
  account: string;
  sender: string;
}
export interface RoleRevokedEventEmittedResponse {
  role: Arrayish;
  account: string;
  sender: string;
}
export interface ToggleApprovedRouterEventEmittedResponse {
  chainId: BigNumberish;
  router: string;
}
export interface ToggleAssetAndChainEventEmittedResponse {
  chainId: BigNumberish;
  assetAddress: string;
  tokenAddress: string;
  assetId: BigNumberish;
  decimals: BigNumberish;
  add: boolean;
}
export interface TogglePoolPerAssetsEventEmittedResponse {
  asset: string;
  pool: string;
}
export interface CrosschainassetResponse {
  cash: BigNumber;
  0: BigNumber;
  liability: BigNumber;
  1: BigNumber;
  decimals: BigNumber;
  2: BigNumber;
  assetId: BigNumber;
  3: BigNumber;
  nativeAssetAddress: string;
  4: string;
  nativeTokenAddress: string;
  5: string;
}
export interface GetCrossChainAssetParamsResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface CSMCrossChainRouter {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param deBridgeGate_ Type: address, Indexed: false
   */
  'new'(
    deBridgeGate_: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  ACCOUNTANT_ROLE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DEFAULT_ADMIN_ROLE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  ROUTE_ROLE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  deBridgeGate(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  estimateFee(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assetAddress_ Type: address, Indexed: false
   * @param chainId_ Type: uint256, Indexed: false
   */
  getApprovedAssetId(
    assetAddress_: string,
    chainId_: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chainId_ Type: uint256, Indexed: false
   * @param assetId_ Type: uint256, Indexed: false
   */
  getAssetData(
    chainId_: BigNumberish,
    assetId_: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CrosschainassetResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chainId_ Type: uint256, Indexed: false
   * @param assetAddress_ Type: address, Indexed: false
   */
  getAssetData(
    chainId_: BigNumberish,
    assetAddress_: string,
    overrides?: ContractCallOverrides
  ): Promise<CrosschainassetResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chainId_ Type: uint256, Indexed: false
   * @param assetId_ Type: uint256, Indexed: false
   */
  getCrossChainAssetParams(
    chainId_: BigNumberish,
    assetId_: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetCrossChainAssetParamsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   */
  getRoleAdmin(
    role: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  grantRole(
    role: Arrayish,
    account: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  hasRole(
    role: Arrayish,
    account: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chainId_ Type: uint256, Indexed: false
   * @param assetId_ Type: uint256, Indexed: false
   */
  isApprovedAsset(
    chainId_: BigNumberish,
    assetId_: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chainId_ Type: uint256, Indexed: false
   * @param assetAddress_ Type: address, Indexed: false
   */
  isApprovedAsset(
    chainId_: BigNumberish,
    assetAddress_: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param chainId_ Type: uint256, Indexed: false
   * @param router_ Type: address, Indexed: false
   */
  isApprovedRouter(
    chainId_: BigNumberish,
    router_: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param chainId_ Type: uint256, Indexed: false
   * @param assetId_ Type: uint256, Indexed: false
   * @param cash_ Type: uint256, Indexed: false
   * @param liability_ Type: uint256, Indexed: false
   */
  modifyCrossChainParams(
    chainId_: BigNumberish,
    assetId_: BigNumberish,
    cash_: BigNumberish,
    liability_: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  refundAddress(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  renounceRole(
    role: Arrayish,
    account: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  revokeRole(
    role: Arrayish,
    account: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param dstChain_ Type: uint256, Indexed: false
   * @param dstAddress_ Type: address, Indexed: false
   * @param payload_ Type: bytes, Indexed: false
   * @param executionFee_ Type: uint256, Indexed: false
   */
  route(
    dstChain_: BigNumberish,
    dstAddress_: string,
    payload_: Arrayish,
    executionFee_: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param sender_ Type: address, Indexed: false
   * @param srcAsset_ Type: address, Indexed: false
   * @param dstAsset_ Type: address, Indexed: false
   * @param amount_ Type: uint256, Indexed: false
   * @param haircut_ Type: uint256, Indexed: false
   * @param nonce_ Type: uint256, Indexed: false
   */
  routerReceive(
    sender_: string,
    srcAsset_: string,
    dstAsset_: string,
    amount_: BigNumberish,
    haircut_: BigNumberish,
    nonce_: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(
    interfaceId: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param chainId_ Type: uint256, Indexed: false
   * @param router_ Type: address, Indexed: false
   */
  toggleApprovedRouters(
    chainId_: BigNumberish,
    router_: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param chainId_ Type: uint256, Indexed: false
   * @param assetAddress_ Type: address, Indexed: false
   * @param tokenAddress_ Type: address, Indexed: false
   * @param assetId_ Type: uint256, Indexed: false
   * @param decimals_ Type: uint256, Indexed: false
   * @param add_ Type: bool, Indexed: false
   */
  toggleAssetAndChain(
    chainId_: BigNumberish,
    assetAddress_: string,
    tokenAddress_: string,
    assetId_: BigNumberish,
    decimals_: BigNumberish,
    add_: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset_ Type: address, Indexed: false
   * @param pool_ Type: address, Indexed: false
   */
  togglePoolPerAssets(
    asset_: string,
    pool_: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
