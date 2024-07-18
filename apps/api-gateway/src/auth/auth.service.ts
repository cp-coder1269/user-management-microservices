import { User } from '@app/common-config/entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}



  async signIn(username: string, birthdate: string):Promise<{ access_token: string }>{
    let user = await this.cacheService.get<User>(username);
    if (!user) {
      user = await this.userRepository.findOneBy({ username });
      await this.cacheService.set(username, user);
    }else{
        console.log(`User: ${user.username} logged in using cached data`);
        
    }
    
    if (user?.birthdate !== birthdate || user?.username !== username) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async findAll() {
    return await this.userRepository.find();
  }
}