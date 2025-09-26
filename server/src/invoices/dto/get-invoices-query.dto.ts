import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class GetInvoicesQueryDTO {
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  readonly page: number = 1;

  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  readonly size: number = 10;
}
