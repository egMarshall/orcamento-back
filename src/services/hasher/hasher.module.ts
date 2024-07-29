import { Module } from '@nestjs/common';
import { HasherBcrypt } from './contracts/hasher-bcrypt';
import { Hasher } from './hasher';

@Module({
  providers: [
    {
      provide: Hasher,
      useClass: HasherBcrypt,
    },
  ],
  exports: [Hasher],
})
export class HasherModule {}
