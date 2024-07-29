import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenJWTService } from 'src/services/token/token-jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtModule: TokenJWTService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new HttpException('Token not provided', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    console.log('token', token);
    try {
      await this.jwtModule.decrypt(token);
      next();
    } catch (error) {
      throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
    }
  }
}
