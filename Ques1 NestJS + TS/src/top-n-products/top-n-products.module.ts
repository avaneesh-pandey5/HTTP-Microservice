/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TopNProductsService } from './top-n-products.service';
import { TopNProductsController } from './top-n-products.controller';
import { CacheService } from '../cache/cache.service';

@Module({
  imports: [],
  providers: [TopNProductsService, CacheService],
  controllers: [TopNProductsController],
})
export class TopNProductsModule {}
