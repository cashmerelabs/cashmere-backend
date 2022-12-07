import Redis from 'ioredis';
import { constants, ethers, providers, utils, Wallet } from 'ethers';
import * as PoolCrossChainL0ABI from '../abi/PoolCrossChainL0.abi.json';
import { ContractContext as PoolCrossChainL0Context } from '../abi/PoolCrossChainL0';
import * as CSMRouterL0ABI from '../abi/CSMCrossChainRouterL0.abi.json';
import { ContractContext as CSMRouterL0Context } from '../abi/CSMCrossChainRouterL0';
import * as PoolABI from '../abi/Pool.abi.json';
import { ContractContext as PoolContext } from '../abi/Pool';
import * as CashmereRouter2L0ABI from '../abi/CashmereRouter2L0.abi.json';
import { ContractContext as CashmereRouter2L0Context } from '../abi/CashmereRouter2L0';
import * as OffchainOracleABI from '../abi/OffchainOracle.abi.json';
import { ContractContext as OffchainOracleContext } from '../abi/OffchainOracle';
import { Log } from 'ethereum-abi-types-generator';
import axios from 'axios';
import * as AssetABI from '../abi/Asset.abi.json';
import { ContractContext as AssetContext } from '../abi/Asset';

export const ETHEREUM_CHAIN_ID = '1';
export const POLYGON_CHAIN_ID = '137';
export const ARBITRUM_CHAIN_ID = '42161';
export const AVALANCHE_CHAIN_ID = '43114';
export const BSC_CHAIN_ID = '56';
export const OPTIMISM_CHAIN_ID = '10';
export const FANTOM_CHAIN_ID = '250';
export type ChainID =
  | typeof ETHEREUM_CHAIN_ID
  | typeof POLYGON_CHAIN_ID
  | typeof ARBITRUM_CHAIN_ID
  | typeof AVALANCHE_CHAIN_ID
  | typeof BSC_CHAIN_ID
  | typeof OPTIMISM_CHAIN_ID
  | typeof FANTOM_CHAIN_ID;
export const CHAIN_IDS = [ETHEREUM_CHAIN_ID, POLYGON_CHAIN_ID, ARBITRUM_CHAIN_ID, AVALANCHE_CHAIN_ID, BSC_CHAIN_ID, OPTIMISM_CHAIN_ID, FANTOM_CHAIN_ID];

interface SwapEntry {
  id: string;
  nonce: string;
  txid: string;
  lwsToken: string;
  hgsAmount: string;
  hgsToken: string;
  dstToken: string;
  dstChainId: string;
  receiver: string;
  processed: boolean;
  minHgsAmount: string;
  signature: string;
  storageKey: string;
  srcChainId: string;
}

class Network {
  ethers: providers.JsonRpcProvider;
  l0CrossChainPool: PoolCrossChainL0Context;
  l0CrossChainRouter: CSMRouterL0Context;
  intraChainPool: PoolContext;
  l0AggregatorRouter: CashmereRouter2L0Context;
  l0Oracle: OffchainOracleContext;

  constructor(
    public readonly chainId: ChainID,
    private readonly rpcUrl: string,
    public readonly l0CrossChainPoolAddress: string,
    public readonly l0CrossChainRouterAddress: string,
    public readonly intraChainPoolAddress: string,
    public readonly l0AggregatorRouterAddress: string,
    public readonly l0OracleAddress: string,
    public readonly l0ChainId: string,
  ) {
    this.ethers = new providers.JsonRpcProvider(rpcUrl);
    this.l0CrossChainPool = new ethers.Contract(this.l0CrossChainPoolAddress, PoolCrossChainL0ABI, this.ethers) as unknown as PoolCrossChainL0Context;
    this.l0CrossChainRouter = new ethers.Contract(this.l0CrossChainRouterAddress, CSMRouterL0ABI, this.ethers) as unknown as CSMRouterL0Context;
    this.intraChainPool = new ethers.Contract(this.intraChainPoolAddress, PoolABI, this.ethers) as unknown as PoolContext;
    this.l0AggregatorRouter = new ethers.Contract(this.l0AggregatorRouterAddress, CashmereRouter2L0ABI, this.ethers) as unknown as CashmereRouter2L0Context;
    this.l0Oracle = new ethers.Contract(this.l0OracleAddress, OffchainOracleABI, this.ethers) as unknown as OffchainOracleContext;
  }

  assetContract(address: string) {
    return new ethers.Contract(address, AssetABI, this.ethers) as unknown as AssetContext;
  }
}

