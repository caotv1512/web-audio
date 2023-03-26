import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { Product } from './database/product.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) { }
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return value.size < oneKb;
  }

  async create(data: ProductDto) {
    const product = {
      title: data.title,
      image: data.image,
      price: data.price,
      description: data.description,
      discount: data.discount,
      shop: data.shop,
      content: data.content,
      createdAt: new Date(),
    }
    try {
      this.productRepo.create(product);
      await this.productRepo.save(product);
    } catch (error) {
      throw new HttpException('Error creating product', HttpStatus.BAD_REQUEST);
    }
    return product;
  }

  async findAll() {
    const data = await this.productRepo.find();
    return data;
  }

  async findOnly(id: number) {
    const product = await this.productRepo.findOne({ where: { id: id } });

    if (!product) {
      throw new NotFoundException('Id not found.');
    }
    try {
      return product;
    } catch (err) {
      throw new BadRequestException({ action: 'find product data' });
    }
  }

  async update(id: number, data: ProductDto) {
    let product = await this.productRepo.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('Id not found.');
    }
    try {
      product.title = data.title;
      product.image = data.image;
      product.price = data.price;
      product.description = data.description;
      product.discount = data.discount;
      product.shop = data.shop;
      product.content = data.content;
      product.updatedAt = new Date();
      await this.productRepo.update({ id }, product);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: product,
      };
    } catch (err) {
      throw new BadRequestException({ action: 'find product data' });
    }
  }

  async delete(id: number): Promise<any> {
    const product = await this.productRepo.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('ProductId not found.');
    }
    try {
      this.productRepo.delete({ id: id });
      return {
        statusCode: HttpStatus.OK,
        message: `Deleted product id:${id} successfully`,
      };
    } catch (error) {
      throw new HttpException('Error deleting article', HttpStatus.BAD_REQUEST);
    }
  }
}
