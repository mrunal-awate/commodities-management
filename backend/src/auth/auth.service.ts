import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    // 1️⃣ Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // 2️⃣ If user not found
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3️⃣ Compare hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 4️⃣ JWT payload (important for RBAC)
    const payload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };

    // 5️⃣ Return token + role (useful for frontend)
    return {
      accessToken: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}