export const networks = {
  [ETHEREUM_CHAIN_ID]: new Network(
    ETHEREUM_CHAIN_ID,
    'https://eth-mainnet.g.alchemy.com/v2/dcp_zwzQ14lWcfuLy3tGJxz1MV0VtRY4',
    '0x58DDb2cec22ef964ee3CB1C27C6D9Db982EE0159',
    '0x4524051687b6ff963Bd4316a6B7215F39f029196',
    '0x3Cd49a6046e675A6d4274CC773370C00a30bbf88',
    '0xF8e8fcC6eCC323fae58E18CFf9065dac65AAeC93',
    '0x07D91f5fb9Bf7798734C3f606dB065549F6893bb',
    '101',
  ),
  [POLYGON_CHAIN_ID]: new Network(
    POLYGON_CHAIN_ID,
    'https://polygon-mainnet.g.alchemy.com/v2/Zl98YtSpxqX-cifHCoZEWN7ncytcmVln',
    '0x0EC0492846C2B436Ef6937922621621AE4876FF9',
    '0x9657ff118FBC316B3484b006f4D46F53dADd2402',
    '0x9d3EE96e1Ac53a542cCE8642c69D7e11abbA059a',
    '0xF8e8fcC6eCC323fae58E18CFf9065dac65AAeC93',
    '0x7F069df72b7A39bCE9806e3AfaF579E54D8CF2b9',
    '109',
  ),
  [ARBITRUM_CHAIN_ID]: new Network(
    ARBITRUM_CHAIN_ID,
    'https://arb-mainnet.g.alchemy.com/v2/zpfIgef6IVAMeTcaS5v9PLZFp1aiGDi1',
    '0x89c2fCe0Af62Dce683830fD3A1C3f56EBCfCE08D',
    '0x1544223c90b955D0764da4Bd147c2Aa0151458C5',
    '0xb0520bd64fe1496864374D21DE27B291Ecd16972',
    '0x6Ad76f1d0eb23FBa3Ed9EC86bb6EED253948e449',
    '0x735247fb0a604c0adC6cab38ACE16D0DbA31295F',
    '110',
  ),
  [AVALANCHE_CHAIN_ID]: new Network(
    AVALANCHE_CHAIN_ID,
    'https://nd-560-802-739.p2pify.com/674eee0b0c80bc678c921340d997d035/ext/bc/C/rpc',
    '0xB28F8C2eD463bbf032fF0267f3A6924D2c2bb761',
    '0x2ad78787CCaf7FA8FAe8953FD78ab9163f81DcC8',
    '0x557278364B136a8D7686016b1930c8C7136d8af9',
    '0xf3Cd02e2F31515Bfaa00b9d2C20173e25c4c4308',
    '0xBd0c7AaF0bF082712EbE919a9dD94b2d978f79A9',
    '106',
  ),
  [BSC_CHAIN_ID]: new Network(
    BSC_CHAIN_ID,
    'https://nd-920-310-122.p2pify.com/2ec0aa8517fbb2563b494d7a22ceb61f',
    '0x89D26b3E199E7b0d89a587a1709579Cf5ece3d64',
    '0x9243C47dAeBAA1b0a881Dd287467Bd215A8726b3',
    '0x3782d8FD91EC44d9364538d163b2DC8E138501CE',
    '0x6Ad76f1d0eb23FBa3Ed9EC86bb6EED253948e449',
    '0xfbD61B037C325b959c0F6A7e69D8f37770C2c550',
    '102',
  ),
  [OPTIMISM_CHAIN_ID]: new Network(
    OPTIMISM_CHAIN_ID,
    'https://opt-mainnet.g.alchemy.com/v2/x6bH_tMmUpkTR5kaOQrWg8uITMZyhYeH',
    '0x8b7Af56E9aBa6d8b96409A6285BFf1Dde86792C9',
    '0x557278364B136a8D7686016b1930c8C7136d8af9',
    '0x8EdB69919835e98b5a4f751FAdB78d66C880475C',
    '0xF8e8fcC6eCC323fae58E18CFf9065dac65AAeC93',
    '0x11DEE30E710B8d4a8630392781Cc3c0046365d4c',
    '111',
  ),
  [FANTOM_CHAIN_ID]: new Network(
    FANTOM_CHAIN_ID,
    'https://nd-761-590-257.p2pify.com/83919eaf32983485e28f2c166b329f20',
    '0x7Fc5e13Ca7a95bCa4a903C46Dc95160ae26feaa1',
    '0x8EdB69919835e98b5a4f751FAdB78d66C880475C',
    '0x128a85A855F40551A8FD1af9751959db212C84B0',
    '0xf3Cd02e2F31515Bfaa00b9d2C20173e25c4c4308',
    '0xE8E598A1041b6fDB13999D275a202847D9b654ca',
    '112',
  ),
};

