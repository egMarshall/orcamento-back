import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Headers,
} from '@nestjs/common';
import { BudgetItemsService } from './budget_items.service';
import { CreateBudgetItemDto } from './dto/create-budget_item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget_item.dto';

@Controller('budget-items')
export class BudgetItemsController {
  constructor(private readonly budgetItemsService: BudgetItemsService) {}

  @Post()
  async create(
    @Headers('authorization') token: string,
    @Body() createBudgetItemDto: CreateBudgetItemDto,
  ) {
    const newItem = await this.budgetItemsService.create(
      token,
      createBudgetItemDto,
    );
    return newItem;
  }

  @Get('/all')
  async findAll(@Headers('authorization') token: string) {
    return await this.budgetItemsService.findAll(token);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.budgetItemsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Headers('authorization') token: string,
    @Param('id') id: string,
    @Body() updateBudgetItemDto: UpdateBudgetItemDto,
  ) {
    return await this.budgetItemsService.update(token, id, updateBudgetItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.budgetItemsService.remove(id);
  }
}
