enum ItemType {
  Receita = 'Receita',
  Despesa = 'Despesa',
}

export class CreateBudgetItemDto {
  user_id: string;
  name: string;
  price: number;
  type: ItemType;
}
