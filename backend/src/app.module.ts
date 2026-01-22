import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaModule } from './prisma.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({                   // graphql module
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    PrismaModule,
    AuthModule,
    DashboardModule,
    ProductsModule,
  ],
})
export class AppModule {}
