import { Controller, Get } from '@nestjs/common';
import { BlockUserService } from './block-user.service';
import { CreateBlockUserDto } from '@app/common-config/dtos/create-block-user.dto';
import { MessagePattern } from '@nestjs/microservices';

const BLOCK_USER = 'block_user';
const UNBLOCK_USER = 'unblock_user';
const GET_BLOCKED_USERS = 'get_blocked_users';

@Controller()
export class BlockUserController {
  constructor(private readonly blockUserService: BlockUserService) {}

 @MessagePattern({ cmd:  BLOCK_USER})
  async block(payload: {userId: number, createBlockUserDto: CreateBlockUserDto}) {
        const {userId, createBlockUserDto} = payload;
        return await this.blockUserService.block(userId, createBlockUserDto);
    }

 @MessagePattern({ cmd:  UNBLOCK_USER})
  async unblock(payload: {userId: number, createBlockUserDto: CreateBlockUserDto}) {
        const {userId, createBlockUserDto} = payload;
        return await this.blockUserService.unblock(userId, createBlockUserDto);
    }

 @MessagePattern({cmd: GET_BLOCKED_USERS})
  async findAll(payload: {userId: number}) {
    console.log('block user me');
        const {userId} = payload;
        return await this.blockUserService.findAll(userId);
    }
}
