import { Module } from '@nestjs/common';
import { BaiVietController } from './bai_viet.controller';
import { BaiVietService } from './bai_viet.service';

@Module({
  controllers: [BaiVietController],
  providers: [BaiVietService]
})
export class BaiVietModule {}
