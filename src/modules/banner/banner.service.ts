import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { Banner } from './database/banner.entity';
import { BannerDto } from './dto/banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private productRepo: Repository<Banner>,
  ) { }
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return value.size < oneKb;
  }

  async create(data: BannerDto) {
    const category = {
      title: data.title,
      image: data.image,
      content: data.content,
    }
    try {
      this.productRepo.create(category);
      await this.productRepo.save(category);
    } catch (error) {
      throw new HttpException('Error creating category', HttpStatus.BAD_REQUEST);
    }
    return category;
  }

  async findAll() {
    const data = await this.productRepo.find();
    return data;
  }

  async findOnly(id: number) {
    const category = await this.productRepo.findOne({ where: { id: id } });

    if (!category) {
      throw new NotFoundException('Id not found.');
    }
    try {
      return category;
    } catch (err) {
      throw new BadRequestException({ action: 'find category data' });
    }
  }

  async update(id: number, data: BannerDto) {
    let category = await this.productRepo.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundException('Id not found.');
    }
    try {
      category.title = data.title;
      category.image = data.image;
        await this.productRepo.update({ id }, category);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: category,
      };
    } catch (err) {
      throw new BadRequestException({ action: 'find category data' });
    }
  }

  async delete(id: number): Promise<any> {
    const category = await this.productRepo.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundException('BannerId not found.');
    }
    try {
      this.productRepo.delete({ id: id });
      return {
        statusCode: HttpStatus.OK,
        message: `Deleted category id:${id} successfully`,
      };
    } catch (error) {
      throw new HttpException('Error deleting article', HttpStatus.BAD_REQUEST);
    }
  }
}
