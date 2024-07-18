import { CreateUserDto } from '@app/common-config/dtos/create-user.dto';
import { SearchUserDto } from '@app/common-config/dtos/search-user.dto';
import { UpdateUserDto } from '@app/common-config/dtos/update-user.dto';
import {
  Controller,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

const SEARCH_USERS = 'search_users';
const CREATE_USER = 'create_user';
const FIND_ALL_USERS = 'find_all_users';
const FIND_USER_BY_ID = 'find_user_by_id';
const UPDATE_USER = 'update_user';
const DELETE_USER = 'delete_user';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern({ cmd: SEARCH_USERS })
  async searchUsers(payload: {userId: number, searchUserDto: SearchUserDto}) {  
    const {userId, searchUserDto} = payload;
    try {
      const data = await this.userService.searchUsers(userId, searchUserDto);
      return {
        success: true,
        length: data.length,
        data,
        message: 'Search Performed Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @MessagePattern({ cmd: CREATE_USER })
  async create(payload: {createUserDto: CreateUserDto}) {
    const {createUserDto} = payload;
    try {
      const data = await this.userService.create(createUserDto);
      return {
        success: true,
        data,
        message: 'User Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @MessagePattern({ cmd: FIND_ALL_USERS })
  async findAll() {
    try {
      const data = await this.userService.findAll();
      return {
        success: true,
        length: data.length,
        data,
        message: 'All Users Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @MessagePattern({ cmd: FIND_USER_BY_ID })
  async findOne(payload: { id: number }) {
    const {id} = payload;
    try {
      const data = await this.userService.findOne(id);
      return {
        success: true,
        data,
        message: 'User Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @MessagePattern({ cmd: UPDATE_USER })
  async update(payload: {id: number, updateUserDto: UpdateUserDto}) {
    const {id, updateUserDto} = payload
    try {
      const data = await this.userService.update(+id, updateUserDto);
      return {
        success: true,
        data,
        message: 'User Updated Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @MessagePattern({ cmd: DELETE_USER })
  async remove(payload: {id: number}) {
    const {id} = payload;
    try {
      const data = await this.userService.remove(id);
      return {
        success: true,
        data,
        message: 'User Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
