import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Card } from '../cards/cards.model';

interface CardListCreationAttributes {
  title: string,
  userId: number
}

@Table({ tableName: 'columns' })
export class CardList extends Model<CardList, CardListCreationAttributes> {

  @ApiProperty({example: 3, description: 'Unique identificator'})
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;
  
  @ApiProperty({example: 'Example Title', description: 'Column title'})
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ForeignKey(() => User)
  @Column({ field: 'userId', type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Card)
  card: Card[];

}