import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRequestDto } from '../dto/users.request.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users.repository';
import { User } from '../users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers() {
    const allUser = await this.usersRepository.findAll();
    const readOnlyUsers = allUser.map((user) => user.readOnlyData);
    return readOnlyUsers;
  }

  async uploadImg(user: User, files: any) {
    // Express.Multer.File[] > any
    const fileName = `users/${files[0].filename}`;

    console.log(fileName);

    const newUser = await this.usersRepository.findByIdAndUpdateImg(
      user.id,
      fileName,
    );
    console.log(newUser);
    return newUser;
  }

  async signUp(body: UserRequestDto) {
    const { email, name, password, nickname } = body;
    const isUserExist = await this.usersRepository.existsByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('해당하는 유저는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      email,
      name,
      nickname,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }
}
