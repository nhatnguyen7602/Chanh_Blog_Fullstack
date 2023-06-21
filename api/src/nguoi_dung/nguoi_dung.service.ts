import { Injectable } from '@nestjs/common';
import { nguoi_dung, PrismaClient } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';
import { UploadDto } from 'src/dto/upload.dto';

@Injectable()
export class NguoiDungService {
  private prisma: PrismaClient = new PrismaClient();

  async postNguoiDung(body: nguoi_dung): Promise<ResultDTO> {
    let { email } = body;

    let checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: { email },
    });

    if (checkEmail) {
      return { check: false, message: 'Email đã tồn tại!' };
    } else {
      await this.prisma.nguoi_dung.create({ data: body });

      return { check: true, message: 'Thêm người dùng thành công!' };
    }
  }

  async postAvatar(body: nguoi_dung, avatar: UploadDto): Promise<ResultDTO> {
    const data = await this.prisma.nguoi_dung.update({
      where: { id: +body.id },
      data: {
        ...body,
        id: +body.id,
        avatar: `${avatar.destination}/${avatar.filename}`,
      },
    });

    return { check: true, message: 'Cập nhật thành công!', data };
  }

  async getNguoiDung(): Promise<ResultDTO> {
    let data = await this.prisma.nguoi_dung.findMany();

    return { check: true, message: 'Lấy dữ liệu thành công!', data };
  }

  async getNguoiDungId(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.nguoi_dung.findFirst({
      where: { id },
    });

    if (checkId) {
      let data = await this.prisma.nguoi_dung.findFirst({ where: { id } });

      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Id không tồn tại!' };
    }
  }

  async putNguoiDung(id: number, body: nguoi_dung): Promise<ResultDTO> {
    let checkId = await this.prisma.nguoi_dung.findFirst({
      where: { id },
    });

    if (checkId) {
      const data = await this.prisma.nguoi_dung.update({
        where: { id },
        data: body,
      });

      return { check: true, message: 'Cập nhật người dùng thành công!', data };
    } else {
      return { check: false, message: 'Id không tồn tại!' };
    }
  }

  async deleteNguoiDung(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.nguoi_dung.findFirst({
      where: { id },
    });

    if (checkId) {
      await this.prisma.nguoi_dung.delete({ where: { id } });

      return { check: true, message: 'Xóa người dùng thành công!' };
    } else {
      return { check: false, message: 'Id không tồn tại!' };
    }
  }
}
