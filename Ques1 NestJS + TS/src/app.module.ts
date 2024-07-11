import { Module } from '@nestjs/common';
import { CacheModule } from './cache/cache.module';
import { TopNProductsModule } from './top-n-products/top-n-products.module';

@Module({
  imports: [CacheModule, TopNProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
