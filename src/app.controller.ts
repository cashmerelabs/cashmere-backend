import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { IsEthereumAddress, IsIn, IsNumberString } from 'class-validator';
import axios from 'axios';
import { constants, ethers } from 'ethers';
import { ChainID, CHAIN_IDS, networks } from './app.worker';
import Big from 'big.js';

const ONE_INCH_SLIPPAGE = 10;

class GetSwapParamsQueryDto {
  @IsIn(CHAIN_IDS)
  fromChain: ChainID;

  @IsEthereumAddress()
  fromToken: string;

  @IsNumberString()
  fromAmount: string;

  @IsIn(CHAIN_IDS)
  toChain: ChainID;

  @IsEthereumAddress()
  toToken: string;
}

interface SwapParamsResponse {
  args: {
    srcToken: string;
    lwsToken: string;
    hgsToken: string;
    dstToken: string;
    hgsAssetId: string;
    oneInchData: string;
    oneInchAddress: string;
    srcChainId: string;
    dstChainId: string;
    srcAmount: string;
    hgsEstimate: string;
  };
  to: string;
  value: string;
}

interface SwapEstimateResponse {
  // lwsAmount: string;
  // hgsAmount: string;
  dstAmount: string;
  minReceivedDst: string;
}

const usdtBroken = true;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  async getParams({ fromChain, fromToken, toChain, toToken }) {
    const fromNetwork = networks[fromChain];
    const toNetwork = networks[toChain];
    const pool = fromNetwork.intraChainPool;
    const poolCC = fromNetwork.l0CrossChainPool;
    const routerCC = fromNetwork.l0CrossChainRouter;
    const swapRouter = fromNetwork.l0AggregatorRouter;
    let { lowestAsset: lwsAssetAddress, highestAsset: hgsAssetAddress } = await pool.getHighestAndLowestCompRatioAssets();
    if (lwsAssetAddress === hgsAssetAddress) {
      lwsAssetAddress = (await routerCC['getAssetData(uint16,uint256)'](fromNetwork.l0ChainId, 1)).nativeAssetAddress;
      hgsAssetAddress = (await routerCC['getAssetData(uint16,uint256)'](fromNetwork.l0ChainId, 2)).nativeAssetAddress;
    }
    let lwsAsset;
    if (!usdtBroken) {
      lwsAsset = fromNetwork.assetContract(lwsAssetAddress);
    } else {
      lwsAsset = fromNetwork.assetContract((await routerCC['getAssetData(uint16,uint256)'](fromNetwork.l0ChainId, 1)).nativeAssetAddress);
    }
    const lwsTokenAddress = await lwsAsset.underlyingToken();
    let hgsAssetId;
    if (!usdtBroken) {
      hgsAssetId = (await routerCC['getAssetData(uint16,address)'](fromNetwork.l0ChainId, hgsAssetAddress)).assetId;
    } else {
      hgsAssetId = 1;
    }
    const assetData = await routerCC['getAssetData(uint16,uint256)'](toNetwork.l0ChainId, hgsAssetId);
    const hgsTokenAddressDest = assetData.nativeTokenAddress;
    const hgsAssetAddressDest = assetData.nativeAssetAddress;

    return {
      fromNetwork,
      toNetwork,
      swapRouter,
      lwsTokenAddress,
      hgsTokenAddressDest,
      hgsAssetAddressDest,
      hgsAssetId,
      poolCC,
      lwsAsset,
      routerCC,
      needSrc1InchSwap: fromToken.toLowerCase() !== lwsTokenAddress.toLowerCase(),
      needDst1InchSwap: hgsTokenAddressDest.toLowerCase() !== toToken.toLowerCase(),
    };
  }

  @Get('swapParamsL0')
  async getSwapParamsL0(
    @Query()
    { fromChain, fromToken, fromAmount, toChain, toToken }: GetSwapParamsQueryDto,
  ): Promise<SwapParamsResponse> {
    try {
      console.error(
        'getParams',
        JSON.stringify({
          fromChain,
          fromToken,
          fromAmount,
          toChain,
          toToken,
        }),
      );
      const { fromNetwork, toNetwork, lwsTokenAddress, swapRouter, hgsTokenAddressDest, hgsAssetAddressDest, hgsAssetId, poolCC, lwsAsset, routerCC, needSrc1InchSwap } =
        await this.getParams({
          fromChain,
          fromToken,
          toChain,
          toToken,
        });
      let oneInchData, oneInchRouter, toTokenAmount;
      if (needSrc1InchSwap) {
        oneInchData = '0x00';
        oneInchRouter = constants.AddressZero;
        toTokenAmount = fromAmount;
      } else {
        const r = await axios.get(`https://api.1inch.io/v4.0/${fromChain}/swap`, {
          params: {
            fromTokenAddress: fromToken,
            toTokenAddress: lwsTokenAddress,
            amount: fromAmount,
            fromAddress: swapRouter.address,
            slippage: ONE_INCH_SLIPPAGE.toString(),
            disableEstimate: true,
          },
        });
        oneInchData = r.data.tx.data;
        oneInchRouter = r.data.tx.to;
        toTokenAmount = r.data.toTokenAmount;
        console.log(r.data.tx);
      }
      console.log([lwsTokenAddress, hgsTokenAddressDest, toTokenAmount, hgsAssetId, toNetwork.l0ChainId]);
      const { potentialOutcome, haircut } = await poolCC.quotePotentialSwap(lwsTokenAddress, hgsTokenAddressDest, toTokenAmount, hgsAssetId, toNetwork.l0ChainId);
      const estimatePayload = ethers.utils.defaultAbiCoder.encode(
        ['address', 'uint16', 'uint16', 'address', 'address', 'uint256', 'uint256', 'bytes'],
        [
          swapRouter.address,
          fromNetwork.l0ChainId,
          toNetwork.l0ChainId,
          lwsAsset.address,
          hgsAssetAddressDest,
          potentialOutcome,
          haircut,
          '0x' + '00'.repeat(32 + 32 + 32 + 32 + 32 + 32 + (32 * 2 + 96)), // uint256, address, address, address, uint256, address, (signature)
        ],
      );
      const value = await routerCC.estimateFee(toNetwork.l0ChainId, estimatePayload);
      return {
        args: {
          srcToken: fromToken,
          lwsToken: lwsTokenAddress,
          hgsToken: hgsTokenAddressDest,
          dstToken: toToken,
          hgsAssetId: hgsAssetId,
          oneInchData: oneInchData,
          oneInchAddress: oneInchRouter,
          srcChainId: fromNetwork.l0ChainId,
          dstChainId: toNetwork.l0ChainId,
          srcAmount: fromAmount,
          hgsEstimate: potentialOutcome.toString(),
        },
        to: swapRouter.address,
        value,
      } as SwapParamsResponse;
      // return {
      //   data: swapData,
      //   to: swapRouter.address,
      //   value,
      // };
    } catch (e) {
      console.error(e);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          cause: e,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('swapEstimateL0')
  async swapEstimateL0(
    @Query()
    { fromChain, fromToken, fromAmount, toChain, toToken }: GetSwapParamsQueryDto,
  ): Promise<SwapEstimateResponse> {
    let lwsAmount, dstAmount, minReceivedLws, minReceivedDst;
    const { lwsTokenAddress, needSrc1InchSwap, needDst1InchSwap, poolCC, hgsTokenAddressDest, hgsAssetId, toNetwork } = await this.getParams({
      fromChain,
      fromToken,
      toChain,
      toToken,
    });
    if (needSrc1InchSwap) {
      const r = await axios.get(`https://api.1inch.io/v4.0/${fromChain}/quote`, {
        params: {
          fromTokenAddress: fromToken,
          toTokenAddress: lwsTokenAddress,
          amount: fromAmount,
        },
      });
      lwsAmount = r.data.toTokenAmount;
      minReceivedLws = new Big(lwsAmount)
        .mul(100 - ONE_INCH_SLIPPAGE)
        .div(100)
        .toFixed(0);
    } else {
      minReceivedLws = lwsAmount = fromAmount;
    }
    const [{ potentialOutcome }, { potentialOutcome: minPotentialOutcome }] = await Promise.all([
      poolCC.quotePotentialSwap(lwsTokenAddress, hgsTokenAddressDest, lwsAmount, hgsAssetId, toNetwork.l0ChainId),
      poolCC.quotePotentialSwap(lwsTokenAddress, hgsTokenAddressDest, minReceivedLws, hgsAssetId, toNetwork.l0ChainId),
    ]);
    const hgsAmount = potentialOutcome.toString();
    const minReceivedHgs = minPotentialOutcome.toString();
    if (needDst1InchSwap) {
      await Promise.all([
        (async () => {
          const r = await axios.get(`https://api.1inch.io/v4.0/${toChain}/quote`, {
            params: {
              fromTokenAddress: hgsTokenAddressDest,
              toTokenAddress: toToken,
              amount: hgsAmount,
            },
          });
          console.log(r.data);
          dstAmount = r.data.toTokenAmount;
        })(),
        (async () => {
          const r = await axios.get(`https://api.1inch.io/v4.0/${toChain}/quote`, {
            params: {
              fromTokenAddress: hgsTokenAddressDest,
              toTokenAddress: toToken,
              amount: minReceivedHgs,
            },
          });
          minReceivedDst = new Big(r.data.toTokenAmount)
            .mul(100 - ONE_INCH_SLIPPAGE)
            .div(100)
            .toFixed(0);
        })(),
      ]);
    } else {
      dstAmount = hgsAmount;
      minReceivedDst = minReceivedHgs;
    }

    // const [ rateSrc, rateDst ] = await Promise.all([
    //   networks[fromChain].l0Oracle.getRateToEth()
    // ]);

    console.log({
      needSrc1InchSwap,
      needDst1InchSwap,
      lwsAmount,
      minReceivedLws,
      hgsAmount,
      minReceivedHgs,
      dstAmount,
      minReceivedDst,
    });

    const oracle = await networks[fromChain].l0Oracle;
    // await oracle.getRateToEth()

    return {
      // lwsAmount,
      // hgsAmount,
      dstAmount,
      minReceivedDst,
      // priceImpact: new Big(dstAmount).div(await )
    };
  }
}
