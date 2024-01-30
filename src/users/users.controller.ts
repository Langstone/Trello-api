import { Controller, Get, Post, Body, UseGuards, Param, Put, Delete, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UpdateUserDto } from './dto/update.user.dto';
import { Request } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Create user'})
  @ApiResponse({status: 200, type: User})
  // @Post()
  // create(@Body() userDto: CreateUserDto) {
  //   return this.usersService.createUser(userDto);
  // }

  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: 'Get user'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({summary: 'Update user'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Req() request: Request, @Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    return this.usersService.updateUser(request, id, updateUser);
  }

  @ApiOperation({summary: 'Delete user'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  destroy(@Req() request: Request, @Param('id') id: number) {
    return this.usersService.deleteUser(request, id)
  }
}
