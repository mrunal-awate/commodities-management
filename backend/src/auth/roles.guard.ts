import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../auth/role.enum'; // adjust path if needed

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) return true;

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    return roles.includes(req.user.role);
  }
}
