import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { DbConfigModule } from '@app/common-config/config/dbconfig.module';
import { User } from '@app/common-config/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BlockUserModule } from './block-user/block-user.module';
import { CacheConfigModule } from '@app/common-config/config/cacheconfig.module';

@Module({
  imports: [
    DbConfigModule,
    CacheConfigModule,
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UsersModule,
    BlockUserModule,
    ConfigModule.forRoot(),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
