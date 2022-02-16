import {Controller, Get} from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getUsers(): string {
        return "This action returns all users";
    }
}
