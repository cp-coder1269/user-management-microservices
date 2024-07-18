import { User } from '@app/common-config/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
    ) {}



  async signIn(username: string, birthdate: string):Promise<{ access_token: string }>{
    const user = await this.userRepository.findOneBy({ username });
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