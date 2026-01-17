import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const totalProducts = await this.prisma.product.count();
    const totalQuantity = await this.prisma.product.aggregate({
      _sum: { quantity: true },
    });

    return {
      totalProducts,
      totalQuantity: totalQuantity._sum.quantity || 0,
    };
  }
}
