import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AppService, ChainID } from './app.service';
import { IsEthereumAddress, IsIn, IsNumberString } from 'class-validator';
import axios from 'axios';
import { constants, ethers } from 'ethers';
import { CHAIN_IDS, networks } from './app.worker';

class GetSwapParamsQueryDto {
  @IsIn(CHAIN_IDS)
  fromChain: ChainID;

  @IsEthereumAddress()
  fromToken: string;

  @IsNumberString()
  fromAmount: number;

  @IsIn(CHAIN_IDS)
  toChain: ChainID;

  @IsEthereumAddress()
  toToken: string;
}

class GetSwapEstimateQueryDto {
  @IsIn(CHAIN_IDS)
  fromChain: ChainID;

  @IsEthereumAddress()
  fromToken: string;

  @IsNumberString()
  fromAmount: number;

  @IsIn(CHAIN_IDS)
  toChain: ChainID;

  @IsEthereumAddress()
  toToken: string;
}

const usdtBroken = true;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('swapParamsL0')
  async getSwapParamsL0(
    @Query()
    {
      fromChain,
      fromToken,
      fromAmount,
      toChain,
      toToken,
    }: GetSwapParamsQueryDto,
  ): Promise<object> {
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
      const fromNetwork = networks[fromChain];
      const toNetwork = networks[toChain];
      const pool = fromNetwork.intraChainPool;
      const poolCC = fromNetwork.l0CrossChainPool;
      const routerCC = fromNetwork.l0CrossChainRouter;
      const swapRouter = fromNetwork.l0AggregatorRouter;
      let { lowestAsset: lwsAssetAddress, highestAsset: hgsAssetAddress } =
        await pool.getHighestAndLowestCompRatioAssets();
      if (lwsAssetAddress === hgsAssetAddress) {
        lwsAssetAddress = (
          await routerCC['getAssetData(uint16,uint256)'](
            fromNetwork.l0ChainId,
            1,
          )
        ).nativeAssetAddress;
        hgsAssetAddress = (
          await routerCC['getAssetData(uint16,uint256)'](
            fromNetwork.l0ChainId,
            2,
          )
        ).nativeAssetAddress;
      }
      let lwsAsset;
      if (!usdtBroken) {
        lwsAsset = fromNetwork.assetContract(lwsAssetAddress);
      } else {
        lwsAsset = fromNetwork.assetContract(
          (
            await routerCC['getAssetData(uint16,uint256)'](
              fromNetwork.l0ChainId,
              1,
            )
          ).nativeAssetAddress,
        );
      }
      const lwsTokenAddress = await lwsAsset.underlyingToken();
      let hgsAssetId;
      if (!usdtBroken) {
        hgsAssetId = (
          await routerCC['getAssetData(uint16,address)'](
            fromNetwork.l0ChainId,
            hgsAssetAddress,
          )
        ).assetId;
      } else {
        hgsAssetId = 1;
      }
      const assetData = await routerCC['getAssetData(uint16,uint256)'](
        toNetwork.l0ChainId,
        hgsAssetId,
      );
      const hgsTokenAddressDest = assetData.nativeTokenAddress;
      const hgsAssetAddressDest = assetData.nativeAssetAddress;
      let oneInchData, oneInchRouter, toTokenAmount;
      if (fromToken.toLowerCase() == lwsTokenAddress.toLowerCase()) {
        oneInchData = '0x00';
        oneInchRouter = constants.AddressZero;
        toTokenAmount = fromAmount;
      } else {
        const r = await axios.get(
          `https://api.1inch.io/v4.0/${fromChain}/swap`,
          {
            params: {
              fromTokenAddress: fromToken,
              toTokenAddress: lwsTokenAddress,
              amount: fromAmount,
              fromAddress: swapRouter.address,
              slippage: '1',
              disableEstimate: true,
            },
          },
        );
        oneInchData = r.data.tx.data;
        oneInchRouter = r.data.tx.to;
        toTokenAmount = r.data.toTokenAmount;
        console.log(r.data.tx);
      }
      console.log([
        lwsTokenAddress,
        hgsTokenAddressDest,
        toTokenAmount,
        hgsAssetId,
        toNetwork.l0ChainId,
      ]);
      const { potentialOutcome, haircut } = await poolCC.quotePotentialSwap(
        lwsTokenAddress,
        hgsTokenAddressDest,
        toTokenAmount,
        hgsAssetId,
        toNetwork.l0ChainId,
      );
      const estimatePayload = ethers.utils.defaultAbiCoder.encode(
        [
          'address',
          'uint16',
          'uint16',
          'address',
          'address',
          'uint256',
          'uint256',
          'bytes',
        ],
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
      const value = await routerCC.estimateFee(
        toNetwork.l0ChainId,
        estimatePayload,
      );
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
      };
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

  // @Get('swapEstimateL0')
  // async swapEstimateL0(
  //   @Query()
  //   {
  //     fromChain,
  //     fromToken,
  //     fromAmount,
  //     toChain,
  //     toToken,
  //   }: GetSwapEstimateQueryDto,
  // ) {
  //
  // }
}
