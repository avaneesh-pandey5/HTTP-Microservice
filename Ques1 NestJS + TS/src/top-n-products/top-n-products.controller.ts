/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { TopNProductsService } from './top-n-products.service';

@Controller('categories/:category/products')
export class TopNProductsController {
  constructor(private readonly topNProductsService: TopNProductsService) {}

  @Get()
  async getTopProducts(
    @Param('category') category: string,
    @Query('top') top: number,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
  ): Promise<any[]> {
    return this.topNProductsService.fetchTopProducts(
      category,
      +top,
      +minPrice,
      +maxPrice,
    );
  }

  @Get(':productId')
  async getProductById(
    @Param('category') category: string,
    @Param('productId') productId: string,
  ): Promise<any> {
    return this.topNProductsService.getProductById(productId, category);
  }
}
