import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return await this.usersService.login(data);
  }

  @Get('session')
  async session(@Headers('authorization') token: string) {
    return await this.usersService.validateSession(token);
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }

  @Get('/all')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get()
  async findOne(@Headers('authorization') token: string) {
    return await this.usersService.findOne(token);
  }

  @Put()
  async update(
    @Headers('authorization') token: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(token, updateUserDto);
  }

  @Delete()
  async remove(@Headers('authorization') token: string) {
    return await this.usersService.remove(token);
  }
}
