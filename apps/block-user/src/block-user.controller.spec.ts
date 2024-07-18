import { Test, TestingModule } from '@nestjs/testing';
import { BlockUserController } from './block-user.controller';
import { BlockUserService } from './block-user.service';

describe('BlockUserController', () => {
  let blockUserController: BlockUserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BlockUserController],
      providers: [BlockUserService],
    }).compile();

    blockUserController = app.get<BlockUserController>(BlockUserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(blockUserController.getHello()).toBe('Hello World!');
    });
  });
});
