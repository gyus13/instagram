import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';
import { UsersCurrentDto } from './dto/users.current.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUserByIdWithoutPassword(
    userId: string,
  ): Promise<UsersCurrentDto | null> {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async existsByEmail(email: string): Promise<any> {
    const result = await this.userModel.exists({ email });
    return result;
  }

  async create(user: UserRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
