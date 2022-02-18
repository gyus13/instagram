import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersCurrentDto } from '../../users/dto/users.current.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user as UsersCurrentDto;
  },
);
