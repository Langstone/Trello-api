import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCardListDto {

  @ApiProperty({ example: 'Birthday meeting', description: 'Column description' })
  @IsString({ message: 'Must be a string' })
  readonly title: string;
}