import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './cards.model';
import { CreateCardDto } from './dto/create.card.dto';
import { UpdateCardDto } from './dto/update.card.dto';

@Injectable()
export class CardsService {

  constructor(@InjectModel(Card) private cardRepository: typeof Card) {};

  async createCard(dto: CreateCardDto, request, id: number) {
    const userId = await request.user.id;
    return await this.cardRepository.create({ ...dto, userId: userId, cardListId: id });
  }

  async getAllCards(id: number) {
    return await this.cardRepository.findAll({ where: { columnId: id } });
  }

  async getCardById(id: number) {
    return await this.cardRepository.findOne({ where: { id } });
}

  async updateCard(request, id: number, dto: UpdateCardDto) {
    const currentCard = await this.cardRepository.findOne({ where: { id } });

    if (request.user.id !== Number(currentCard.userId)) {
      throw new HttpException('You cannot change card another user', HttpStatus.BAD_REQUEST);
    }
    await this.cardRepository.update({ ...dto }, { where: { id } });
    return await this.cardRepository.findOne({ where: { id } });
  }

  async deleteCard(request, id: number) {

    const currentCard = await this.cardRepository.findOne({ where: { id } });
    if (!currentCard) throw new HttpException('card with this ID does not exist', HttpStatus.BAD_REQUEST);
    if (request.user.id !== Number(currentCard.userId)) throw new HttpException('You cannot delete columns another user', HttpStatus.BAD_REQUEST);

    await this.cardRepository.destroy({ where: { id } });
  }
}
