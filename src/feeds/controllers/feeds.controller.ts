import {Body, Controller, Get, Patch, Post} from '@nestjs/common';
import { FeedsRequestDto } from '../feeds.request.dto';
import { FeedsService } from '../services/feeds.service';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}
  @Get()
  getAllFeed(): string {
    return 'This action return all feeds';
  }

  @Get('id')
  getFeed(): string {
    return 'This action return a feed';
  }

  @Post()
  postFeed(@Body() data: FeedsRequestDto) {
    return this.feedsService.upload(data);
  }

  @Patch(':id')
  deleteFeed(@Body() data: FeedsRequestDto) {
    return 'this action return deleted feed';
  }
}
