import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyUserDto } from './dto/users.dto';
import { AuthService } from '../auth/auth.service';
import { HttpExceptionFilter } from '../common/exceptions/exception-filters';
import { CurrentUser } from '../common/decorator/user.decorator';
import { UsersCurrentDto } from './dto/users.current.dto';
import { LoginRequestDto } from '../auth/dto/login.request.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 유저 정보 가져오기' })
  @UseGuards(HttpExceptionFilter)
  @Get()
  getUsers(@CurrentUser() user: UsersCurrentDto) {
    console.log(user);
    return user.readOnlyData;
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
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: UserRequestDto) {
    return this.userService.signUp(body);
  }
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }
  @ApiOperation({ summary: '이미지 업로드' })
  @Post('upload')
  uploadUserImg() {
    return 'IMG';
  }
}
