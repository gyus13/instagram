import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class ReadOnlyUserDto extends PickType(User, [
  'email',
  'name',
  'nickname',
] as const) {
  @ApiProperty({
    example: '3280199',
    description: 'id',
  })
  id: string;
}
