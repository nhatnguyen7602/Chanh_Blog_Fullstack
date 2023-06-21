import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { nguoi_dung, PrismaClient } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  private prisma: PrismaClient = new PrismaClient();

  async dangNhap(email: string, pass_word: string): Promise<ResultDTO> {
    let checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: { email },
    });

    if (checkEmail) {
      if (checkEmail.pass_word === pass_word) {
        let token_user = this.jwt.sign(checkEmail, {
          expiresIn: '10d',
          secret: this.config.get('SECRET_KEY'),
        });

        return {
          check: true,
          message: 'Đăng nhập thành công!',
          data: { ...checkEmail, token_user },
        };
      } else {
        return { check: false, message: 'Mật khẩu sai!' };
      }
    } else {
      return { check: false, message: 'Email sai!' };
    }
  }

  async dangKy(body: nguoi_dung): Promise<ResultDTO> {
    let { email } = body;

    let checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: { email },
    });

    if (checkEmail) {
      return { check: false, message: 'Email đã tồn tại!' };
    } else {
      await this.prisma.nguoi_dung.create({ data: body });

      return { check: true, message: 'Đăng ký thành công!' };
    }
  }
}
