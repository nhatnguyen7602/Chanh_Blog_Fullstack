import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { nguoi_dung } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';
import { NguoiDungService } from './nguoi_dung.service';
import { UploadDto } from 'src/dto/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/nguoi-dung')
export class NguoiDungController {
  constructor(private nguoiDungService: NguoiDungService) {}

  @UseGuards(AuthGuard('admin'))
  @Post()
  async postNguoiDung(@Body() body: nguoi_dung): Promise<ResultDTO> {
    let { check, message } = await this.nguoiDungService.postNguoiDung(body);

    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/img',
        filename(req, file, callback) {
          let date = new Date();

          callback(null, `${date.getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Post('upload-avatar')
  async postAvatar(
    @Body() body: nguoi_dung,
    @UploadedFile() avatar: UploadDto,
  ): Promise<ResultDTO> {
    let { check, message, data } = await this.nguoiDungService.postAvatar(
      body,
      avatar,
    );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('admin'))
  @Get()
  async getNguoiDung(): Promise<ResultDTO> {
    let { check, message, data } = await this.nguoiDungService.getNguoiDung();

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getNguoiDungId(@Param('id') id: string): Promise<ResultDTO> {
    let { check, message, data } = await this.nguoiDungService.getNguoiDungId(
      +id,
    );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Put('/:id')
  async putNguoiDung(
    @Param('id') id: string,
    @Body() body: nguoi_dung,
  ): Promise<ResultDTO> {
    let { check, message, data } = await this.nguoiDungService.putNguoiDung(
      +id,
      body,
    );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('admin'))
  @Delete('/:id')
  async deleteNguoiDung(@Param('id') id: string): Promise<ResultDTO> {
    let { check, message } = await this.nguoiDungService.deleteNguoiDung(+id);

    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }
}
