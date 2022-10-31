import Redis from 'ioredis';
import { ethers, providers, utils, Wallet } from 'ethers';
import * as PoolCrossChainL0ABI from '../abi/PoolCrossChainL0.abi.json';
import { ContractContext as PoolCrossChainL0Context } from '../abi/PoolCrossChainL0';
import * as CSMRouterL0ABI from '../abi/CSMCrossChainRouterL0.abi.json';
import { ContractContext as CSMRouterL0Context } from '../abi/CSMCrossChainRouterL0';
import * as PoolABI from '../abi/Pool.abi.json';
import { ContractContext as PoolContext } from '../abi/Pool';
import * as CashmereRouter2L0ABI from '../abi/CashmereRouter2L0.abi.json';
import { ContractContext as CashmereRouter2L0Context } from '../abi/CashmereRouter2L0';
import { Log } from 'ethereum-abi-types-generator';
import axios from 'axios';
import * as AssetABI from '../abi/Asset.abi.json';
import { ContractContext as AssetContext } from '../abi/Asset';

const ETHEREUM_CHAIN_ID = '1';
const POLYGON_CHAIN_ID = '137';
const ARBITRUM_CHAIN_ID = '42161';
const AVALANCHE_CHAIN_ID = '43114';
const BSC_CHAIN_ID = '56';
const OPTIMISM_CHAIN_ID = '10';
const FANTOM_CHAIN_ID = '250';
type ChainID =
  | typeof ETHEREUM_CHAIN_ID
  | typeof POLYGON_CHAIN_ID
  | typeof ARBITRUM_CHAIN_ID
  | typeof AVALANCHE_CHAIN_ID
  | typeof BSC_CHAIN_ID
  | typeof OPTIMISM_CHAIN_ID
  | typeof FANTOM_CHAIN_ID;

interface SwapEntry {
  nonce: string;
  txid: string;
  hgsAmount: string;
  hgsToken: string;
  dstToken: string;
  dstChainId: string;
  receiver: string;
  processed: boolean;
}

class Network {
  ethers: providers.JsonRpcProvider;
  l0CrossChainPool: PoolCrossChainL0Context;
  l0CrossChainRouter: CSMRouterL0Context;
  intraChainPool: PoolContext;
  l0AggregatorRouter: CashmereRouter2L0Context;

  constructor(
    public readonly chainId: ChainID,
    private readonly rpcUrl: string,
    public readonly l0CrossChainPoolAddress: string,
    public readonly l0CrossChainRouterAddress: string,
    public readonly intraChainPoolAddress: string,
    public readonly l0AggregatorRouterAddress: string,
    public readonly l0ChainId: string,
  ) {
    this.ethers = new providers.JsonRpcProvider(rpcUrl);

    this.l0CrossChainPool = new ethers.Contract(
      this.l0CrossChainPoolAddress,
      PoolCrossChainL0ABI,
      this.ethers,
    ) as unknown as PoolCrossChainL0Context;

    this.l0CrossChainRouter = new ethers.Contract(
      this.l0CrossChainRouterAddress,
      CSMRouterL0ABI,
      this.ethers,
    ) as unknown as CSMRouterL0Context;

    this.intraChainPool = new ethers.Contract(
      this.intraChainPoolAddress,
      PoolABI,
      this.ethers,
    ) as unknown as PoolContext;

    this.l0AggregatorRouter = new ethers.Contract(
      this.l0AggregatorRouterAddress,
      CashmereRouter2L0ABI,
      this.ethers,
    ) as unknown as CashmereRouter2L0Context;
  }

