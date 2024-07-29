import { Test, TestingModule } from '@nestjs/testing';
import { BudgetItemsService } from './budget_items.service';

describe('BudgetItemsService', () => {
  let service: BudgetItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetItemsService],
    }).compile();

    service = module.get<BudgetItemsService>(BudgetItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
