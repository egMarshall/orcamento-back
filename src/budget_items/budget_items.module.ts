import { Module } from '@nestjs/common';
import { BudgetItemsService } from './budget_items.service';
import { BudgetItemsController } from './budget_items.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [BudgetItemsController],
  providers: [BudgetItemsService, PrismaService],
})
export class BudgetItemsModule {}
