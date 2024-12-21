import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthentifierService } from './authentifier.service';
import { CreateAuthentifierDto } from './dto/create-authentifier.dto';
import { UpdateAuthentifierDto } from './dto/update-authentifier.dto';

@Controller('authentifier')
export class AuthentifierController {
  constructor(private readonly authentifierService: AuthentifierService) {}

  @Post()
  create(@Body() createAuthentifierDto: CreateAuthentifierDto) {
    return this.authentifierService.create(createAuthentifierDto);
  }

  @Get()
  findAll() {
    return this.authentifierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authentifierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthentifierDto: UpdateAuthentifierDto) {
    return this.authentifierService.update(+id, updateAuthentifierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authentifierService.remove(+id);
  }
}
