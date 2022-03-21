import { Body, Controller, Get, Post } from '@nestjs/common';
import { FeedsRequestDto } from '../feeds.request.dto';
import { FeedsService } from '../services/feeds.service';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}
  @Get()
  getFeed(): string {
    return 'This action return all feeds';
  }

  @Post()
  postFeed(@Body() data: FeedsRequestDto) {
    return this.feedsService.upload(data);
  }
}
