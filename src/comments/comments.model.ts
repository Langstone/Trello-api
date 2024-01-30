import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Card } from '../cards/cards.model';

interface CommentCreationAttributes {
  text : string,
  cardId: number,
  userId: number
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttributes> {

  @ApiProperty({example: 3, description: 'Unique comment identifier'})
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  
  @ApiProperty({example: 'Comment text', description: 'Content of the comment'})
  @Column({ type: DataType.STRING})
  text: string;

  @ForeignKey(() => User)
  @Column({ field: 'userId', type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Card)
  @Column({ field: 'cardId', type: DataType.INTEGER })
  cardId: number;

  @BelongsTo(() => Card)
  card: Card;
}