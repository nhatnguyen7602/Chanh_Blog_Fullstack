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
  Query,
  UseGuards,
} from '@nestjs/common';
import { LuuService } from './luu.service';
import { AuthGuard } from '@nestjs/passport';
import { luu } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';

@Controller('api/luu')
export class LuuController {
  constructor(private luuService: LuuService) {}

  @UseGuards(AuthGuard('user'))
  @Post()
  async postLuu(@Body() body: luu): Promise<ResultDTO> {
    let { check, message, data } = await this.luuService.postLuu(body);

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('admin'))
  @Get()
  async getLuu(): Promise<ResultDTO> {
    let { check, message, data } = await this.luuService.getLuu();

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Get('/:id')
  async getLuuId(@Param('id') id: string): Promise<ResultDTO> {
    let { check, message, data } = await this.luuService.getLuuId(+id);

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('luu-theo-nguoi-dung/:MaNguoiDung')
  async getLuuMaNguoiDung(
    @Param('MaNguoiDung') maNguoiDung: string,
  ): Promise<ResultDTO> {
    let { check, message, data } = await this.luuService.getLuuMaNguoiDung(
      +maNguoiDung,
    );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('luu-theo-bai-viet/:MaBaiViet')
  async getLuuMaBaiViet(
    @Param('MaBaiViet') maBaiViet: string,
  ): Promise<ResultDTO> {
    let { check, message, data } = await this.luuService.getLuuMaBaiViet(
      +maBaiViet,
    );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('admin'))
  @Put('/:id')
  async putLuu(@Param('id') id: string, @Body() body: luu): Promise<ResultDTO> {
    let { check, message } = await this.luuService.putLuu(+id, body);

    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Delete('xoa-luu-theo-bai-viet')
  async deleteLuuTheoBaiViet(
    @Query('idBaiViet') idBaiViet: string,
    @Query('idNguoiDung') idNguoiDung: string,
  ): Promise<ResultDTO> {
    let { check, message } = await this.luuService.deleteLuuTheoBaiViet(
      +idBaiViet,
      +idNguoiDung,
    );

    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Delete('/:id')
  async deleteLuu(@Param('id') id: string): Promise<ResultDTO> {
    let { check, message } = await this.luuService.deleteLuu(+id);

    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }
}
