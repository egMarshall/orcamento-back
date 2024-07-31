import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Headers,
  HttpException,
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
    try {
      const newItem = await this.budgetItemsService.create(
        token,
        createBudgetItemDto,
      );
      return newItem;
    } catch (error) {
      return { error: error.message, status: error.status };
    }
  }

  @Get('/all')
  async findAll(@Headers('authorization') token: string) {
    try {
      return await this.budgetItemsService.findAll(token);
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
