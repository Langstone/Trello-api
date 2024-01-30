import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { AuthModule } from 'src/auth/auth.module';
import { CardList } from 'src/cardsList/cardlist.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, CardList]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
