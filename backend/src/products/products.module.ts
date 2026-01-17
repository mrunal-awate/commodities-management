import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule], // 👈 REQUIRED
  providers: [ProductsService, ProductsResolver],
})
export class ProductsModule {}
