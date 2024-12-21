import { Test, TestingModule } from '@nestjs/testing';
import { AuthentifierService } from './authentifier.service';

describe('AuthentifierService', () => {
  let service: AuthentifierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthentifierService],
    }).compile();

    service = module.get<AuthentifierService>(AuthentifierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
