import { Injectable } from '@nestjs/common';
import {FeedsRequestDto} from "../feeds.request.dto";

@Injectable()
export class FeedsService {
  constructor() {}

  async upload(body: FeedsRequestDto) {
    const { title, content, imgUrl } = body;

  }
}
