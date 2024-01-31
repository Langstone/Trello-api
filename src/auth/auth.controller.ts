import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('users')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Login user'})
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({summary: 'Create user'})
  @Post()
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

}
