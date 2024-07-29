import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Hasher } from 'src/services/hasher/hasher';
import { TokenJWTService } from 'src/services/token/token-jwt.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly hasher: Hasher,
    private readonly tokenService: TokenJWTService,
  ) {}

  async login(data: { email: string; password: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new HttpException("User don't exists", HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await this.hasher.compare(
      data.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.tokenService.encrypt({
      id: user.id,
      name: user.name,
      iat: Date.now() / 1000,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async create(data: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email);

    if (!isValidEmail) {
      throw new HttpException('Invalid email', HttpStatus.FORBIDDEN);
    }

    const hashedPassword = await this.hasher.hash(data.password);

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const token = await this.tokenService.encrypt({
      id: newUser.id,
      name: newUser.name,
      iat: Date.now() / 1000,
    });

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        emai: newUser.email,
      },
      token,
    };
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany();

    console.log(allUsers);

    if (allUsers.length < 1) {
      throw new HttpException('No users found', HttpStatus.NO_CONTENT);
    }

    const allusersNameAndMail = allUsers.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    });

    return allusersNameAndMail;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async update(id: string, data: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (data.email!) {
      throw new HttpException('Email cannot be updated', HttpStatus.FORBIDDEN);
    }

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async remove(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return { message: 'User deleted' };
  }
}
