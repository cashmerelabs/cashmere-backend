import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CashmereRouter2L0,
  CashmereRouter2L0MethodNames,
  CashmereRouter2L0EventsContext,
  CashmereRouter2L0Events
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
export type CashmereRouter2L0Events =
  | 'NewPendingSwap'
  | 'RoleAdminChanged'
  | 'RoleGranted'
  | 'RoleRevoked';
export interface CashmereRouter2L0EventsContext {
  NewPendingSwap(...parameters: any): EventFilter;
  RoleAdminChanged(...parameters: any): EventFilter;
  RoleGranted(...parameters: any): EventFilter;
  RoleRevoked(...parameters: any): EventFilter;
}
export type CashmereRouter2L0MethodNames =
  | 'CONTINUE_EXECUTOR_ROLE'
  | 'DEFAULT_ADMIN_ROLE'
  | 'ccRouter'
  | 'continueSwap'
  | 'getRoleAdmin'
  | 'getSwapId'
  | 'grantRole'
  | 'hasRole'
  | 'initialize'
  | 'pendingSwaps'
  | 'pool'
  | 'renounceRole'
  | 'revokeRole'
  | 'startSwap'
  | 'supportsInterface'
  | 'withdrawTokens';
export interface NewPendingSwapEventEmittedResponse {
  id: Arrayish;
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
export interface PendingSwapsResponse {
  id: string;
  0: string;
  nonce: BigNumber;
  1: BigNumber;
  hgsAmount: BigNumber;
  2: BigNumber;
  hgsToken: string;
  3: string;
  dstToken: string;
  4: string;
  dstChainId: number;
  5: number;
  receiver: string;
  6: string;
  processed: boolean;
  7: boolean;
  length: 8;
}
export interface StartSwapRequest {
  srcToken: string;
  srcAmount: BigNumberish;
  lwsToken: string;
  router1Inch: string;
  data: Arrayish;
  hgsToken: string;
  hgsAssetId: BigNumberish;
  dstToken: string;
  dstChain: BigNumberish;
}
export interface CashmereRouter2L0 {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  CONTINUE_EXECUTOR_ROLE(overrides?: ContractCallOverrides): Promise<string>;
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
  ccRouter(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param hgsToken Type: address, Indexed: false
   * @param hgsAmount Type: uint256, Indexed: false
   * @param dstToken Type: address, Indexed: false
   * @param router1Inch Type: address, Indexed: false
   * @param data Type: bytes, Indexed: false
   * @param receiver Type: address, Indexed: false
   */
  continueSwap(
    hgsToken: string,
    hgsAmount: BigNumberish,
    dstToken: string,
    router1Inch: string,
    data: Arrayish,
    receiver: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param nonce Type: uint256, Indexed: false
   * @param dstChainId Type: uint16, Indexed: false
   */
  getSwapId(
    nonce: BigNumberish,
    dstChainId: BigNumberish,
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pool_ Type: address, Indexed: false
   * @param ccRouter_ Type: address, Indexed: false
   * @param admin Type: address, Indexed: false
   */
  initialize(
    pool_: string,
    ccRouter_: string,
    admin: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  pendingSwaps(
    parameter0: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<PendingSwapsResponse>;
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
   * @param params Type: tuple, Indexed: false
   */
  startSwap(
    params: StartSwapRequest,
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
   * @param token Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  withdrawTokens(
    token: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
