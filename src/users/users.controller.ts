import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRequestDto } from './users.request.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): string {
    return 'This action returns all users';
  }

  @Post()
  async signUp(@Body() body: UserRequestDto) {
    return 'this.usersService.signUp(body)';
  }
}
