import { PartialType } from '@nestjs/swagger';
import { CreateAuthentifierDto } from './create-authentifier.dto';

export class UpdateAuthentifierDto extends PartialType(CreateAuthentifierDto) {}