  assetContract(address: string) {
    return new ethers.Contract(
      address,
      AssetABI,
      this.ethers,
    ) as unknown as AssetContext;
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
    '101',
  ),
  [POLYGON_CHAIN_ID]: new Network(
    POLYGON_CHAIN_ID,
    'https://polygon-rpc.com',
    '0x0EC0492846C2B436Ef6937922621621AE4876FF9',
    '0x9657ff118FBC316B3484b006f4D46F53dADd2402',
    '0x9d3EE96e1Ac53a542cCE8642c69D7e11abbA059a',
    '0xF8e8fcC6eCC323fae58E18CFf9065dac65AAeC93',
    '109',
  ),
  [ARBITRUM_CHAIN_ID]: new Network(
    ARBITRUM_CHAIN_ID,
    'https://arb1.arbitrum.io/rpc',
    '0xf85252CB3D4f8cC3E05A8E4042b9EC9D2eC82653',
    '0x2bBfDbb623c173Be20cAb6CF4B855CFA5b0786a6',
    '0x83A64f931187bBF560F27Bf7204862b00D8e2CcB',
    '0xF8e8fcC6eCC323fae58E18CFf9065dac65AAeC93',
    '110',
  ),
  [AVALANCHE_CHAIN_ID]: new Network(
    AVALANCHE_CHAIN_ID,
    'https://api.avax.network/ext/bc/C/rpc',
    '0xB28F8C2eD463bbf032fF0267f3A6924D2c2bb761',
    '0x2ad78787CCaf7FA8FAe8953FD78ab9163f81DcC8',
    '0x557278364B136a8D7686016b1930c8C7136d8af9',
    '0xF8e8fcC6eCC323fae58E18CFf9065dac65AAeC93',
    '106',
  ),
  [BSC_CHAIN_ID]: new Network(
    BSC_CHAIN_ID,
    'https://bsc-dataseed.binance.org/',
    '0x56417c509CFEe5Ef376C6011eF5E341931682ed9',
    '0xB7DeD831Bc7Ae3f199Ea82A12E20f72E0B6ae64A',
    '0x98e1329eEa0CeB086278be4164793B9e3dadb732',
    '0xF8e8fcC6eCC323fae58E18CFf9065dac65AAeC93',
    '102',
  ),
  [OPTIMISM_CHAIN_ID]: new Network(
    OPTIMISM_CHAIN_ID,
    'https://opt-mainnet.g.alchemy.com/v2/x6bH_tMmUpkTR5kaOQrWg8uITMZyhYeH',
    '0x8b7Af56E9aBa6d8b96409A6285BFf1Dde86792C9',
    '0x557278364B136a8D7686016b1930c8C7136d8af9',
    '0x8EdB69919835e98b5a4f751FAdB78d66C880475C',
    '0xF8e8fcC6eCC323fae58E18CFf9065dac65AAeC93',
    '111',
  ),
  [FANTOM_CHAIN_ID]: new Network(
    FANTOM_CHAIN_ID,
    'https://rpc.ankr.com/fantom/',
    '0x58DDb2cec22ef964ee3CB1C27C6D9Db982EE0159',
    '0x4524051687b6ff963Bd4316a6B7215F39f029196',
    '0x3Cd49a6046e675A6d4274CC773370C00a30bbf88',
    '0xF8e8fcC6eCC323fae58E18CFf9065dac65AAeC93',
    '112',
  ),
};

const redis = new Redis();
const redisKey = (name: string) => `csm-backend-v1:${name}`;