const l0ChainIdMap = {};
Object.entries(networks).forEach(([chainId, network]) => {
  l0ChainIdMap[network.l0ChainId] = chainId;
});

const redis = new Redis();
const redisKey = (name: string) => `csm-backend-v2:${name}`;
const entryKey = (srcChainId: any, dstChainId: any, nonce: any) => redisKey(`out-${srcChainId}-${dstChainId}-${nonce}`);

const processIncomingTx = async (swapData: SwapEntry, network: Network, pk: string) => {
  if (swapData.processed) {
    console.error(`pdst ${swapData.nonce} already processed (${swapData.storageKey})`);
    return;
  }
  let oneInchRouter, oneInchData;
  if (swapData.hgsToken.toLowerCase() == swapData.dstToken.toLowerCase()) {
    oneInchRouter = constants.AddressZero;
    oneInchData = '0x00';
  } else {
    const r = await axios.get(`https://api.1inch.io/v4.0/${network.chainId}/swap`, {
      params: {
        fromTokenAddress: swapData.hgsToken,
        toTokenAddress: swapData.dstToken,
        amount: swapData.hgsAmount.toString(),
        fromAddress: network.l0AggregatorRouterAddress,
        slippage: '1',
        disableEstimate: true,
      },
    });
    oneInchRouter = r.data.tx.to;
    oneInchData = r.data.tx.data;
  }
  const wallet = new Wallet(pk, network.ethers);
  const params = {
    srcChainId: swapData.srcChainId,
    nonce: swapData.nonce,
    router1Inch: oneInchRouter,
    data: oneInchData,
  };
  console.log(params);
  const receipt2 = await network.l0AggregatorRouter.connect(wallet).continueSwap(params, { gasPrice: await network.ethers.getGasPrice() });
  console.log(`swap to ${swapData.nonce} executed`, receipt2.hash);
  swapData.processed = true;
  await redis.set(swapData.storageKey, JSON.stringify(swapData));
};

const l0LogHandler = (network: Network, pk: string) => {
  const ethers = network.ethers;

  return async (sender, srcAsset, dstAsset, dstChainId, fromAmount, toAmount, log: Log) => {
    const l0MessageReceivedTopic = '0xb31a279832335b41f70d77f2663ce317c7e04b0673d9d7f2982f8e3b451801fd';
    const l0SwapStartedTopic = '0x7b0a3fab2034d26e1d5ffb5ba60ca0c0121664bae47dcaf0b742413274615167';
    const receipt = await ethers.getTransactionReceipt(log.transactionHash);
    const l0MessageReceivedLog = receipt.logs.filter((l) => l.topics[0] === l0MessageReceivedTopic)[0];

    if (!l0MessageReceivedLog) {
      // outgoing tx
      const swapId = receipt.logs.filter((l) => l.topics[0] === l0SwapStartedTopic)[0]?.topics[1] || '0x0000000000000000000000000000000000000000000000000000000000000000';
      const eventData = await network.l0AggregatorRouter.pendingSwaps(swapId);
      if (eventData.nonce.eq(0)) {
        console.error(`psrc ${swapId} discarded`);
        return;
      }
      const nonce = eventData.nonce.sub(3).toString();
      const storageKey = entryKey(network.l0ChainId, eventData.dstChainId.toString(), nonce);
      const entry: SwapEntry = {
        id: eventData.id.toString(),
        nonce,
        txid: log.transactionHash,
        lwsToken: eventData.lwsToken,
        hgsAmount: eventData.hgsAmount.toString(),
        hgsToken: eventData.hgsToken,
        dstToken: eventData.dstToken,
        dstChainId: eventData.dstChainId.toString(),
        receiver: eventData.receiver,
        processed: false,
        minHgsAmount: eventData.minHgsAmount.toString(),
        signature: eventData.signature,
        storageKey,
        srcChainId: network.l0ChainId,
      };
      if (await redis.get(storageKey)) {
        console.error(`${storageKey} already exists`);
      } else {
        await redis.set(storageKey, JSON.stringify(entry));
        console.error(`swap from ${eventData.nonce.toString()}`, storageKey, entry);
      }
      await redis.sadd(redisKey(`pending-out-${dstChainId}`), entryKey(network.l0ChainId, dstChainId, nonce));
    } else {
      // incoming tx
      const l0MessageReceivedTypes = ['address', 'uint16', 'address', 'address', 'uint256', 'uint256', 'uint256'];
      const eventData = utils.defaultAbiCoder.decode(l0MessageReceivedTypes, l0MessageReceivedLog.data);
      const nonce = eventData[4].toString();
      const srcChainId = eventData[1].toString();
      const storageKey = entryKey(srcChainId, network.l0ChainId, nonce);
      const entry = await redis.get(redisKey(storageKey));
      await redis.set(redisKey(`eventData-${storageKey}`), JSON.stringify(eventData));
      if (!entry) {
        await redis.sadd(redisKey(`pending-in-${network.l0ChainId}`), storageKey);
        console.error(`${storageKey} not found, queued`);
        return;
      }
      const swapData: SwapEntry = JSON.parse(entry);
      await processIncomingTx(swapData, network, pk);
    }
  };
};

