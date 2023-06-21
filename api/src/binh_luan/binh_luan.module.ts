import { Module } from '@nestjs/common';
import { BinhLuanController } from './binh_luan.controller';
import { BinhLuanService } from './binh_luan.service';

@Module({
  controllers: [BinhLuanController],
  providers: [BinhLuanService]
})
export class BinhLuanModule {}
