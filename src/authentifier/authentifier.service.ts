import { Injectable } from '@nestjs/common';
import { CreateAuthentifierDto } from './dto/create-authentifier.dto';
import { UpdateAuthentifierDto } from './dto/update-authentifier.dto';

@Injectable()
export class AuthentifierService {
  create(createAuthentifierDto: CreateAuthentifierDto) {
    return 'This action adds a new authentifier';
  }

  findAll() {
    return `This action returns all authentifier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentifier`;
  }

  update(id: number, updateAuthentifierDto: UpdateAuthentifierDto) {
    return `This action updates a #${id} authentifier`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentifier`;
  }
}
