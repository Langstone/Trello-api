import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { CardListModule } from './cardsList/cardlist.module';
import { CardList } from './cardsList/cardlist.model';
import { CardsModule } from './cards/cards.module';
import { Card } from './cards/cards.model';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comments.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      models: [User, CardList, Card, Comment],
      autoLoadModels: true,
    }),
    UsersModule,
    CardListModule,
    AuthModule,
    CardsModule,
    CommentsModule
  ]
})
export class AppModule {}
