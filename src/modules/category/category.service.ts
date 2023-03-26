import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { Category } from './database/category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private productRepo: Repository<Category>,
  ) { }
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return value.size < oneKb;
  }

  async create(data: CategoryDto) {
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

  async update(id: number, data: CategoryDto) {
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
      throw new NotFoundException('CategoryId not found.');
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
