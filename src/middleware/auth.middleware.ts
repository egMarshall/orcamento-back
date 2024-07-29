import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const excludedPaths = ['/login', '/signup', '/api-docs'];
    if (excludedPaths.some((path) => req.path.startsWith(path))) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new HttpException('Token not provided', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    try {
      await this.jwtService.verifyAsync(token);
      next();
    } catch (error) {
      throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
    }
  }
}
