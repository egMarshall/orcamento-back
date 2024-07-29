enum ItemType {
  Receita = 'Receita',
  Despesa = 'Despesa',
}

export class CreateBudgetItemDto {
  user_id: string;
  name: string;
  value: number;
  type: ItemType;
  date: Date;
}
