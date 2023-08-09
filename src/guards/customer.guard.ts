import { UnauthorizedException } from '@nestjs/common';
import { Customer } from '../customer/model/customer.model';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class CustomerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Customer unauthorized');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Customer unauthorized');
    }

    const customer = await this.validateToken(token);
    if (!customer || !customer.is_active) {
      throw new UnauthorizedException('Invalid or inactive customer');
    }

    req.customer = customer;

    return true;
  }

  private async validateToken(token: string): Promise<Partial<Customer>> {
    try {
      return await this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      return null;
    }
  }
}
