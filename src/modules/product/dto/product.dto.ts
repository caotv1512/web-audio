import { IsNumber, IsString, IsNotEmpty, IsUrl, IsBoolean } from 'class-validator';
import { Product } from '../database/product.entity';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @IsBoolean()
  @IsNotEmpty()
  shop: boolean = true;

  @IsString()
  @IsNotEmpty()
  content: string;
}
