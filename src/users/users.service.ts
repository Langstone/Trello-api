import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getUserById(id: number) {
      const user = await this.userRepository.findOne({ where: { id } });
      return user;
  }

  async updateUser(request, id: number, dto: UpdateUserDto) {
    if (request.user.id !== Number(id)) {
      throw new HttpException('You cannot change another user', HttpStatus.BAD_REQUEST);
    }
    if (dto.password) {
      const hasPassword = await bcrypt.hash(dto.password, 6);
      await this.userRepository.update({ ...dto, password: hasPassword }, { where: { id } });  
    } else {
      await this.userRepository.update({ ...dto }, { where: { id } });
    }
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async deleteUser(request, id: number) {
    if (request.user.id !== Number(id)) {
    throw new HttpException('You cannot delete another user', HttpStatus.BAD_REQUEST);
    }

    const user =  await this.userRepository.findOne({ where: { id } });
    await this.userRepository.destroy({ where: { id } });
  }
}
