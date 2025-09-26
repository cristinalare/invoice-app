export class GetInvoiceResponseDTO {
  readonly id!: string;
  readonly date!: Date;
  readonly paid!: boolean;
  readonly vendorName!: string;
  readonly amount!: number;
  readonly dueDate!: Date;
}

export class GetInvoicesResponseDTO {
  readonly invoices!: GetInvoiceResponseDTO[];
  readonly page!: number;
  readonly total!: number;
}
