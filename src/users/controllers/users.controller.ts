import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserRequestDto } from '../dto/users.request.dto';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyUserDto } from '../dto/users.dto';
import { AuthService } from '../../auth/auth.service';
import { CurrentUser } from '../../common/decorator/user.decorator';
import { UsersCurrentDto } from '../dto/users.current.dto';
import { LoginRequestDto } from '../../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { User } from '../users.schema';
import { multerOptions } from '../../common/utils/multer.options';
import { AwsService } from '../aws.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly awsService: AwsService,
  ) {}

  @ApiOperation({ summary: '현재 유저 정보 가져오기' })
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.awsService.uploadFileToS3('user', file);
  }

  @ApiOperation({ summary: '모든 유저 가져오기' })
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: '이미지 url 가져오기' })
  @Post('url')
  getImageUrl(@Body('key') key: string) {
    return this.awsService.getAwsS3FileUrl(key);
  }
}

// @UseInterceptors(FilesInterceptor('image', 10, multerOptions('users')))
// @Post('upload')
// uploadCatImg(
//   @UploadedFiles() files: Array<any>, //Express.Multer.File > any
//   @CurrentUser() user: User,
// ) {
//   console.log(files);
//   // return 'uploadImg';
//   // return { image: `http://localhost:8000/media/users/${files[0].filename}` };
//   return this.userService.uploadImg(user, files);
// }
