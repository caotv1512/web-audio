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
import { ShopDto } from './dto/shop.dto';
import { ShopService } from './shop.service';
import { Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @Get('/')
  getAll() {
    return this.shopService.findAll();
  }

  @Post('/')
  async createShop(@Body() data: ShopDto) {
    const shop = await this.shopService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'shop created successfully',
      shop,
    };
  }

  @Get('/:id')
  getOnly(@Param("id") id: number) {
    return this.shopService.findOnly(id);
  }

  @Patch(':id')
  async updateShop(@Param('id') id: number, @Body() data: ShopDto) {
    return await this.shopService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    await this.shopService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
