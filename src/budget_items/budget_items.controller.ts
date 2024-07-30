import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.budgetItemsService.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', 500);
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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.budgetItemsService.remove(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', 500);
    }
  }
}
