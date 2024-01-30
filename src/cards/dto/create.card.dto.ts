import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCardDto {

  @ApiProperty({ example: 'Money for a birthday gift', description: 'Card description' })
  @IsString({ message: 'Must be a string' })
  readonly text: string;
}