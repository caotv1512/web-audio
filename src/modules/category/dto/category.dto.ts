import { IsNumber, IsString, IsNotEmpty, IsUrl, IsBoolean } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
