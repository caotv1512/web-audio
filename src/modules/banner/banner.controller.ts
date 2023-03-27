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
import { BannerDto } from './dto/banner.dto';
import { BannerService } from './banner.service';
import { Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) { }

  @Get('/')
  getAll() {
    return this.bannerService.findAll();
  }

  @Post('/')
  async createBanner(@Body() data: BannerDto) {
    const banner = await this.bannerService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'banner created successfully',
      banner,
    };
  }

  @Get('/:id')
  getOnly(@Param("id") id: number) {
    return this.bannerService.findOnly(id);
  }

  @Patch(':id')
  async updateBanner(@Param('id') id: number, @Body() data: BannerDto) {
    return await this.bannerService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    await this.bannerService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
