import { forwardRef, Module } from '@nestjs/common';
import { CardListController } from './cardlist.controller';
import { CardList } from './cardlist.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardListService } from './cardlist.service';
import { User } from '../users/users.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CardListController],
  providers: [CardListService],
  imports: [
    SequelizeModule.forFeature([User, CardList]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    CardListService,
  ]
})
export class CardListModule {}

