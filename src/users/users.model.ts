import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { CardList } from 'src/cardsList/cardlist.model';
import { Card } from '../cards/cards.model';
import { Comment } from '../comments/comments.model';

interface UserCreationAttributes {
  email: string,
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  
  @ApiProperty({example: 3, description: 'Unique identificator'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: 'example@gmail.com', description: 'Email'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({example: 'ytr987NJ', description: 'User password'})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => CardList)
  column: CardList[];

  @HasMany(() => Card)
  card: Card[];

  @HasMany(() => Comment)
  comment: Comment[];
}