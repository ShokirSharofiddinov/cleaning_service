import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (String(req.customer.id) !== req.params.id) {
      throw new ForbiddenException({
        message: 'Don\'t allowed',
      });
    }
    return true;
  }
}
