import { UnauthorizedException } from '@nestjs/common';
import { Worker } from '../workers/model/worker.model';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class WorkerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Worker unauthorized');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Worker unauthorized');
    }

    const worker = await this.validateToken(token);
    if (!worker || !worker.is_active) {
      throw new UnauthorizedException('Invalid or inactive worker');
    }

    req.worker = worker;

    return true;
  }

  private async validateToken(token: string): Promise<Partial<Worker>> {
    try {
      return await this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      return null;
    }
  }
}
