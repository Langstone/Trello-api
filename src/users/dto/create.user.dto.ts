import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'ytr987NJ', description: 'User password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'The password must be at least 4 characters and no longer than 16' })
  readonly password: string;  
}