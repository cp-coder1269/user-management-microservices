import {
  Controller,
  Get,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { BlockUserService } from './block-user.service';
import { CreateBlockUserDto } from '@app/common-config/dtos/create-block-user.dto';
import { Request } from 'express';

@Controller('block-user')
export class BlockUserController {
  constructor(private readonly blockUserService: BlockUserService) {}
  @Post('/block')
  async block(
    @Body() createBlockUserDto: CreateBlockUserDto,
    @Req() req: Request,
  ) {
   try {
     const userId = req?.auth_user?.sub;
     return await this.blockUserService.block(userId, createBlockUserDto);
   } catch (error) {
        return error;
   }
  }

  @Post('/unblock')
  async unblock(
    @Body() createBlockUserDto: CreateBlockUserDto,
    @Req() req: Request,
  ) {
    try {
        const userId = req?.auth_user?.sub;
        return await this.blockUserService.unblock(userId, createBlockUserDto);
    } catch (error) {
        return error;
    }
  }

  @Get()
  async findAll(@Req() req: Request) {
    try {
        const userId = req?.auth_user?.sub;
        return await this.blockUserService.findAll(userId);
    } catch (error) {
        return error;
    }
  }
}
