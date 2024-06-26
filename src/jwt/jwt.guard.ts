import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    try {
      const authorization = request.headers.authorization;
      const decoded = this.jwtService.verify(authorization);
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
