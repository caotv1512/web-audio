import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { Shop } from './database/shop.entity';
import { ShopDto } from './dto/shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private productRepo: Repository<Shop>,
  ) { }
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const oneKb = 1000;
    return value.size < oneKb;
  }

  async create(data: ShopDto) {
    const shop = {
      name: data.name,
      logo: data.logo,
    }
    try {
      this.productRepo.create(shop);
      await this.productRepo.save(shop);
    } catch (error) {
      throw new HttpException('Error creating shop', HttpStatus.BAD_REQUEST);
    }
    return shop;
  }

  async findAll() {
    const data = await this.productRepo.find();
    return data;
  }

  async findOnly(id: number) {
    const shop = await this.productRepo.findOne({ where: { id: id } });

    if (!shop) {
      throw new NotFoundException('Id not found.');
    }
    try {
      return shop;
    } catch (err) {
      throw new BadRequestException({ action: 'find shop data' });
    }
  }

  async update(id: number, data: ShopDto) {
    let shop = await this.productRepo.findOne({ where: { id: id } });
    if (!shop) {
      throw new NotFoundException('Id not found.');
    }
    try {
      shop.name = data.name;
      shop.logo = data.logo;
        await this.productRepo.update({ id }, shop);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: shop,
      };
    } catch (err) {
      throw new BadRequestException({ action: 'find shop data' });
    }
  }

  async delete(id: number): Promise<any> {
    const shop = await this.productRepo.findOne({ where: { id: id } });
    if (!shop) {
      throw new NotFoundException('ShopId not found.');
    }
    try {
      this.productRepo.delete({ id: id });
      return {
        statusCode: HttpStatus.OK,
        message: `Deleted shop id:${id} successfully`,
      };
    } catch (error) {
      throw new HttpException('Error deleting article', HttpStatus.BAD_REQUEST);
    }
  }
}
