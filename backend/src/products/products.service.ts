import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // View all products (Manager + Store Keeper)
  getAllProducts() {
    return this.prisma.product.findMany();
  }

  // Add product
  addProduct(name: string, quantity: number, price: number) {
    return this.prisma.product.create({
      data: { name, quantity, price },
    });
  }

  // Edit product
  updateProduct(
    id: number,
    name: string,
    quantity: number,
    price: number,
  ) {
    return this.prisma.product.update({
      where: { id },
      data: { name, quantity, price },
    });
  }
}
