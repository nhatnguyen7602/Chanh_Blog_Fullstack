import { Injectable } from '@nestjs/common';
import { PrismaClient, luu } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';

@Injectable()
export class LuuService {
  private prisma: PrismaClient = new PrismaClient();

  async postLuu({ ma_bai_viet, ma_nguoi_dung }): Promise<ResultDTO> {
    let checkSave = await this.prisma.luu.findFirst({
      where: { ma_bai_viet, ma_nguoi_dung },
    });

    if (!checkSave) {
      const data = await this.prisma.luu.create({
        data: { ma_bai_viet, ma_nguoi_dung },
      });

      return { check: true, message: 'Đã lưu thành công!', data };
    } else {
      return { check: false, message: 'Bài viết đã được lưu!' };
    }
  }

  async getLuu(): Promise<ResultDTO> {
    let data = await this.prisma.luu.findMany();

    return { check: true, message: 'Lấy dữ liệu thành công!', data };
  }

  async getLuuId(id: number): Promise<ResultDTO> {
    let data = await this.prisma.luu.findFirst({ where: { id } });

    if (data) {
      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Mã lưu không tồn tại!' };
    }
  }

  async getLuuMaNguoiDung(maNguoiDung: number): Promise<ResultDTO> {
    let checkNguoiDung = await this.prisma.nguoi_dung.findFirst({
      where: { id: maNguoiDung },
    });

    if (checkNguoiDung) {
      let data = await this.prisma.nguoi_dung.findFirst({
        where: { id: maNguoiDung },
        select: {
          id: true,
          email: true,
          nick_name: true,
          luu: {
            select: {
              id: true,
              ma_bai_viet: true,
              ma_nguoi_dung: true,
              bai_viet: true,
            },
          },
        },
      });

      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Mã người dùng không tồn tại!' };
    }
  }

  async getLuuMaBaiViet(maBaiViet: number): Promise<ResultDTO> {
    let checkBaiViet = await this.prisma.bai_viet.findFirst({
      where: { id: maBaiViet },
    });

    if (checkBaiViet) {
      let data = await this.prisma.bai_viet.findFirst({
        where: { id: maBaiViet },
        select: { id: true, tieu_de: true, luu: true },
      });

      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Mã bài viết không tồn tại!' };
    }
  }

  async putLuu(id: number, body: luu): Promise<ResultDTO> {
    let checkLuu = await this.prisma.luu.findFirst({
      where: { id },
    });

    if (checkLuu) {
      await this.prisma.luu.update({
        where: { id },
        data: body,
      });

      return { check: true, message: 'Cập nhật lưu thành công!' };
    } else {
      return { check: false, message: 'Mã lưu không tồn tại!' };
    }
  }

  async deleteLuu(id: number): Promise<ResultDTO> {
    let checkLuu = await this.prisma.luu.findFirst({
      where: { id },
    });

    if (checkLuu) {
      await this.prisma.luu.delete({ where: { id } });

      return { check: true, message: 'Xóa lưu thành công!' };
    } else {
      return { check: false, message: 'Mã lưu không tồn tại!' };
    }
  }

  async deleteLuuTheoBaiViet(
    idBaiViet: number,
    idNguoiDung: number,
  ): Promise<ResultDTO> {
    let checkLuu = await this.prisma.luu.findFirst({
      where: {
        ma_bai_viet: idBaiViet,
        ma_nguoi_dung: idNguoiDung,
      },
    });

    if (checkLuu) {
      await this.prisma.luu.delete({ where: { id: checkLuu.id } });

      return {
        check: true,
        message: `Xóa lưu thành công!`,
      };
    } else {
      return { check: false, message: 'Mã lưu không tồn tại!' };
    }
  }
}
