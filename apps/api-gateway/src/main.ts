import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // Enable CORS if necessary
  app.enableCors({
    origin: '*', // Allow all origins or specify the required origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(3000, () => console.log('API Gateway is listening on port 3000'));
}
bootstrap();