const l0LogHandler = (network: Network) => {
  const ethers = network.ethers;
  const chainId = network.chainId;

  return async (
    sender,
    srcAsset,
    dstAsset,
    dstChainId,
    fromAmount,
    toAmount,
    log: Log,
  ) => {
    const l0MessageReceivedTopic =
      '0xeee37fced513bbf4fe6a13f3c18b58755a148b11de4c5849a17b4971885b58aa';
    const l0SwapStartedTopic =
      '0x544869691f949907012809dab1a67d8e252528feea79760ae9305d9531d5b02c';
    const receipt = await ethers.getTransactionReceipt(log.transactionHash);
    const l0MessageReceivedLog = receipt.logs.filter(
      (l) => l.topics[0] === l0MessageReceivedTopic,
    )[0];

    if (!l0MessageReceivedLog) {
      // outgoing tx
      const nonce = parseInt(
        receipt.logs.filter((l) => l.topics[0] === l0SwapStartedTopic)[0]
          ?.topics[1] || '0xfffffffffff',
        16,
      );
      const eventData = await network.l0AggregatorRouter.pendingSwaps(nonce);
      if (eventData.id.eq(0)) {
        console.log(`psrc ${nonce} discarded`);
        return;
      }
      const entry: SwapEntry = {
        nonce: eventData.id.toString(),
        txid: log.transactionHash,
        hgsAmount: eventData.hgsAmount.toString(),
        hgsToken: eventData.hgsToken,
        dstToken: eventData.dstToken,
        dstChainId: eventData.dstChainId.toString(),
        receiver: eventData.receiver,
        processed: false,
      };
      await redis.set(
        redisKey(`out-${network.l0ChainId}-${nonce}`),
        JSON.stringify(entry),
      );
      console.log(`swap from ${nonce}`, entry);
    } else {
      // incoming tx
      const l0MessageReceivedTypes = [
        'address',
        'uint16',
        'address',
        'address',
        'uint256',
        'uint256',
        'uint256',
      ];
      const eventData = utils.defaultAbiCoder.decode(
        l0MessageReceivedTypes,
        l0MessageReceivedLog.data,
      );
      const nonce = eventData[4].toString();
      const srcChainId = eventData[1].toString();
      const entry = await redis.get(redisKey(`out-${srcChainId}-${nonce}`));
      if (!entry) {
        console.log(`pdst ${nonce} discarded`);
        return;
      }
      const swapData: SwapEntry = JSON.parse(entry);
      if (swapData.processed) {
        console.log(`pdst ${nonce} already processed`);
        return;
      }
      const { data } = await axios.get(
        `https://api.1inch.io/v4.0/${chainId}/swap`,
        {
          params: {
            fromTokenAddress: swapData.hgsToken,
            toTokenAddress: swapData.dstToken,
            amount: swapData.hgsAmount.toString(),
            fromAddress: network.l0AggregatorRouterAddress,
            slippage: '1',
            disableEstimate: true,
          },
        },
      );
      const wallet = new Wallet(
        'f508009a86f269a13b0ab32400500db64c61950ba59bd436eb0d8637a4aaf949',
        network.ethers,
      );
      const receipt2 = await network.l0AggregatorRouter
        .connect(wallet)
        .continueSwap(
          swapData.hgsToken,
          swapData.hgsAmount,
          swapData.dstToken,
          data.tx.to,
          data.tx.data,
          swapData.receiver,
          { gasPrice: await network.ethers.getGasPrice() },
        );
      console.log(`swap to ${nonce} executed`, receipt2.hash);
      swapData.processed = true;
      await redis.set(
        redisKey(`out-${srcChainId}-${nonce}`),
        JSON.stringify(swapData),
      );
    }
  };
};

export const l0Worker = async (chainId: ChainID) => {
  const network = networks[chainId];

  if (!network) {
    throw Error('unknown network');
  }

  const blockHandler = async () => {
    let currentBlock = (await network.ethers.getBlockNumber()) - 1;
    let lastBlock = parseInt(
      await redis.get(redisKey(`lastBlock-${network.chainId}`)),
    );

    if (!lastBlock) {
      lastBlock = currentBlock;
      await redis.set(
        redisKey(`lastBlock-${network.chainId}`),
        (currentBlock + 1).toString(),
      );
    }
    if (currentBlock - lastBlock > 500) currentBlock = lastBlock + 500;

    if (currentBlock > lastBlock) {
      console.log(`processing blocks ${lastBlock}~${currentBlock}`);
      const flt = network.l0CrossChainPool.filters.CrossChainSwap();
      flt.fromBlock = lastBlock;
      flt.toBlock = currentBlock;
      const logs = await network.ethers.getLogs(flt);
      await Promise.all(
        logs.map((l) => {
          console.log(
            `found event in block ${l.blockNumber} tx ${l.transactionHash}`,
          );
          const lp = network.l0CrossChainPool.interface.parseLog(l);
          const { sender, srcAsset, dstAsset, chainId, fromAmount, toAmount } =
            lp.args;
          return l0LogHandler(network)(
            sender,
            srcAsset,
            dstAsset,
            chainId,
            fromAmount,
            toAmount,
            l,
          );
        }),
      );
      await redis.set(
        redisKey(`lastBlock-${network.chainId}`),
        (currentBlock + 1).toString(),
      );
    }
  };

  while (true) {
    await blockHandler();
    await new Promise((accept) => {
      setTimeout(() => {
        accept(undefined);
      }, 1000);
    });
  }
};

export const l0ProcessHistory = async (chainId: ChainID, fromBlock: number) => {
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
      const { sender, srcAsset, dstAsset, chainId, fromAmount, toAmount } =
        lp.args;
      return l0LogHandler(network)(
        sender,
        srcAsset,
        dstAsset,
        chainId,
        fromAmount,
        toAmount,
        l,
      );
    }),
  );
};