import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBudgetItemDto } from './dto/create-budget_item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget_item.dto';
import { PrismaService } from 'src/database/prisma.service';
import { TokenJWTService } from 'src/services/token/token-jwt.service';

@Injectable()
export class BudgetItemsService {
  constructor(
    private prisma: PrismaService,
    private readonly tokenService: TokenJWTService,
  ) {}

  async create(token: string, data: CreateBudgetItemDto) {
    const userToken = token.split(' ')[1];
    const { id } = await this.tokenService.decrypt(userToken);
    const userExists = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const budgetItemExists = await this.prisma.items.findFirst({
      where: {
        name: data.name,
        user_id: id,
      },
    });

    if (budgetItemExists) {
      throw new HttpException('Item já cadastrado!', HttpStatus.BAD_REQUEST);
    }

    const budgetItem = await this.prisma.items.create({
      data: {
        name: data.name,
        value: data.value,
        type: data.type,
        date: new Date(data.date),
        user: {
          connect: {
            id: id,
          },
        },
      },
    });

    return {
      id: budgetItem.id,
      name: budgetItem.name,
      value: budgetItem.value,
      type: budgetItem.type,
      date: budgetItem.date,
    };
  }

  async findAll(token: string) {
    const userToken = token.split(' ')[1];
    const { id } = await this.tokenService.decrypt(userToken);

    const allItems = await this.prisma.items.findMany({
      where: {
        user_id: id,
      },
    });

    if (allItems.length < 1) {
      throw new HttpException('Não há itens salvos', HttpStatus.NOT_FOUND);
    }

    return allItems.map((item) => {
      return {
        id: item.id,
        name: item.name,
        value: item.value,
        type: item.type,
        date: item.date,
      };
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.items.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new HttpException('No items found', HttpStatus.NOT_FOUND);
    }

    return {
      id: item.id,
      name: item.name,
      value: item.value,
      type: item.type,
      date: item.date,
    };
  }

  async update(id: string, data: UpdateBudgetItemDto) {
    const budgetItemExists = await this.prisma.items.findUnique({
      where: {
        id,
      },
    });

    if (!budgetItemExists) {
      throw new HttpException('No item found', HttpStatus.NOT_FOUND);
    }

    if (data.date) {
      data.date = new Date(data.date);
    }

    const updatedItem = await this.prisma.items.update({
      data,
      where: {
        id,
      },
    });

    return {
      id: updatedItem.id,
      name: updatedItem.name,
      value: updatedItem.value,
      type: updatedItem.type,
      date: updatedItem.date,
    };
  }

  async remove(id: string) {
    const budgetItemExists = await this.prisma.items.findUnique({
      where: {
        id,
      },
    });

    if (!budgetItemExists) {
      throw new HttpException(
        'This item does not exists!',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.items.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Budget item removed',
    };
  }
}
