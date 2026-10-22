import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Length, Matches, Max, MaxLength } from 'class-validator';
import { ExpenseCategory, ExpenseStatus, PaymentMethod, RevenueCategory } from '../../../generated/prisma/enums.js';

class FinanceEntryDto {
  @ApiPropertyOptional({ example: 'Rifa beneficente', maxLength: 80, description: 'Obrigatório (e só usado) na categoria OUTROS' })
  @IsOptional() @IsString() @MaxLength(80) title?: string;

  @ApiProperty({ example: 150.5, description: 'Em reais, até 2 casas decimais' })
  @IsNumber({ maxDecimalPlaces: 2 }) @IsPositive() @Max(99_999_999.99) amount: number;

  @ApiProperty({ example: '20/10/2026', description: 'DD/MM/AAAA' })
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'date deve usar DD/MM/AAAA.' }) date: string;

  @ApiPropertyOptional({ example: 'Referente ao mês de outubro', maxLength: 500 })
  @IsOptional() @IsString() @Length(0, 500) description?: string;
}

export class RevenueDto extends FinanceEntryDto {
  @ApiProperty({ enum: RevenueCategory })
  @IsEnum(RevenueCategory) category: RevenueCategory;

  @ApiProperty({ enum: PaymentMethod, description: 'Forma de recebimento' })
  @IsEnum(PaymentMethod) paymentMethod: PaymentMethod;

  @ApiPropertyOptional({ format: 'uuid', nullable: true, description: 'Atleta vinculado; só usado em AJUDA_DE_CUSTO (RF014). null desvincula.' })
  @IsOptional() @IsUUID() studentId?: string | null;
}

export class ExpenseDto extends FinanceEntryDto {
  @ApiProperty({ enum: ExpenseCategory })
  @IsEnum(ExpenseCategory) category: ExpenseCategory;

  @ApiProperty({ enum: ExpenseStatus, description: 'Situação: paga ou pendente' })
  @IsEnum(ExpenseStatus) status: ExpenseStatus;
}

// PATCH: só o que mudar.
export class UpdateRevenueDto extends PartialType(RevenueDto) {}
export class UpdateExpenseDto extends PartialType(ExpenseDto) {}
