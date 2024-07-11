/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class TopNProductsService {
  private readonly companies = ['AMZ', 'FLP', 'MYN', 'SNP', 'AZO'];
  private readonly apiUrl = 'http://20.244.56.144/test/companies';

  constructor(private readonly cacheService: CacheService) {}

  async fetchTopProducts(
    category: string,
    top: number,
    minPrice: number,
    maxPrice: number,
  ): Promise<any[]> {
    const allProducts = await this.fetchProductsFromAllCompanies(
      category,
      top,
      minPrice,
      maxPrice,
    );
    const sortedProducts = this.sortAndFilterProducts(
      allProducts,
      category,
      top,
    );
    return sortedProducts;
  }

  private async fetchProductsFromAllCompanies(
    category: string,
    top: number,
    minPrice: number,
    maxPrice: number,
  ): Promise<any[]> {
    const responses = [];
    for (let i = 0; i < this.companies.length; i++) {
      let response;
      try {
        response = await axios.get(
          `${this.apiUrl}/${this.companies[i]}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
          {
            headers: {
              Authorization: `Bearer ${await this.cacheService.getToken()}`,
            },
          },
        );
      } catch (err) {
        console.log(err);
      }
      console.log(response);
      responses.push(
        ...response.data.map((ele) => {
          return { ...ele, company: this.companies[i], category };
        }),
      );
    }
    return responses;
  }

  private sortAndFilterProducts(
    products: any[],
    category: string,
    top: number,
  ): any[] {
    return products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, top)
      .map((product) => {
        const _prod = {
          ...product,
          productId: `${product.productName}${product.price}${product.discount}${product.rating}`,
        };
        this.cacheService.set(`product_${category}_${_prod.productId}`, _prod);
        return _prod;
      });
  }
  getProductById(productId: string, category: string): any {
    return this.cacheService.get(`product_${category}_${productId}`);
  }
}
