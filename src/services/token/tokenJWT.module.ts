import { Module } from '@nestjs/common';
import { TokenJWTService } from './token-jwt.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  providers: [TokenJWTService],
  exports: [TokenJWTService, JwtModule],
})
export class TokenJWTModule {}
