import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {

  @ApiProperty({ example: 'Ok i will do it', description: 'Comment context' })
  @IsString({ message: 'Must be a string' })
  readonly text: string;
}