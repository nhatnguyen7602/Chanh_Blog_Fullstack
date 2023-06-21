import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { bai_viet } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';
import { BaiVietService } from './bai_viet.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadDto } from 'src/dto/upload.dto';

@Controller('api/bai-viet')
export class BaiVietController {
  constructor(private baiVietService: BaiVietService) {}

  @UseGuards(AuthGuard('user'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/img',
        filename(req, file, callback) {
          let date = new Date();

          callback(null, `${date.getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Post('upload-img-bai-viet')
  async postHinhAnh(@UploadedFile() file: UploadDto) {
    return { url: `${file.destination}/${file.filename}` };
  }

  @UseGuards(AuthGuard('user'))
  @UseInterceptors(
    FileInterceptor('hinh_anh', {
      storage: diskStorage({
        destination: './public/img',
        filename(req, file, callback) {
          let date = new Date();

          callback(null, `${date.getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Post()
  async postBaiViet(
    @Body() body: bai_viet,
    @UploadedFile() hinh_anh: UploadDto,
  ): Promise<ResultDTO> {
    let { check, message } = await this.baiVietService.postBaiViet(
      body,
      hinh_anh,
    );
    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getBaiViet(): Promise<ResultDTO> {
    let { check, message, data } = await this.baiVietService.getBaiViet();

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getBaiVietId(@Param('id') id: string): Promise<ResultDTO> {
    let { check, message, data } = await this.baiVietService.getBaiVietId(+id);

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('lay-bai-viet-theo-nguoi-viet/:MaNguoiViet')
  async getBaiVietTheoNguoiViet(
    @Param('MaNguoiViet') MaNguoiViet: string,
  ): Promise<ResultDTO> {
    let { check, message, data } =
      await this.baiVietService.getBaiVietTheoNguoiViet(+MaNguoiViet);

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Get('lay-bai-viet-theo-ten/:TenBaiViet')
  async getBaiVietTheoTen(
    @Param('TenBaiViet') tenBaiViet: string,
  ): Promise<ResultDTO> {
    let { check, message, data } = await this.baiVietService.getBaiVietTheoTen(
      tenBaiViet,
    );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @UseInterceptors(
    FileInterceptor('hinh_anh', {
      storage: diskStorage({
        destination: './public/img',
        filename(req, file, callback) {
          let date = new Date();

          callback(null, `${date.getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Put('/:id')
  async putBaiViet(
    @Param('id') id: string,
    @Body() body: bai_viet,
    @UploadedFile() hinh_anh?: UploadDto,
  ): Promise<ResultDTO> {
    let { check, message } = await this.baiVietService.putBaiViet(
      +id,
      body,
      hinh_anh,
    );

    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Delete('/:id')
  async deleteBaiViet(@Param('id') id: string): Promise<ResultDTO> {
    let { check, message } = await this.baiVietService.deleteBaiViet(+id);

    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }
}
