import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetInvoicesQueryDTO } from './dto/get-invoices-query.dto';
import {
  GetInvoiceResponseDTO,
  GetInvoicesResponseDTO,
} from './dto/get-invoices-response-dto';
import { GetInvoiceByIdResponseDTO } from './dto/get-invoice-by-id-response.dto';
import { Invoice } from '@prisma/client';

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  async findAll(
    @Query() queryDTO: GetInvoicesQueryDTO,
    @Request() req,
  ): Promise<GetInvoicesResponseDTO> {
    const { data, page, total } = await this.invoicesService.findAll(
      req.user.userId,
      queryDTO.page,
      queryDTO.size,
    );

    const invoicesResponseDTO: GetInvoiceResponseDTO[] = data.map(
      (entry: Invoice) => ({
        id: entry.id,
        date: entry.createdAt,
        paid: entry.paid,
        vendorName: entry.vendorName,
        dueDate: entry.dueDate,
        amount: entry.amount.toNumber(),
      }),
    );

    return {
      invoices: invoicesResponseDTO,
      page,
      total,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<GetInvoiceByIdResponseDTO> {
    const invoice = await this.invoicesService.findOne(id, req.user.userId);
    const invoiceResponseDTO = {
      id: invoice.id,
      date: invoice.createdAt,
      paid: invoice.paid,
      vendorName: invoice.vendorName,
      dueDate: invoice.dueDate,
      amount: invoice.amount.toNumber(),
      description: invoice.description,
    };
    return invoiceResponseDTO;
  }
}
