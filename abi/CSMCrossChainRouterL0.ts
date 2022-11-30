import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CSMCrossChainRouterL0,
  CSMCrossChainRouterL0MethodNames,
  CSMCrossChainRouterL0EventsContext,
  CSMCrossChainRouterL0Events
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
export type CSMCrossChainRouterL0Events =
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
export interface CSMCrossChainRouterL0EventsContext {
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
export type CSMCrossChainRouterL0MethodNames =
  | 'new'
  | 'ACCOUNTANT_ROLE'
  | 'DEFAULT_ADMIN_ROLE'
  | 'ROUTE_ROLE'
  | 'estimateFee'
  | 'failedMessages'
  | 'forceResumeL0Payload'
  | 'getApprovedAssetId'
  | 'getAssetData'
  | 'getAssetData'
  | 'getCrossChainAssetParams'
  | 'getFailedMessages'
  | 'getMessageReceived'
  | 'getRoleAdmin'
  | 'grantRole'
  | 'hasRole'
  | 'isApprovedAsset'
  | 'isApprovedAsset'
  | 'isApprovedRouter'
  | 'layerZeroEndpoint'
  | 'lzReceive'
  | 'modifyCrossChainParams'
  | 'nextNonce'
  | 'nonBlockingReceive'
  | 'refundAddress'
  | 'renounceRole'
  | 'retryL0Payload'
  | 'retryMessage'
  | 'revokeRole'
  | 'route'
  | 'supportsInterface'
  | 'toggleApprovedRouters'
  | 'toggleAssetAndChain'
  | 'togglePoolPerAssets';
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
  srcChainId: BigNumberish;
  srcAsset: string;
  dstAsset: string;
  nonce: BigNumberish;
  amount: BigNumberish;
  haircut: BigNumberish;
  signature: Arrayish;
}
export interface MessageRoutedEventEmittedResponse {
  destinationChain: BigNumberish;
  destinationAddress: string;
  nextNonce: BigNumberish;
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
  decimals: number;
  2: number;
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
export interface CcreceiveparamsResponse {
  sender: string;
  0: string;
  srcChainId: number;
  1: number;
  dstChainId: number;
  2: number;
  srcAsset: string;
  3: string;
  dstAsset: string;
  4: string;
  amount: BigNumber;
  5: BigNumber;
  haircut: BigNumber;
  6: BigNumber;
  signature: string;
  7: string;
}
export interface CSMCrossChainRouterL0 {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param l0Endpoint_ Type: address, Indexed: false
   */
  'new'(
    l0Endpoint_: string,
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
   * @param dstChain_ Type: uint16, Indexed: false
   * @param payload_ Type: bytes, Indexed: false
   */
  estimateFee(
    dstChain_: BigNumberish,
    payload_: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint16, Indexed: false
   * @param parameter1 Type: bytes, Indexed: false
   * @param parameter2 Type: uint64, Indexed: false
   */
  failedMessages(
    parameter0: BigNumberish,
    parameter1: Arrayish,
    parameter2: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param srcChainId_ Type: uint16, Indexed: false
   * @param srcAddress_ Type: bytes, Indexed: false
   */
  forceResumeL0Payload(
    srcChainId_: BigNumberish,
    srcAddress_: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param assetAddress_ Type: address, Indexed: false
   * @param chainId_ Type: uint16, Indexed: false
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
   * @param chainId_ Type: uint16, Indexed: false
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
   * @param chainId_ Type: uint16, Indexed: false
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
   * @param chainId_ Type: uint16, Indexed: false
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
   * @param chainId_ Type: uint16, Indexed: false
   * @param srcAddress_ Type: bytes, Indexed: false
   * @param nonce_ Type: uint64, Indexed: false
   */
  getFailedMessages(
    chainId_: BigNumberish,
    srcAddress_: Arrayish,
    nonce_: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param srcChain_ Type: uint16, Indexed: false
   * @param nonce_ Type: uint256, Indexed: false
   */
  getMessageReceived(
    srcChain_: BigNumberish,
    nonce_: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CcreceiveparamsResponse>;
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
   * @param chainId_ Type: uint16, Indexed: false
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
   * @param chainId_ Type: uint16, Indexed: false
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
   * @param chainId_ Type: uint16, Indexed: false
   */
  isApprovedRouter(
    chainId_: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  layerZeroEndpoint(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param srcChainId_ Type: uint16, Indexed: false
   * @param srcAddressBytes_ Type: bytes, Indexed: false
   * @param nonce_ Type: uint64, Indexed: false
   * @param payload_ Type: bytes, Indexed: false
   */
  lzReceive(
    srcChainId_: BigNumberish,
    srcAddressBytes_: Arrayish,
    nonce_: BigNumberish,
    payload_: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param chainId_ Type: uint16, Indexed: false
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
   * @param dstChain_ Type: uint16, Indexed: false
   */
  nextNonce(
    dstChain_: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param srcChainId_ Type: uint16, Indexed: false
   * @param srcAddressBytes_ Type: bytes, Indexed: false
   * @param nonce_ Type: uint64, Indexed: false
   * @param payload_ Type: bytes, Indexed: false
   */
  nonBlockingReceive(
    srcChainId_: BigNumberish,
    srcAddressBytes_: Arrayish,
    nonce_: BigNumberish,
    payload_: Arrayish,
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
   * @param srcChainId_ Type: uint16, Indexed: false
   * @param srcAddress_ Type: bytes, Indexed: false
   * @param payload_ Type: bytes, Indexed: false
   */
  retryL0Payload(
    srcChainId_: BigNumberish,
    srcAddress_: Arrayish,
    payload_: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _srcChainId Type: uint16, Indexed: false
   * @param _srcAddress Type: bytes, Indexed: false
   * @param _nonce Type: uint64, Indexed: false
   * @param _payload Type: bytes, Indexed: false
   */
  retryMessage(
    _srcChainId: BigNumberish,
    _srcAddress: Arrayish,
    _nonce: BigNumberish,
    _payload: Arrayish,
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
   * @param dstChain_ Type: uint16, Indexed: false
   * @param dstAddress_ Type: address, Indexed: false
   * @param fee_ Type: uint256, Indexed: false
   * @param payload_ Type: bytes, Indexed: false
   */
  route(
    dstChain_: BigNumberish,
    dstAddress_: string,
    fee_: BigNumberish,
    payload_: Arrayish,
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
   * @param chainId_ Type: uint16, Indexed: false
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
   * @param chainId_ Type: uint16, Indexed: false
   * @param assetAddress_ Type: address, Indexed: false
   * @param tokenAddress_ Type: address, Indexed: false
   * @param assetId_ Type: uint256, Indexed: false
   * @param decimals_ Type: uint16, Indexed: false
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
