import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UserRequestDto extends PickType(User, [
  'email',
  'name',
  'password',
  'nickname',
] as const) {}
