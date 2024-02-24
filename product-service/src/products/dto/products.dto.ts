import {
  IsDecimal,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class AddProductDto {
  @IsString()
  productName: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  userId: number;
}

export class EditProductDto {
  @IsString()
  @IsOptional()
  productName?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;
}
