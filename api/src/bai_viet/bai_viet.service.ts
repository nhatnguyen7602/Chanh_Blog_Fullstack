import { Injectable } from '@nestjs/common';
import { bai_viet, PrismaClient } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';
import { UploadDto } from 'src/dto/upload.dto';

@Injectable()
export class BaiVietService {
  private prisma: PrismaClient = new PrismaClient();

  async postBaiViet(body: bai_viet, hinh_anh: UploadDto): Promise<ResultDTO> {
    const data = {
      ...body,
      hinh_anh: `${hinh_anh.destination}/${hinh_anh.filename}`,
      ngay: new Date(body.ngay),
      nguoi_viet_id: +body.nguoi_viet_id,
    };

    await this.prisma.bai_viet.create({
      data,
    });

    return { check: true, message: 'Đăng bài viết thành công!' };
  }

  async getBaiViet(): Promise<ResultDTO> {
    let data = await this.prisma.bai_viet.findMany({
      select: {
        id: true,
        tieu_de: true,
        hinh_anh: true,
        noi_dung: true,
        ngay: true,
        nguoi_dung: true,
      },
      orderBy: {
        ngay: 'desc',
      },
    });

    return { check: true, message: 'Lấy dữ liệu thành công!', data };
  }

  async getBaiVietId(id: number): Promise<ResultDTO> {
    let data = await this.prisma.bai_viet.findFirst({
      where: { id },
      select: {
        id: true,
        tieu_de: true,
        hinh_anh: true,
        noi_dung: true,
        ngay: true,
        nguoi_viet_id: true,
        nguoi_dung: true,
      },
    });

    if (data) {
      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Id bài viết không tồn tại!' };
    }
  }

  async getBaiVietTheoNguoiViet(MaNguoiViet: number): Promise<ResultDTO> {
    let data = await this.prisma.nguoi_dung.findFirst({
      where: { id: MaNguoiViet },
      select: {
        id: true,
        nick_name: true,
        bai_viet: { orderBy: { ngay: 'desc' } },
      },
    });

    if (data) {
      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Id người dùng không tồn tại!' };
    }
  }

  async getBaiVietTheoTen(tenBaiViet: string): Promise<ResultDTO> {
    let data = await this.prisma.bai_viet.findMany({
      where: { tieu_de: { contains: tenBaiViet } },
      select: {
        id: true,
        tieu_de: true,
        hinh_anh: true,
        noi_dung: true,
        ngay: true,
        nguoi_dung: true,
      },
      orderBy: {
        ngay: 'desc',
      },
    });

    return { check: true, message: 'Lấy dữ liệu thành công!', data };
  }

  async putBaiViet(
    id: number,
    body: bai_viet,
    hinh_anh: UploadDto,
  ): Promise<ResultDTO> {
    let data: any = {
      ...body,
      ngay: new Date(body.ngay),
      nguoi_viet_id: +body.nguoi_viet_id,
    };

    if (hinh_anh !== undefined) {
      data.hinh_anh = `${hinh_anh.destination}/${hinh_anh.filename}`;
    }

    let checkId = await this.prisma.bai_viet.findFirst({
      where: { id },
    });

    if (checkId) {
      await this.prisma.bai_viet.update({
        where: { id },
        data,
      });

      return { check: true, message: 'Cập nhật bài viết thành công!' };
    } else {
      return { check: false, message: 'Id bài viết không tồn tại!' };
    }
  }

  async deleteBaiViet(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.bai_viet.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.bai_viet.delete({ where: { id } });

      return { check: true, message: 'Xóa bài viết thành công!' };
    } else {
      return { check: false, message: 'Id bài viết không tồn tại!' };
    }
  }
}
