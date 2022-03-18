import { PickType } from '@nestjs/swagger';
import { Feed } from './feeds.schema';

export class FeedsRequestDto extends PickType(Feed, [
  'title',
  'content',
  'imgUrl',
] as const) {}
