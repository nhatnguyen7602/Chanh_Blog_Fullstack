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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { binh_luan } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';
import { BinhLuanService } from './binh_luan.service';

@Controller('api/binh-luan')
export class BinhLuanController {
  constructor(private binhLuanService: BinhLuanService) {}

  @UseGuards(AuthGuard('user'))
  @Post()
  async postBinhLuan(@Body() body: binh_luan): Promise<ResultDTO> {
    let { check, message } = await this.binhLuanService.postBinhLuan(body);

    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Get()
  async getBinhLuan(): Promise<ResultDTO> {
    let { check, message, data } = await this.binhLuanService.getBinhLuan();

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Get('/:id')
  async getBinhLuanId(@Param('id') id: string): Promise<ResultDTO> {
    let { check, message, data } = await this.binhLuanService.getBinhLuanId(
      +id,
    );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('binh-luan-theo-bai-viet/:MaBaiViet')
  async getBinhLuanTheoBaiViet(
    @Param('MaBaiViet') maBaiViet: string,
  ): Promise<ResultDTO> {
    let { check, message, data } =
      await this.binhLuanService.getBinhLuanTheoBaiViet(+maBaiViet);

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Put('/:id')
  async putBinhLuan(
    @Param('id') id: string,
    @Body() body: binh_luan,
  ): Promise<ResultDTO> {
    let { check, message, data } = await this.binhLuanService.putBinhLuan(
      +id,
      body,
    );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Delete('/:id')
  async deleteBinhLuan(@Param('id') id: string): Promise<ResultDTO> {
    let { check, message, data } = await this.binhLuanService.deleteBinhLuan(
      +id,
    );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }
}
