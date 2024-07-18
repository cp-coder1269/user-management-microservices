import { CreateBlockUserDto } from '@app/common-config/dtos/create-block-user.dto';
import { BlockUser } from '@app/common-config/entities/block-user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const BLOCK_USER = 'block_user';
const UNBLOCK_USER = 'unblock_user';
const GET_BLOCKED_USERS = 'get_blocked_users';
@Injectable()
export class BlockUserService {
  constructor(
    @Inject('BLOCK_USER') private readonly blockUserClient: ClientProxy,
  ) {}

  async block(userId: number, createBlockUserDto: CreateBlockUserDto) {
    const pattern = { cmd: BLOCK_USER };
    const payload = { userId, createBlockUserDto };
    return await this.blockUserClient.send(pattern, payload).toPromise();
  }

  async unblock(userId: number, createBlockUserDto: CreateBlockUserDto) {
    const pattern = { cmd: UNBLOCK_USER };
    const payload = { userId, createBlockUserDto };
    return await this.blockUserClient.send(pattern, payload).toPromise();
  }

  async findAll(
    userId: number,
  ) {
    const pattern = { cmd: GET_BLOCKED_USERS };
    const payload = { userId };
    return await this.blockUserClient.send(pattern, payload).toPromise();
  }
}
