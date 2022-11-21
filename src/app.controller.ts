import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AppService, ChainID } from './app.service';
import { IsEthereumAddress, IsIn, IsNumberString } from 'class-validator';
import axios from 'axios';
import { ethers } from 'ethers';
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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get('swapParams')
  // async getSwapParams(
  //   @Query()
  //   {
  //     fromChain,
  //     fromToken,
  //     fromAmount,
  //     toChain,
  //     toToken,
  //   }: GetSwapParamsQueryDto,
  // ): Promise<object> {
  //   const pool = await this.appService.getPoolContract(fromChain);
  //   const poolCC = await this.appService.getCrossChainPoolContract(fromChain);
  //   const routerCC = await this.appService.getCrossChainRouter(fromChain);
  //   const swapRouter = await this.appService.getSwapRouter(fromChain);
  //   const { lowestAsset: lwsAssetAddress, highestAsset: hgsAssetAddress } =
  //     await pool.getHighestAndLowestCompRatioAssets();
  //   const lwsAsset = await this.appService.getAssetContract(
  //     fromChain,
  //     lwsAssetAddress,
  //   );
  //   const lwsTokenAddress = await lwsAsset.underlyingToken();
  //   const hgsAsset = await this.appService.getAssetContract(
  //     fromChain,
  //     hgsAssetAddress,
  //   );
  //   const hgsTokenAddress = await hgsAsset.underlyingToken();
  //   const hgsAssetId = (
  //     await routerCC['getAssetData(uint256,address)'](
  //       fromChain,
  //       hgsAssetAddress,
  //     )
  //   ).assetId;
  //   let hgsTokenAddressDest = (
  //     await routerCC['getAssetData(uint256,uint256)'](toChain, hgsAssetId)
  //   ).nativeTokenAddress;
  //   if (hgsTokenAddressDest === '0x54Ee6EC91B990284B811d1eb20e3637ba30f1efb') {
  //     hgsTokenAddressDest = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';
  //   }
  //   const { data } = await axios.get(
  //     `https://api.1inch.io/v4.0/${fromChain}/swap`,
  //     {
  //       params: {
  //         fromTokenAddress: fromToken,
  //         toTokenAddress: lwsTokenAddress,
  //         amount: fromAmount,
  //         fromAddress: swapRouter.address,
  //         slippage: '1',
  //         disableEstimate: true,
  //       },
  //     },
  //   );
  //   console.log(data.tx);
  //   // pool.swapCrossChain(fromToken, fromAmount, minimumToAmount, dstAssetId, dstChain, deadline, executionFee);
  //   const swapData = swapRouter.interface.encodeFunctionData(
  //     swapRouter.interface.functions[
  //       'startSwap((address,uint256,address,address,bytes,address,uint256,address,uint256))'
  //     ],
  //     [
  //       [
  //         fromToken,
  //         fromAmount,
  //         lwsTokenAddress,
  //         data.tx.to,
  //         data.tx.data,
  //         hgsTokenAddressDest,
  //         hgsAssetId,
  //         toToken,
  //         toChain,
  //       ],
  //     ],
  //   );
  //   const value = (await swapRouter.estimateFee()).toString();
  //   return {
  //     data: swapData,
  //     to: swapRouter.address,
  //     value,
  //   };
  //   // return { fromChain, fromToken, fromAmount, toChain, toToken };
  // }

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
      console.log({
        fromChain,
        fromToken,
        fromAmount,
        toChain,
        toToken,
      });
      const fromNetwork = networks[fromChain];
      const toNetwork = networks[toChain];
      const pool = fromNetwork.intraChainPool;
      const poolCC = fromNetwork.l0CrossChainPool;
      const routerCC = fromNetwork.l0CrossChainRouter;
      const swapRouter = fromNetwork.l0AggregatorRouter;
      const { lowestAsset: lwsAssetAddress, highestAsset: hgsAssetAddress } =
        await pool.getHighestAndLowestCompRatioAssets();
      const lwsAsset = fromNetwork.assetContract(lwsAssetAddress);
      const lwsTokenAddress = await lwsAsset.underlyingToken();
      const hgsAsset = fromNetwork.assetContract(hgsAssetAddress);
      const hgsTokenAddress = await hgsAsset.underlyingToken();
      const hgsAssetId = (
        await routerCC['getAssetData(uint16,address)'](
          fromNetwork.l0ChainId,
          hgsAssetAddress,
        )
      ).assetId;
      const assetData = await routerCC['getAssetData(uint16,uint256)'](
        toNetwork.l0ChainId,
        hgsAssetId,
      );
      const hgsTokenAddressDest = assetData.nativeTokenAddress;
      const hgsAssetAddressDest = assetData.nativeAssetAddress;
      const { data } = await axios.get(
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
      console.log(data.tx);
      const swapData = swapRouter.interface.encodeFunctionData(
        swapRouter.interface.functions[
          'startSwap((address,uint256,address,address,bytes,address,uint256,address,uint16))'
        ],
        [
          [
            fromToken,
            fromAmount,
            lwsTokenAddress,
            data.tx.to,
            data.tx.data,
            hgsTokenAddressDest,
            hgsAssetId,
            toToken,
            toNetwork.l0ChainId,
          ],
        ],
      );
      const { potentialOutcome, haircut } = await poolCC.quotePotentialSwap(
        lwsTokenAddress,
        hgsTokenAddressDest,
        data.toTokenAmount,
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
        ],
        [
          swapRouter.address,
          fromNetwork.l0ChainId,
          toNetwork.l0ChainId,
          lwsAsset.address,
          hgsAssetAddressDest,
          potentialOutcome,
          haircut,
        ],
      );
      const value = await routerCC.estimateFee(
        toNetwork.l0ChainId,
        estimatePayload,
      );
      return {
        data: swapData,
        to: swapRouter.address,
        value,
      };
    } catch (e) {
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
}
