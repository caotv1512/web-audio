import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Patch, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('/')
  getAll() {
    return this.productService.findAll();
  }

  @Post('/')
  async createUsers(@Body() data: ProductDto) {
    const product = await this.productService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'product created successfully',
      product,
    };
  }

  @Get('/:id')
  getOnly(@Param("id") id: number) {
    return this.productService.findOnly(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() data: ProductDto) {
    return await this.productService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    await this.productService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
