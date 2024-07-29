import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { HasherModule } from 'src/services/hasher/hasher.module';
import { TokenJWTModule } from 'src/services/token/tokenJWT.module';

@Module({
  imports: [HasherModule, TokenJWTModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
