import { Injectable } from '@nestjs/common';
import { binh_luan, PrismaClient } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';

@Injectable()
export class BinhLuanService {
  private prisma: PrismaClient = new PrismaClient();

  async postBinhLuan(body: binh_luan): Promise<ResultDTO> {
    await this.prisma.binh_luan.create({
      data: { ...body, ngay_binh_luan: new Date(body.ngay_binh_luan) },
    });

    return { check: true, message: 'Thêm bình luận thành công!' };
  }

  async getBinhLuan(): Promise<ResultDTO> {
    let data = await this.prisma.binh_luan.findMany();

    return { check: true, message: 'Lấy dữ liệu thành công!', data };
  }

  async getBinhLuanId(id: number): Promise<ResultDTO> {
    let data = await this.prisma.binh_luan.findFirst({ where: { id } });

    if (data) {
      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Mã bình luận không tồn tại!' };
    }
  }

  async getBinhLuanTheoBaiViet(maBaiViet: number): Promise<ResultDTO> {
    let data = await this.prisma.bai_viet.findUnique({
      where: { id: maBaiViet },
      select: {
        id: true,
        tieu_de: true,
        binh_luan: {
          include: {
            nguoi_dung: true,
          },

          orderBy: {
            ngay_binh_luan: 'desc',
          },
        },
      },
    });

    if (data) {
      return {
        check: true,
        message: 'Lấy dữ liệu thành công!',
        data,
      };
    } else {
      return { check: false, message: 'Mã bài viết không tồn tại!' };
    }
  }

  async putBinhLuan(id: number, body: binh_luan): Promise<ResultDTO> {
    let checkId = await this.prisma.binh_luan.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.binh_luan.update({
        where: { id },
        data: { ...body, ngay_binh_luan: new Date(body.ngay_binh_luan) },
      });

      return { check: true, message: 'Cập nhật bình luận thành công!' };
    } else {
      return { check: false, message: 'Mã bình luận không tồn tại!' };
    }
  }

  async deleteBinhLuan(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.binh_luan.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.binh_luan.delete({ where: { id } });

      return { check: true, message: 'Xóa bình luận thành công!' };
    } else {
      return { check: false, message: 'Mã bình luận không tồn tại!' };
    }
  }
}
