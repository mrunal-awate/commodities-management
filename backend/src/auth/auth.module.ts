import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'supersecretkey', // assignment-safe
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