export const l0Worker = async (chainId: ChainID, pk: string) => {
  const network = networks[chainId];

  if (!network) {
    throw Error('unknown network');
  }

  const blockHandler = async () => {
    let currentBlock = (await network.ethers.getBlockNumber()) - 1;
    let lastBlock = parseInt(await redis.get(redisKey(`lastBlock-${network.chainId}`)));

    if (!lastBlock) {
      lastBlock = currentBlock;
      await redis.set(redisKey(`lastBlock-${network.chainId}`), (currentBlock + 1).toString());
    }
    let allProcessed = true;
    if (currentBlock - lastBlock > 1000) {
      currentBlock = lastBlock + 1000;
      allProcessed = false;
    }

    if (currentBlock > lastBlock) {
      console.error(`processing blocks ${lastBlock}~${currentBlock}`);
      const flt = network.l0CrossChainPool.filters.CrossChainSwap();
      flt.fromBlock = lastBlock;
      flt.toBlock = currentBlock;
      const logs = await network.ethers.getLogs(flt);
      await Promise.all(
        logs.map((l) => {
          console.error(`found event in block ${l.blockNumber} tx ${l.transactionHash}`);
          const lp = network.l0CrossChainPool.interface.parseLog(l);
          const { sender, srcAsset, dstAsset, chainId, fromAmount, toAmount } = lp.args;
          return l0LogHandler(network, pk)(sender, srcAsset, dstAsset, chainId, fromAmount, toAmount, l);
        }),
      );
      await l0UpdateLastBlock(network.chainId, currentBlock + 1);

      await Promise.all(
        (
          await redis.sinter(redisKey(`pending-in-${network.l0ChainId}`), redisKey(`pending-out-${network.l0ChainId}`))
        ).map(async (storageKey) => {
          const entry = await redis.get(storageKey);
          const swapData: SwapEntry = JSON.parse(entry);
          await processIncomingTx(swapData, network, pk);
          await redis.srem(redisKey(`pending-in-${network.l0ChainId}`), storageKey);
          await redis.srem(redisKey(`pending-out-${network.l0ChainId}`), storageKey);
        }),
      );
    }
    return allProcessed;
  };

  while (true) {
    if (await blockHandler()) {
      await new Promise((accept) => {
        setTimeout(() => {
          accept(undefined);
        }, 1000);
      });
    }
  }
};

export const l0UpdateLastBlock = async (chainId: ChainID, blockNumber: number | 'latest', log = false) => {
  if (blockNumber === 'latest') {
    blockNumber = await networks[chainId].ethers.getBlockNumber();
  }
  await redis.set(redisKey(`lastBlock-${chainId}`), blockNumber.toString());
  log && console.log('updated');
};

export const l0ProcessHistory = async (chainId: ChainID, fromBlock: number, pk: string) => {
  const network = networks[chainId];

  if (!network) {
    throw Error('unknown network');
  }

  const flt = network.l0CrossChainPool.filters.CrossChainSwap();
  flt.fromBlock = fromBlock;
  const logs = await network.ethers.getLogs(flt);
  await Promise.all(
    logs.map((l) => {
      const lp = network.l0CrossChainPool.interface.parseLog(l);
      const { sender, srcAsset, dstAsset, chainId, fromAmount, toAmount } = lp.args;
      return l0LogHandler(network, pk)(sender, srcAsset, dstAsset, chainId, fromAmount, toAmount, l);
    }),
  );
};
