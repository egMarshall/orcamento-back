import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenJWTService {
  private readonly jwtSecret = this.configService.get<string>('JWT_SECRET');

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async encrypt(
    data: object | Buffer,
    expiresIn: number | string = '1d',
  ): Promise<string> {
    return this.jwtService.sign(data, {
      expiresIn,
      secret: this.jwtSecret,
    });
  }

  async decrypt(cipherText: string): Promise<any> {
    const token = this.jwtService.verify(cipherText, {
      secret: this.jwtSecret,
      ignoreExpiration: true,
    });

    if (token.exp < Date.now() / 1000) {
      throw new Error('Token expired');
    }

    return token;
  }

  async verify(cipherText: string): Promise<any> {
    return this.jwtService.verify(cipherText, {
      secret: this.jwtSecret,
    });
  }
}
