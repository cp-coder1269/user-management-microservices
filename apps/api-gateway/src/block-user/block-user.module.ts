import { Module } from '@nestjs/common';
import { BlockUserService } from './block-user.service';
import { BlockUserController } from './block-user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure the ConfigModule is imported if not already
    ClientsModule.registerAsync([
      {
        name: 'BLOCK_USER',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get<number>('USER_MANAGEMENT_PORT') || 3002,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [BlockUserController],
  providers: [BlockUserService],
})
export class BlockUserModule {}
