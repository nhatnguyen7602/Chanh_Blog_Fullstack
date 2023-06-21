import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NguoiDungModule } from './nguoi_dung/nguoi_dung.module';
import { BaiVietModule } from './bai_viet/bai_viet.module';
import { ThichModule } from './thich/thich.module';
import { BinhLuanModule } from './binh_luan/binh_luan.module';
import { LuuModule } from './luu/luu.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    NguoiDungModule,
    BaiVietModule,
    ThichModule,
    BinhLuanModule,
    LuuModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
