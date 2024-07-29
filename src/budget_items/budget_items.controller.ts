import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
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
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':user_id')
  async findAll(@Param('user_id') user_id: string) {
    try {
      return await this.budgetItemsService.findAll(user_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NO_CONTENT);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.budgetItemsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
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
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.budgetItemsService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
