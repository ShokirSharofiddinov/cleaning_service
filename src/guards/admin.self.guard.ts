import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Observable } from 'rxjs';

@Injectable()
export class AdminSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.admin.id);
    console.log(req.params.id);
    if (String(req.admin.id) !== req.params.id) {
      throw new ForbiddenException({
        message: 'Don\'t allowed',
      });
    }
    return true;
  }
}
