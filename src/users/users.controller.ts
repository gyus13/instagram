import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {} // 왜함? 4

  @ApiOperation({ summary: '현재 유저 정보 가져오기' })
  @Get()
  getUsers() {
    return 'This action returns all users';
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyUserDto,
  })
  @Post()
  async signUp(@Body() body: UserRequestDto) {
    return this.userService.signUp(body);
  }
}
