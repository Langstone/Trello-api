import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create.comment.dto';
import { UpdateCommentDto } from './dto/update.commemt.dto';

@Injectable()
export class CommentsService {
  
  constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {};

  async createComment(dto: CreateCommentDto, request, id: number) {
    const userId = await request.user.id;
    return await this.commentRepository.create({ ...dto, userId: userId, cardId: id });
  }

  async getAllComments(id: number) {
    return await this.commentRepository.findAll({ where: { cardId: id } });
  }

  async getCommentById(id: number) {
    return await this.commentRepository.findOne({ where: { id } });
}

  async updateComment(request, id: number, dto: UpdateCommentDto) {
    const currentComment = await this.commentRepository.findOne({ where: { id } });

    if (request.user.id !== Number(currentComment.userId)) {
      throw new HttpException('You cannot change comment another user', HttpStatus.BAD_REQUEST);
    }
    await this.commentRepository.update({ ...dto }, { where: { id } });
    return await this.commentRepository.findOne({ where: { id } });
  }

  async deleteComment(request, id: number) {

    const currentComment = await this.commentRepository.findOne({ where: { id } });
    if (!currentComment) throw new HttpException('comment with this ID does not exist', HttpStatus.BAD_REQUEST);
    if (request.user.id !== Number(currentComment.userId)) throw new HttpException('You cannot delete comments another user', HttpStatus.BAD_REQUEST);

    await this.commentRepository.destroy({ where: { id } });
  }
}
