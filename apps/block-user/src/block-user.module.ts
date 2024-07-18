import { Module } from '@nestjs/common';
import { BlockUserController } from './block-user.controller';
import { BlockUserService } from './block-user.service';
import { DbConfigModule } from '@app/common-config/config/dbconfig.module';
import { BlockUser } from '@app/common-config/entities/block-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DbConfigModule,
    TypeOrmModule.forFeature([BlockUser]),
  ],
  controllers: [BlockUserController],
  providers: [BlockUserService],
})
export class BlockUserModule {}
