import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BudgetItemsModule } from './budget_items/budget_items.module';
import { TokenJWTModule } from './services/token/tokenJWT.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [UsersModule, BudgetItemsModule, TokenJWTModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/users/login', '/signup', '/api-docs')
      .forRoutes('*');
  }
}
