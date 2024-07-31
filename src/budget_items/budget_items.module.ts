import { Module } from '@nestjs/common';
import { BudgetItemsService } from './budget_items.service';
import { BudgetItemsController } from './budget_items.controller';
import { PrismaService } from 'src/database/prisma.service';
import { TokenJWTModule } from 'src/services/token/tokenJWT.module';

@Module({
  imports: [TokenJWTModule],
  controllers: [BudgetItemsController],
  providers: [BudgetItemsService, PrismaService],
})
export class BudgetItemsModule {}
