import {Body, Controller, Get, Post} from '@nestjs/common';

@Controller('feeds')
export class FeedsController {
  @Get()
  getFeed(): string {
    return 'This action return all feeds';
  }

  @Post()
  postFeed(@Body() data : FeedRequestDto) {

  }

}
