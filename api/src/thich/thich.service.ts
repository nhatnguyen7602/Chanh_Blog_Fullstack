import { Injectable } from '@nestjs/common';
import { PrismaClient, thich } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';

@Injectable()
export class ThichService {
  private prisma: PrismaClient = new PrismaClient();

  async postThich({
    ma_bai_viet,
    ma_nguoi_dung,
    ngay_thich,
  }): Promise<ResultDTO> {
    let checkLike = await this.prisma.thich.findFirst({
      where: { ma_bai_viet, ma_nguoi_dung },
    });

    if (!checkLike) {
      const data = await this.prisma.thich.create({
        data: { ma_bai_viet, ma_nguoi_dung, ngay_thich: new Date(ngay_thich) },
      });

      return { check: true, message: 'Đã thích thành công!', data };
    } else {
      return { check: false, message: 'Bài viết đã được thích!' };
    }
  }

  async getThich(): Promise<ResultDTO> {
    let data = await this.prisma.thich.findMany();

    return { check: true, message: 'Lấy dữ liệu thành công!', data };
  }

  async getThichId(id: number): Promise<ResultDTO> {
    let data = await this.prisma.thich.findFirst({ where: { id } });

    if (data) {
      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Mã lượt thích không tồn tại!' };
    }
  }

  async getThichMaBaiViet(maBaiViet: number): Promise<ResultDTO> {
    let checkBaiViet = await this.prisma.bai_viet.findFirst({
      where: { id: maBaiViet },
    });

    if (checkBaiViet) {
      let data = await this.prisma.bai_viet.findFirst({
        where: { id: maBaiViet },
        select: { id: true, tieu_de: true, thich: true },
      });

      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Mã bài viết không tồn tại!' };
    }
  }

  async getBaiVietNguoiDungThich(maNguoiDung: number): Promise<ResultDTO> {
    let checkNguoiDung = await this.prisma.nguoi_dung.findFirst({
      where: { id: maNguoiDung },
    });

    if (checkNguoiDung) {
      let data = await this.prisma.nguoi_dung.findUnique({
        where: { id: maNguoiDung },
        select: {
          id: true,
          nick_name: true,
          thich: { select: { id: true, ngay_thich: true, bai_viet: true } },
        },
      });

      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Mã bài viết không tồn tại!' };
    }
  }

  async getThichTheoNguoiDungVaBaiViet(
    idBaiViet: number,
    idNguoiDung: number,
  ): Promise<ResultDTO> {
    let data = await this.prisma.thich.findFirst({
      where: { ma_nguoi_dung: idNguoiDung, ma_bai_viet: idBaiViet },
    });

    if (data) {
      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return {
        check: false,
        message: 'Mã người dùng hoặc bài viết không tồn tại!',
      };
    }
  }

  async putThich(id: number, body: thich): Promise<ResultDTO> {
    let checkThich = await this.prisma.thich.findFirst({
      where: { id },
    });

    if (checkThich) {
      await this.prisma.thich.update({
        where: { id },
        data: { ...body, ngay_thich: new Date(body.ngay_thich) },
      });

      return { check: true, message: 'Cập nhật lượt thích thành công!' };
    } else {
      return { check: false, message: 'Mã lượt thích không tồn tại!' };
    }
  }

  async deleteThich(id: number): Promise<ResultDTO> {
    let checkThich = await this.prisma.thich.findFirst({
      where: { id },
    });

    if (checkThich) {
      await this.prisma.thich.delete({ where: { id } });

      return { check: true, message: 'Xóa lượt thích thành công!' };
    } else {
      return { check: false, message: 'Mã lượt thích không tồn tại!' };
    }
  }
}
