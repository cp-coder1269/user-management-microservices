import { CreateUserDto } from '@app/common-config/dtos/create-user.dto';
import { SearchUserDto } from '@app/common-config/dtos/search-user.dto';
import { UpdateUserDto } from '@app/common-config/dtos/update-user.dto';
import {
  Controller,
  Get,
  Query,
  Req,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { Public } from '../auth/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('search')
  async searchUsers(
    @Query() searchUserDto: SearchUserDto,
    @Req() req: Request,
  ) {
    const userId = req.auth_user.sub;
    try {
        const data  = await this.userService.searchUsers(userId, searchUserDto);
        return data;
    } catch (error) {
        return {
        success: false,
        message: error.message,
      };
    }

  }

@Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.userService.create(createUserDto);
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  @Public()
  async findAll() {
    try {
      const data = await this.userService.findAll();
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(+id);
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const data = await this.userService.update(+id, updateUserDto);
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.userService.remove(+id);
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
  
}
