import { Resolver, Query } from '@nestjs/graphql';
import { DashboardService } from './dashboard.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '@prisma/client';
import { SetMetadata } from '@nestjs/common';


@Resolver()
export class DashboardResolver {
  constructor(private dashboardService: DashboardService) {}

  @Query(() => String)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [Role.MANAGER])
  async dashboardStats() {
    const stats = await this.dashboardService.getStats();
    return JSON.stringify(stats);
  }
}
