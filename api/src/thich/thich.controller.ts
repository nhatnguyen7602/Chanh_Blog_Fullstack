import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Body,
  Put,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { thich } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';
import { ThichService } from './thich.service';

@Controller('api/thich')
export class ThichController {
  constructor(private thichService: ThichService) {}

  @UseGuards(AuthGuard('user'))
  @Post()
  async postThich(@Body() body: thich): Promise<ResultDTO> {
    let { check, message, data } = await this.thichService.postThich(body);

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('admin'))
  @Get()
  async getThich(): Promise<ResultDTO> {
    let { check, message, data } = await this.thichService.getThich();

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Get('/:id')
  async getThichId(@Param('id') id: string): Promise<ResultDTO> {
    let { check, message, data } = await this.thichService.getThichId(+id);

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('thich-theo-bai-viet/:MaBaiViet')
  async getThichMaBaiViet(
    @Param('MaBaiViet') maBaiViet: string,
  ): Promise<ResultDTO> {
    let { check, message, data } = await this.thichService.getThichMaBaiViet(
      +maBaiViet,
    );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Get('bai-viet-nguoi-dung-thich/:MaNguoiDung')
  async getBaiVietNguoiDungThich(
    @Param('MaNguoiDung') maNguoiDung: string,
  ): Promise<ResultDTO> {
    let { check, message, data } =
      await this.thichService.getBaiVietNguoiDungThich(+maNguoiDung);

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Get('thich-theo-nguoi-dung-va-bai-viet/:idBaiViet/:idNguoiDung')
  async getThichTheoNguoiDungVaBaiViet(
    @Param('idBaiViet') idBaiViet: string,
    @Param('idNguoiDung') idNguoiDung: string,
  ): Promise<ResultDTO> {
    let { check, message, data } =
      await this.thichService.getThichTheoNguoiDungVaBaiViet(
        +idBaiViet,
        +idNguoiDung,
      );

    if (check) {
      throw new HttpException({ message, data }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('admin'))
  @Put('/:id')
  async putThich(
    @Param('id') id: string,
    @Body() body: thich,
  ): Promise<ResultDTO> {
    let { check, message } = await this.thichService.putThich(+id, body);

    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('user'))
  @Delete('/:id')
  async deleteThich(@Param('id') id: string): Promise<ResultDTO> {
    let { check, message } = await this.thichService.deleteThich(+id);

    if (check) {
      throw new HttpException({ message }, HttpStatus.OK);
    } else {
      throw new HttpException({ message }, HttpStatus.NOT_FOUND);
    }
  }
}
