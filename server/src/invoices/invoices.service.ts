import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, page: number = 1, size: number = 10) {
    try {
      const skip = (page - 1) * size;

      const [invoices, total] = await Promise.all([
        this.prisma.invoice.findMany({
          where: { userId },
          skip,
          take: size,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.invoice.count({ where: { userId } }),
      ]);

      return {
        data: invoices,
        page,
        total,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch invoices for user ${userId}`, error);
      throw new InternalServerErrorException('Failed to fetch invoices');
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const invoice = await this.prisma.invoice.findUnique({
        where: { id, userId },
      });

      if (!invoice) {
        throw new NotFoundException(`Invoice with ID ${id} not found`);
      }

      return invoice;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(
        `Failed to fetch invoice ${id} for user ${userId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to fetch invoice');
    }
  }
}
