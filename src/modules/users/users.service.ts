import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './database/users.entity';
import { Repository, Timestamp } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async findAll() {
    const data = await this.userRepo.find();
    console.log(data);

    return data;
  }
}
