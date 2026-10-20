import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

// Usar depois do JwtAuthGuard, que preenche request.user.
@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user?.isSuperAdmin !== true) throw new ForbiddenException('Somente o superadmin acessa este módulo');
    return true;
  }
}
