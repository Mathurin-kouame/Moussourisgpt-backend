import { Test, TestingModule } from '@nestjs/testing';
import { OpeniaController } from './openai.controller';

describe('OpeniaController', () => {
  let controller: OpeniaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpeniaController],
    }).compile();

    controller = module.get<OpeniaController>(OpeniaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
