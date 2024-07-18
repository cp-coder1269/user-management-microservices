import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd:"hello"})
  getHello(): string {
    throw new Error('Method not implemented.');
    return this.appService.getHello();
  }
}
