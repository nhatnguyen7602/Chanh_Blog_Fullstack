import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserStrategy } from 'src/strategy/user.strategy';
import { AdminStrategy } from 'src/strategy/admin.strategy';
import { NguoiDungController } from './nguoi_dung.controller';
import { NguoiDungService } from './nguoi_dung.service';

@Module({
  imports: [JwtModule.register({}), PassportModule.register({})],
  controllers: [NguoiDungController],
  providers: [NguoiDungService, UserStrategy, AdminStrategy],
})
export class NguoiDungModule {}
