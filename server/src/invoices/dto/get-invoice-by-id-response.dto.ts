export class GetInvoiceByIdResponseDTO {
  readonly id: string;
  readonly date: Date;
  readonly paid: boolean;
  readonly vendorName: string;
  readonly amount: number;
  readonly dueDate: Date;
  readonly description: string;
}
