/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller()
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.cacheService.getToken();
  }
}
