import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { User } from '../users/users.model';
import { Card } from '../cards/cards.model';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from './comments.model';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([User, Card, Comment]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    CommentsService,
  ]
})
export class CommentsModule {}
