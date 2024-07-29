import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BudgetItemsModule } from './budget_items/budget_items.module';
import { TokenJWTModule } from './services/token/tokenJWT.module';

@Module({
  imports: [UsersModule, BudgetItemsModule, TokenJWTModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
