import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetItemDto } from './create-budget_item.dto';

enum ItemType {
  Receita = 'Receita',
  Despesa = 'Despesa',
}

export class UpdateBudgetItemDto extends PartialType(CreateBudgetItemDto) {
  id: string;
  name: string;
  value: number;
  type: ItemType;
  date: Date;
}
