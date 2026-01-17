import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { SetMetadata } from '@nestjs/common';
import { Role } from '../auth/role.enum';

@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  // 🔍 View products (Manager + Store Keeper)
  @Query(() => [String])
  @SetMetadata('roles', [Role.MANAGER, Role.STORE_KEEPER])
  async products() {
    const products = await this.productsService.getAllProducts();
    return products.map(p => JSON.stringify(p));
  }

  // ➕ Add product
  @Mutation(() => String)
  @SetMetadata('roles', [Role.MANAGER, Role.STORE_KEEPER])
  addProduct(
    @Args('name') name: string,
    @Args('quantity', { type: () => Int }) quantity: number,
    @Args('price') price: number,
  ) {
    return this.productsService.addProduct(name, quantity, price);
  }

  // ✏️ Edit product
  @Mutation(() => String)
  @SetMetadata('roles', [Role.MANAGER, Role.STORE_KEEPER])
  updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
    @Args('quantity', { type: () => Int }) quantity: number,
    @Args('price') price: number,
  ) {
    return this.productsService.updateProduct(id, name, quantity, price);
  }
}
