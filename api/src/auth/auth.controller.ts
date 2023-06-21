import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { nguoi_dung } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('dang-nhap')
  async dangNhap(@Body() body: nguoi_dung): Promise<ResultDTO> {
    const { email, pass_word } = body;

    let { check, message, data } = await this.authService.dangNhap(
      email,
      pass_word,
    );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @Post('dang-ky')
  async dangKy(@Body() body: nguoi_dung): Promise<ResultDTO> {
    let { check, message } = await this.authService.dangKy(body);

    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }
}
