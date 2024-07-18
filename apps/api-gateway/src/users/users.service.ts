import { CreateUserDto } from '@app/common-config/dtos/create-user.dto';
import { SearchUserDto } from '@app/common-config/dtos/search-user.dto';
import { UpdateUserDto } from '@app/common-config/dtos/update-user.dto';
import { User } from '@app/common-config/entities/user.entity';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

const SEARCH_USERS = 'search_users';
const CREATE_USER = 'create_user';
const FIND_ALL_USERS = 'find_all_users';
const FIND_USER_BY_ID = 'find_user_by_id';
const FIND_USER_BY_USERNAME = 'find_user_by_username';
const UPDATE_USER = 'update_user';
const DELETE_USER = 'delete_user';


export class UsersService {
  constructor(
	    @Inject('USER_MANAGEMENT') private readonly userManagementClient: ClientProxy,
    // @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async searchUsers(
    userId: number,
    searchUserDto: SearchUserDto,
  ): Promise<Observable<User[]>> {
	const pattern = { cmd: SEARCH_USERS };
    const payload = {userId, searchUserDto};
    return this.userManagementClient.send( pattern, payload).toPromise();
  }

  async create(createUserDto: CreateUserDto): Promise<Observable<User>> {
 	const pattern = { cmd: CREATE_USER };
    const payload = {createUserDto}
    return this.userManagementClient.send( pattern, payload).toPromise();
  }

  async findAll(): Promise<Observable<any>> {
	const pattern = { cmd: FIND_ALL_USERS };
    const payload = {};
    return  this.userManagementClient.send( pattern, payload).toPromise();
  }

  async findOne(id: number): Promise<Observable<any>> {
	const pattern = { cmd: FIND_USER_BY_ID };
    const payload = {id}
    return this.userManagementClient.send( pattern, payload).toPromise();
  }
  async findByUsername(username: string): Promise<Observable<any>> {
  	const pattern = { cmd: FIND_USER_BY_USERNAME };
    const payload = {username}
    return this.userManagementClient.send( pattern, payload).toPromise();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Observable<any>> {
   	const pattern = { cmd: UPDATE_USER };
    const payload = {id, updateUserDto}
    return this.userManagementClient.send( pattern, payload).toPromise();
  }

  async remove(id: number): Promise<Observable<any>> {
   	const pattern = { cmd: DELETE_USER };
    const payload = {id}
    return this.userManagementClient.send( pattern, payload).toPromise();
  }
}