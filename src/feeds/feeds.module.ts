import { Module } from '@nestjs/common';
import {FeedsController} from "./controllers/feeds.controller";
import {FeedsService} from "./services/feeds.service";

@Module({
    controllers:[FeedsController],
    providers:[FeedsService]
})
export class FeedsModule {}
