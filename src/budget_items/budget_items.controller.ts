import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BudgetItemsService } from './budget_items.service';
import { CreateBudgetItemDto } from './dto/create-budget_item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget_item.dto';

@Controller('budget-items')
export class BudgetItemsController {
  constructor(private readonly budgetItemsService: BudgetItemsService) {}

  @Post()
  async create(@Body() createBudgetItemDto: CreateBudgetItemDto) {
    try {
      const newItem = await this.budgetItemsService.create(createBudgetItemDto);
      return newItem;
    } catch (error) {
      return { error: error.message, status: error.status };
    }
  }

  @Get('/all/:user_id')
  async findAll(@Param('user_id') user_id: string) {
    try {
      return await this.budgetItemsService.findAll(user_id);
    } catch (error) {
      return { error: error.message, status: error.status };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.budgetItemsService.findOne(id);
    } catch (error) {
      return { error: error.message, status: error.status };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBudgetItemDto: UpdateBudgetItemDto,
  ) {
    try {
      return await this.budgetItemsService.update(id, updateBudgetItemDto);
    } catch (error) {
      return { error: error.message, status: error.status };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.budgetItemsService.remove(id);
    } catch (error) {
      return { error: error.message, status: error.status };
    }
  }
}
