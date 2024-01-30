import { Get, Put, Body, Controller, Param, Req, UseGuards } from '@nestjs/common';
import { Delete, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Card } from './cards.model';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create.card.dto';
import { UpdateCardDto} from './dto/update.card.dto';
import { Request } from 'express';

@ApiTags('Cards')
@Controller('columns/:id/cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @ApiOperation({summary: 'Create card'})
  @ApiResponse({status: 200, type: Card})
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCardDto, @Req() request: Request, @Param('id') id: number) {
    return await this.cardsService.createCard(dto, request, id);
  }

  @ApiOperation({summary: 'Take all the cards in the column'})
  @ApiResponse({status: 200, type: [Card]})
  @UseGuards(JwtAuthGuard)
  @Get()
  GetAll(@Param('id') id: number) {
    return this.cardsService.getAllCards(id);
  }

  @ApiOperation({summary: 'Get card'})
  @ApiResponse({status: 200, type: [Card]})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.cardsService.getCardById(id);
  }

  @ApiOperation({summary: 'Update card'})
  @ApiResponse({status: 200, type: [Card]})
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Req() request: Request, @Param('id') id: number, @Body() updateCard: UpdateCardDto) {
    return this.cardsService.updateCard(request, id, updateCard);
  }

  @ApiOperation({summary: 'Delete card'})
  @ApiResponse({status: 200, type: [Card]})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  destroy(@Req() request: Request, @Param('id') id: number) {
    return this.cardsService.deleteCard(request, id)
  }
}
