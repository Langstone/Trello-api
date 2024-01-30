import { forwardRef, Module } from '@nestjs/common';
import { CardList } from '../cardsList/cardlist.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card } from './cards.model';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    SequelizeModule.forFeature([User, CardList, Card]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    CardsService,
  ]
})
export class CardsModule {}
