import { Injectable } from '@nestjs/common';
// import { Alchemy, Network } from 'alchemy-sdk';
// import { BigNumber, ethers, Transaction, Wallet } from 'ethers';
//
// import { ContractContext as PoolCrossChainContext } from '../abi/PoolCrossChain';
// import * as PoolCrossChainABI from '../abi/PoolCrossChain.abi.json';
// import { ContractContext as PoolCrossChainL0Context } from '../abi/PoolCrossChainL0';
// import * as PoolCrossChainL0ABI from '../abi/PoolCrossChainL0.abi.json';
// import { ContractContext as PoolContext } from '../abi/Pool';
// import * as PoolABI from '../abi/Pool.abi.json';
// import { ContractContext as AssetContext } from '../abi/Asset';
// import * as AssetABI from '../abi/Asset.abi.json';
// import { ContractContext as CashmereRouter2Context } from '../abi/CashmereRouter2';
// import * as CashmereRouter2ABI from '../abi/CashmereRouter2.abi.json';
// import { ContractContext as CashmereRouter2L0Context } from '../abi/CashmereRouter2L0';
// import * as CashmereRouter2L0ABI from '../abi/CashmereRouter2L0.abi.json';
// import { ContractContext as CSMRouterContext } from '../abi/CSMCrossChainRouter';
// import * as CSMRouterABI from '../abi/CSMCrossChainRouter.abi.json';
// import { ContractContext as CSMRouterL0Context } from '../abi/CSMCrossChainRouterL0';
// import * as CSMRouterL0ABI from '../abi/CSMCrossChainRouterL0.abi.json';
import { ConsoleService } from 'nestjs-console';
// import axios from 'axios';
// import { Log } from 'ethereum-abi-types-generator';
import {
  ChainID,
  l0ProcessHistory,
  l0UpdateLastBlock,
  l0Worker,
} from './app.worker';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly consoleService: ConsoleService,
    private configService: ConfigService,
  ) {
    const pk = configService.get<string>('WALLET_PK');
    const cli = consoleService.getCli();
    // consoleService.createCommand(
    //   {
    //     command: 'worker',
    //   },
    //   () => this.worker(),
    //   cli,
    // );
    consoleService.createCommand(
      {
        command: 'workerL0 <networkId>',
      },
      (networkId: string) => l0Worker(networkId as ChainID, pk),
      cli,
    );
    consoleService.createCommand(
      {
        command: 'parseLogsL0 <networkId> <fromBlock>',
      },
      async (networkId: string, fromBlock: string) => {
        await l0ProcessHistory(networkId as ChainID, parseInt(fromBlock), pk);
        process.exit();
      },
      cli,
    );
    consoleService.createCommand(
      {
        command: 'updateLastBlock <networkId> <lastBlock>',
      },
      async (networkId: string, lastBlock: string) => {
        await l0UpdateLastBlock(
          networkId as ChainID,
          lastBlock === 'latest' ? 'latest' : parseInt(lastBlock),
          true,
        );
        process.exit();
      },
      cli,
    );
  }

  // getHello(): string {
  //   return 'Hello World!';
  // }

  // getAlchemyInstance(chainId: ChainID) {
  //   switch (chainId) {
  //     case POLYGON_CHAIN_ID:
  //       return new Alchemy({
  //         apiKey: 'Zl98YtSpxqX-cifHCoZEWN7ncytcmVln',
  //         network: Network.MATIC_MAINNET,
  //       });
  //     case ARBITRUM_CHAIN_ID:
  //       return new Alchemy({
  //         apiKey: 'zpfIgef6IVAMeTcaS5v9PLZFp1aiGDi1',
  //         network: Network.ARB_MAINNET,
  //       });
  //     default:
  //       throw Error('Invalid chain ID');
  //   }
  // }

  // async getCrossChainPoolContract(
  //   chainId: ChainID,
  // ): Promise<PoolCrossChainContext> {
  //   return new ethers.Contract(
  //     crossChainPools[chainId],
  //     PoolCrossChainABI,
  //     await this.getAlchemyInstance(chainId).config.getProvider(),
  //   ) as unknown as PoolCrossChainContext;
  // }
  //
  // async getPoolContract(chainId: ChainID): Promise<PoolContext> {
  //   const localPool = localPools[chainId];
  //   const contractInterface = PoolABI;
  //   const signerOrProvider = await this.getAlchemyInstance(
  //     chainId,
  //   ).config.getProvider();
  //   return new ethers.Contract(
  //     localPool,
  //     contractInterface,
  //     signerOrProvider,
  //   ) as unknown as PoolContext;
  // }
  //
  // async getAssetContract(
  //   chainId: ChainID,
  //   address: string,
  // ): Promise<AssetContext> {
  //   return new ethers.Contract(
  //     address,
  //     AssetABI,
  //     await this.getAlchemyInstance(chainId).config.getProvider(),
  //   ) as unknown as AssetContext;
  // }
  //
  // async getSwapRouter(chainId: ChainID): Promise<CashmereRouter2Context> {
  //   return new ethers.Contract(
  //     swapRouters[chainId],
  //     CashmereRouter2ABI,
  //     await this.getAlchemyInstance(chainId).config.getProvider(),
  //   ) as unknown as CashmereRouter2Context;
  // }
  //
  // async getCrossChainRouter(chainId: ChainID): Promise<CSMRouterContext> {
  //   return new ethers.Contract(
  //     crossChainRouters[chainId],
  //     CSMRouterABI,
  //     await this.getAlchemyInstance(chainId).config.getProvider(),
  //   ) as unknown as CSMRouterContext;
  // }
  //
  // worker = async () => {
  //   const alchemy = {
  //     [POLYGON_CHAIN_ID]: await this.getAlchemyInstance(POLYGON_CHAIN_ID),
  //     [ARBITRUM_CHAIN_ID]: await this.getAlchemyInstance(ARBITRUM_CHAIN_ID),
  //   };
  //
  //   const blockIds = {
  //     [POLYGON_CHAIN_ID]: await alchemy[POLYGON_CHAIN_ID].core.getBlockNumber(),
  //     [ARBITRUM_CHAIN_ID]: await alchemy[
  //       ARBITRUM_CHAIN_ID
  //     ].core.getBlockNumber(),
  //   };
  //
  //   const swapRouters = {
  //     [POLYGON_CHAIN_ID]: await this.getSwapRouter(POLYGON_CHAIN_ID),
  //     [ARBITRUM_CHAIN_ID]: await this.getSwapRouter(ARBITRUM_CHAIN_ID),
  //   };
  //
  //   const crossChainPools = {
  //     [POLYGON_CHAIN_ID]: await this.getCrossChainPoolContract(
  //       POLYGON_CHAIN_ID,
  //     ),
  //     [ARBITRUM_CHAIN_ID]: await this.getCrossChainPoolContract(
  //       ARBITRUM_CHAIN_ID,
  //     ),
  //   };
  //
  //   const pendingData: { [k in ChainID]: PendingSwap[] } = {
  //     [POLYGON_CHAIN_ID]: [],
  //     [ARBITRUM_CHAIN_ID]: [],
  //   };
  //
  //   // swapRouters[POLYGON_CHAIN_ID].on('NewPendingSwap', async (id) => {
  //   //   const eventData = await swapRouters[POLYGON_CHAIN_ID].pendingSwaps(id);
  //   //   const conv = {
  //   //     id: eventData.id,
  //   //     hgsAmount: eventData.hgsAmount,
  //   //     hgsToken: eventData.hgsToken,
  //   //     dstToken: eventData.dstToken,
  //   //     dstChainId: eventData.dstChainId,
  //   //     receiver: eventData.receiver,
  //   //     processed: eventData.processed,
  //   //   };
  //   //   pendingData[POLYGON_CHAIN_ID].push(conv);
  //   //   console.log(`poly swap nps ${id}`);
  //   // });
  //   //
  //   // swapRouters[ARBITRUM_CHAIN_ID].on('NewPendingSwap', async (id) => {
  //   //   const eventData = await swapRouters[ARBITRUM_CHAIN_ID].pendingSwaps(id);
  //   //   const conv = {
  //   //     id: eventData.id,
  //   //     hgsAmount: eventData.hgsAmount,
  //   //     hgsToken: eventData.hgsToken,
  //   //     dstToken: eventData.dstToken,
  //   //     dstChainId: eventData.dstChainId,
  //   //     receiver: eventData.receiver,
  //   //     processed: eventData.processed,
  //   //   };
  //   //   pendingData[ARBITRUM_CHAIN_ID].push(conv);
  //   //   console.log(`arb swap nps ${id}`);
  //   // });
  //
  //   const polygonListener = async (
  //     sender,
  //     srcAsset,
  //     dstAsset,
  //     dstChainId,
  //     fromAmount,
  //     toAmount,
  //     nonce,
  //   ) => {
  //     if (
  //       assets[POLYGON_CHAIN_ID].includes(ethers.utils.getAddress(srcAsset))
  //     ) {
  //       const eventData = await swapRouters[POLYGON_CHAIN_ID].pendingSwaps(
  //         nonce,
  //       );
  //       if (eventData.id.eq(0)) {
  //         console.log(`psrc ${nonce} discarded`);
  //         return;
  //       }
  //       const conv = {
  //         id: eventData.id.toString(),
  //         hgsAmount: eventData.hgsAmount,
  //         hgsToken: eventData.hgsToken,
  //         dstToken: eventData.dstToken,
  //         dstChainId: eventData.dstChainId,
  //         receiver: eventData.receiver,
  //         processed: eventData.processed,
  //       };
  //       pendingData[POLYGON_CHAIN_ID].push(conv);
  //       console.log(`swap from poly ${nonce}`, conv);
  //     } else {
  //       const swapData = pendingData[ARBITRUM_CHAIN_ID].filter(
  //         (s) => s.id == nonce.toString(),
  //       )[0];
  //       if (typeof swapData === 'undefined') {
  //         console.log(`pdst ${nonce} discarded`);
  //         return;
  //       }
  //       const { data } = await axios.get(
  //         `https://api.1inch.io/v4.0/${POLYGON_CHAIN_ID}/swap`,
  //         {
  //           params: {
  //             fromTokenAddress: swapData.hgsToken,
  //             toTokenAddress: swapData.dstToken,
  //             amount: swapData.hgsAmount.toString(),
  //             fromAddress: swapRouters[POLYGON_CHAIN_ID].address,
  //             slippage: '1',
  //             disableEstimate: true,
  //           },
  //         },
  //       );
  //       const wallet = new Wallet(
  //         'f508009a86f269a13b0ab32400500db64c61950ba59bd436eb0d8637a4aaf949',
  //         await alchemy[POLYGON_CHAIN_ID].config.getProvider(),
  //       );
  //       console.log(
  //         'gasPrice polygon',
  //         await alchemy[POLYGON_CHAIN_ID].core.getGasPrice(),
  //       );
  //       const receipt = await swapRouters[POLYGON_CHAIN_ID].connect(
  //         wallet,
  //       ).continueSwap(
  //         swapData.hgsToken,
  //         swapData.hgsAmount,
  //         swapData.dstToken,
  //         data.tx.to,
  //         data.tx.data,
  //         swapData.receiver,
  //         { gasPrice: await alchemy[POLYGON_CHAIN_ID].core.getGasPrice() },
  //       );
  //       console.log(`swap to poly ${nonce} executed`, receipt.hash);
  //     }
  //   };
  //
  //   const arbitrumListener = async (
  //     sender,
  //     srcAsset,
  //     dstAsset,
  //     dstChainId,
  //     fromAmount,
  //     toAmount,
  //     nonce,
  //   ) => {
  //     if (
  //       assets[ARBITRUM_CHAIN_ID].includes(ethers.utils.getAddress(srcAsset))
  //     ) {
  //       const eventData = await swapRouters[ARBITRUM_CHAIN_ID].pendingSwaps(
  //         nonce,
  //       );
  //       if (eventData.id.eq(0)) {
  //         console.log(`asrc ${nonce} discarded`);
  //         return;
  //       }
  //       const conv = {
  //         id: eventData.id.toString(),
  //         hgsAmount: eventData.hgsAmount,
  //         hgsToken: eventData.hgsToken,
  //         dstToken: eventData.dstToken,
  //         dstChainId: eventData.dstChainId,
  //         receiver: eventData.receiver,
  //         processed: eventData.processed,
  //       };
  //       pendingData[ARBITRUM_CHAIN_ID].push(conv);
  //       console.log(`swap from arb ${nonce}`, conv);
  //     } else {
  //       const swapData = pendingData[POLYGON_CHAIN_ID].filter(
  //         (s) => s.id == nonce.toString(),
  //       )[0];
  //       if (typeof swapData === 'undefined') {
  //         console.log(`adst ${nonce} discarded`);
  //         return;
  //       }
  //       const { data } = await axios.get(
  //         `https://api.1inch.io/v4.0/${ARBITRUM_CHAIN_ID}/swap`,
  //         {
  //           params: {
  //             fromTokenAddress: swapData.hgsToken,
  //             toTokenAddress: swapData.dstToken,
  //             amount: swapData.hgsAmount.toString(),
  //             fromAddress: swapRouters[ARBITRUM_CHAIN_ID].address,
  //             slippage: '1',
  //             disableEstimate: true,
  //           },
  //         },
  //       );
  //       const wallet = new Wallet(
  //         'f508009a86f269a13b0ab32400500db64c61950ba59bd436eb0d8637a4aaf949',
  //         await alchemy[ARBITRUM_CHAIN_ID].config.getProvider(),
  //       );
  //       console.log(
  //         'gasPrice arbitrum',
  //         await alchemy[ARBITRUM_CHAIN_ID].core.getGasPrice(),
  //       );
  //       const receipt = await swapRouters[ARBITRUM_CHAIN_ID].connect(
  //         wallet,
  //       ).continueSwap(
  //         swapData.hgsToken,
  //         swapData.hgsAmount,
  //         swapData.dstToken,
  //         data.tx.to,
  //         data.tx.data,
  //         swapData.receiver,
  //         { gasPrice: await alchemy[ARBITRUM_CHAIN_ID].core.getGasPrice() },
  //       );
  //       console.log(`swap to arb ${nonce} executed`, receipt.hash);
  //     }
  //   };
  //
  //   // await polygonListener(
  //   //   '0x1d50ef6ca5a297292ce7b08c73c333b15a8b1e26',
  //   //   '0x3da1d8df0a81f2be85cfaeaf2bb1801850d5b1e9',
  //   //   '0x7208c5b0b192ca7209438e400fa66362e7291f46',
  //   //   BigNumber.from(42161),
  //   //   BigNumber.from(1361790),
  //   //   BigNumber.from(36626),
  //   //   BigNumber.from(15),
  //   // );
  //
  //   // await arbitrumListener(
  //   //   '0x1d50ef6ca5a297292ce7b08c73c333b15a8b1e26',
  //   //   '0x54ee6ec91b990284b811d1eb20e3637ba30f1efb',
  //   //   '0x24e6e26c3fd477cf32026ad7030c47c23082f048',
  //   //   BigNumber.from(137),
  //   //   BigNumber.from(32980),
  //   //   BigNumber.from(33045),
  //   //   BigNumber.from(7),
  //   // );
  //
  //   // pendingData[POLYGON_CHAIN_ID].push({
  //   //   id: '16',
  //   //   hgsAmount: BigNumber.from('0xb13a'),
  //   //   hgsToken: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  //   //   dstToken: '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0',
  //   //   dstChainId: BigNumber.from(ARBITRUM_CHAIN_ID),
  //   //   receiver: '0x7ec72BF2EC851d64725A4BCA2759FaB17bBc9F5C',
  //   //   processed: false,
  //   // });
  //   //
  //   // pendingData[POLYGON_CHAIN_ID].push({
  //   //   id: '17',
  //   //   hgsAmount: BigNumber.from('0x0206'),
  //   //   hgsToken: '0x54Ee6EC91B990284B811d1eb20e3637ba30f1efb',
  //   //   dstToken: '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0',
  //   //   dstChainId: BigNumber.from(ARBITRUM_CHAIN_ID),
  //   //   receiver: '0x7ec72BF2EC851d64725A4BCA2759FaB17bBc9F5C',
  //   //   processed: false,
  //   // });
  //   //
  //   // pendingData[ARBITRUM_CHAIN_ID].push({
  //   //   id: '8',
  //   //   hgsAmount: BigNumber.from('0x19cb'),
  //   //   hgsToken: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  //   //   dstToken: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
  //   //   dstChainId: BigNumber.from('0x89'),
  //   //   receiver: '0x7ec72BF2EC851d64725A4BCA2759FaB17bBc9F5C',
  //   //   processed: false,
  //   // });
  //   //
  //   // pendingData[ARBITRUM_CHAIN_ID].push({
  //   //   id: '9',
  //   //   hgsAmount: BigNumber.from('0x19cb'),
  //   //   hgsToken: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  //   //   dstToken: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
  //   //   dstChainId: BigNumber.from('0x89'),
  //   //   receiver: '0x7ec72BF2EC851d64725A4BCA2759FaB17bBc9F5C',
  //   //   processed: false,
  //   // });
  //
  //   // let flt;
  //   // flt = crossChainPools[ARBITRUM_CHAIN_ID].filters.CrossChainSwap();
  //   // flt.fromBlock = 29324740;
  //   // const alogs = await alchemy[ARBITRUM_CHAIN_ID].core.getLogs(flt);
  //   // await Promise.all(
  //   //   alogs.map((l) => {
  //   //     const lp = crossChainPools[ARBITRUM_CHAIN_ID].interface.parseLog(l);
  //   //     const { sender, srcAsset, dstAsset, chainId, fromAmount, toAmount, nonce } = lp.args;
  //   //     return arbitrumListener(sender, srcAsset, dstAsset, chainId, fromAmount, toAmount, nonce);
  //   //   }),
  //   // );
  //   // flt = crossChainPools[POLYGON_CHAIN_ID].filters.CrossChainSwap();
  //   // flt.fromBlock = 34141950;
  //   // const plogs = await alchemy[POLYGON_CHAIN_ID].core.getLogs(flt);
  //   // await Promise.all(
  //   //   plogs.map((l) => {
  //   //     const lp = crossChainPools[POLYGON_CHAIN_ID].interface.parseLog(l);
  //   //     const { sender, srcAsset, dstAsset, chainId, fromAmount, toAmount, nonce } = lp.args;
  //   //     return polygonListener(sender, srcAsset, dstAsset, chainId, fromAmount, toAmount, nonce);
  //   //   }),
  //   // );
  //
  //   crossChainPools[POLYGON_CHAIN_ID].on('CrossChainSwap', polygonListener);
  //   crossChainPools[ARBITRUM_CHAIN_ID].on('CrossChainSwap', arbitrumListener);
  //   await new Promise(() => {
  //     console.log('started');
  //   });
  //
  //   // while (true) {
  //   //   for (const chainId of ChainIDsList) {
  //   //     const currentBlockId = await alchemy[chainId].core.getBlockNumber();
  //   //     if (currentBlockId <= blockIds[chainId])
  //   //       continue;
  //   //     const newSwaps = await swapRouters[chainId].queryFilter(
  //   //       swapRouters[chainId].NewPendingSwap(),
  //   //       blockIds[chainId],
  //   //       currentBlockId
  //   //     ) as unknown as Event<NewPendingSwapEventEmittedResponse>[];
  //   //   }
  //   // }
  // };
}
