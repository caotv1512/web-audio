import { IsNumber, IsString, IsNotEmpty, IsUrl, IsBoolean } from 'class-validator';

export class ShopDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;
}
