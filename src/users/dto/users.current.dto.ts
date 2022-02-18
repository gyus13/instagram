import { OmitType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UsersCurrentDto extends OmitType(User, ['password'] as const) {}
