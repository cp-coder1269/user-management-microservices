import { NestFactory } from '@nestjs/core';
import { BlockUserModule } from './block-user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(BlockUserModule, {
    transport: Transport.TCP,
    options: {
      port: 3002,
    },
  });

  await app.listen();
  console.log('Block User Microservice is listening on port 3002');
}
bootstrap();

