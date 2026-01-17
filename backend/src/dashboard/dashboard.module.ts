import { Module } from '@nestjs/common';
import { DashboardResolver } from './dashboard.resolver';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [DashboardResolver, DashboardService, PrismaService],
})
export class DashboardModule {}
