import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create.comment.dto';
import { UpdateCommentDto } from './dto/update.commemt.dto';
import { Comment } from './comments.model';
import { Request } from 'express';

@ApiTags('Comments')
@Controller('cards/:id/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({summary: 'Create comment'})
  @ApiResponse({status: 200, type: Comment})
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCommentDto, @Req() request: Request, @Param('id') id: number) {
    return await this.commentsService.createComment(dto, request, id);
  }

  @ApiOperation({summary: 'Take all the comments in the card'})
  @ApiResponse({status: 200, type: [Comment]})
  @UseGuards(JwtAuthGuard)
  @Get()
  GetAll(@Param('id') id: number) {
    return this.commentsService.getAllComments(id);
  }

  @ApiOperation({summary: 'Get comment'})
  @ApiResponse({status: 200, type: [Comment]})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.commentsService.getCommentById(id);
  }

  @ApiOperation({summary: 'Update comment'})
  @ApiResponse({status: 200, type: [Comment]})
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Req() request: Request, @Param('id') id: number, @Body() updateCard: UpdateCommentDto) {
    return this.commentsService.updateComment(request, id, updateCard);
  }

  @ApiOperation({summary: 'Delete comment'})
  @ApiResponse({status: 200, type: [Comment]})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  destroy(@Req() request: Request, @Param('id') id: number) {
    return this.commentsService.deleteComment(request, id)
  }
}
