import { Injectable, HttpException, HttpStatus, Scope, Request } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { CardList } from './cardlist.model';
import { CreateCardListDto } from './dto/create.cardlist.dto';
import { UpdateCardListDto } from './dto/update.cardlist.dto';

@Injectable()
export class CardListService {

  constructor(@InjectModel(CardList) private cardListRepository: typeof CardList) {};

  async createCardList(dto: CreateCardListDto, request) {
    console.log(request)
    // console.log(request.user.id)
    return await this.cardListRepository.create({ ...dto, userId: request.user.id });
  }

  async getAllCardsList(id: number) {
    return await this.cardListRepository.findAll({ where: { userId: id } });
  }

  async getCardListById(id: number) {
    return await this.cardListRepository.findOne({ where: { id } });
}

  async updateCardList(request, id: number, dto: UpdateCardListDto) {
    const currentCardList = await this.cardListRepository.findOne({ where: { id } });

    if (request.user.id !== Number(currentCardList.userId)) {
      throw new HttpException('You cannot change columns another user', HttpStatus.BAD_REQUEST);
    }
    await this.cardListRepository.update({ ...dto }, { where: { id } });
    return await this.cardListRepository.findOne({ where: { id } });
  }

  async deleteCardList(request, id: number) {

    const currentCardList = await this.cardListRepository.findOne({ where: { id } });
    if (!currentCardList) throw new HttpException('column with this ID does not exist', HttpStatus.BAD_REQUEST);
    if (request.user.id !== Number(currentCardList.userId)) throw new HttpException('You cannot delete columns another user', HttpStatus.BAD_REQUEST);

    await this.cardListRepository.destroy({ where: { id } });
  }
}
