import { Module } from '@nestjs/common';
import { LuuController } from './luu.controller';
import { LuuService } from './luu.service';

@Module({
  controllers: [LuuController],
  providers: [LuuService]
})
export class LuuModule {}
