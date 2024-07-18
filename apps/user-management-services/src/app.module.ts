import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DbConfigModule } from '@app/common-config/config/dbconfig.module';
import { CacheConfigModule } from '@app/common-config/config/cacheconfig.module';

@Module({
  imports: [
    UsersModule,
    DbConfigModule,
    CacheConfigModule
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
