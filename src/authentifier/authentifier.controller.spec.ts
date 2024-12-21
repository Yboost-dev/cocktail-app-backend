import { Test, TestingModule } from '@nestjs/testing';
import { AuthentifierController } from './authentifier.controller';
import { AuthentifierService } from './authentifier.service';

describe('AuthentifierController', () => {
  let controller: AuthentifierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthentifierController],
      providers: [AuthentifierService],
    }).compile();

    controller = module.get<AuthentifierController>(AuthentifierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
