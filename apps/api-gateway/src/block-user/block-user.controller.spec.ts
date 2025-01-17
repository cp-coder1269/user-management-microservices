import { Test, TestingModule } from '@nestjs/testing';
import { BlockUserController } from './block-user.controller';
import { BlockUserService } from './block-user.service';

describe('BlockUserController', () => {
  let controller: BlockUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockUserController],
      providers: [BlockUserService],
    }).compile();

    controller = module.get<BlockUserController>(BlockUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
