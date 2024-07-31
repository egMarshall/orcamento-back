enum ItemType {
  Receita = 'Receita',
  Despesa = 'Despesa',
}

export class CreateBudgetItemDto {
  name?: string;
  value?: number;
  type?: ItemType;
  date?: Date;
}
