import { PartialType } from '@nestjs/mapped-types';
import { CreateCardListDto } from './create.cardlist.dto';

export class UpdateCardListDto extends PartialType(CreateCardListDto) {}
