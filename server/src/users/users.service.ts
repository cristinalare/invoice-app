import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      this.logger.error(`Failed to find user by email ${email}`, error);
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error(`Failed to find user by id ${id}`, error);
      throw new InternalServerErrorException('Failed to find user');
    }
  }
}
