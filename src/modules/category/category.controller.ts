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
import { CategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get('/')
  getAll() {
    return this.categoryService.findAll();
  }

  @Post('/')
  async createCategory(@Body() data: CategoryDto) {
    const category = await this.categoryService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'category created successfully',
      category,
    };
  }

  @Get('/:id')
  getOnly(@Param("id") id: number) {
    return this.categoryService.findOnly(id);
  }

  @Patch(':id')
  async updateCategory(@Param('id') id: number, @Body() data: CategoryDto) {
    return await this.categoryService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    await this.categoryService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
