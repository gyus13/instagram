import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { UserRequestDto } from './users.request.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async signUp(body: UserRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.userModel.exists({ email });

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 유저는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await this.userModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }
}
