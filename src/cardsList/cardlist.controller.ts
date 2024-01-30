import { Body, Controller, Delete, Get, Post, Put, UseGuards, Req, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardList } from './cardlist.model';
import { CardListService } from './cardlist.service';
import { CreateCardListDto } from './dto/create.cardlist.dto';
import { UpdateCardListDto } from './dto/update.cardlist.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Request } from 'express';

@ApiTags('Columns')
@Controller('users/:id/columns')
export class CardListController {

  constructor(private cardListService: CardListService) {}

  @ApiOperation({summary: 'Create column'})
  @ApiResponse({status: 200, type: CardList})
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCardListDto, @Req() request: Request) {
    return await this.cardListService.createCardList(dto, request);
  }

  @ApiOperation({summary: 'get all user columns'})
  @ApiResponse({status: 200, type: [CardList]})
  @UseGuards(JwtAuthGuard)
  @Get()
  GetAll(@Param('id') id: number) {
    return this.cardListService.getAllCardsList(id);
  }

  @ApiOperation({summary: 'Get column'})
  @ApiResponse({status: 200, type: [CardList]})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.cardListService.getCardListById(id);
  }

  @ApiOperation({summary: 'Update column'})
  @ApiResponse({status: 200, type: [CardList]})
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Req() request: Request, @Param('id') id: number, @Body() updateCardList: UpdateCardListDto) {
    return this.cardListService.updateCardList(request, id, updateCardList);
  }

  @ApiOperation({summary: 'Delete column'})
  @ApiResponse({status: 200, type: [CardList]})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  destroy(@Req() request: Request, @Param('id') id: number) {
    return this.cardListService.deleteCardList(request, id)
  }
}
