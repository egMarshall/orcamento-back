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
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        throw new HttpException(
          'Usuário ou senha inválidos',
          HttpStatus.NOT_FOUND,
        );
      }

      const passwordMatch = await this.hasher.compare(
        data.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new HttpException(
          'Usuário ou senha inválidos',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = await this.tokenService.encrypt({
        id: user.id,
        name: user.name,
        iat: Date.now() / 1000,
      });

      return {
        token,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: CreateUserDto) {
    try {
      const userExists = await this.prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (userExists) {
        throw new HttpException(
          'Esse email já está em uso!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isValidEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email);

      if (!isValidEmail) {
        throw new HttpException('E-mail inválido', HttpStatus.FORBIDDEN);
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
        token,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateSession(token: string) {
    const userToken = token.split(' ')[1];
    const payload = await this.tokenService.decrypt(userToken);

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }

      if (payload.exp * 1000 < Date.now()) {
        throw new HttpException('Expired token', HttpStatus.UNAUTHORIZED);
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const allUsers = await this.prisma.user.findMany();

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
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(token: string) {
    const userToken = token.split(' ')[1];
    const { id } = await this.tokenService.decrypt(userToken);

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(token: string, data: UpdateUserDto) {
    const userToken = token.split(' ')[1];
    const { id } = await this.tokenService.decrypt(userToken);

    if (data.password) {
      data.password = await this.hasher.hash(data.password);
    }

    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (data.email!) {
        throw new HttpException(
          'Email cannot be updated',
          HttpStatus.FORBIDDEN,
        );
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
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(token: string) {
    const userToken = token.split(' ')[1];
    const { id } = await this.tokenService.decrypt(userToken);

    try {
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
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { message: 'User deleted' };
  }
}
