import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { CardList } from '../cardsList/cardlist.model';
import { Comment } from '../comments/comments.model';

interface CardCreationAttributes {
  text : string,
  cardListId: number,
  userId: number
}

@Table({ tableName: 'cards' })
export class Card extends Model<Card, CardCreationAttributes> {

  @ApiProperty({example: 3, description: 'Unique identificator'})
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  
  @ApiProperty({example: 'Card text', description: 'Example name for a card'})
  @Column({ type: DataType.STRING})
  text: string;

  @ForeignKey(() => User)
  @Column({ field: 'userId', type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => CardList)
  @Column({ field: 'cardListId', type: DataType.INTEGER })
  columnId: number;

  @BelongsTo(() => CardList)
  cardList: CardList;

  @HasMany(() => Comment)
  comment: Comment[];
}