import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // async existsByEmail(email: string): Promise<boolean> {
  //   const result = await this.userModel.exists({ email });
  //   return result;
  // }

  async create(user: UserRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
