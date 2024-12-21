import { Module } from '@nestjs/common';
import { AuthentifierService } from './authentifier.service';
import { AuthentifierController } from './authentifier.controller';

@Module({
  controllers: [AuthentifierController],
  providers: [AuthentifierService],
})
export class AuthentifierModule {}
