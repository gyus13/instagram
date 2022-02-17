import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(body: UserRequestDto) {
    const { email, name, password, nickname } = body;
    // const isUserExist = await this.usersRepository.existsByEmail(email);
    //
    // if (isUserExist) {
    //   throw new UnauthorizedException('해당하는 유저는 이미 존재합니다.');
    // }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await this.usersRepository.create({
      email,
      name,
      nickname,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }
}
