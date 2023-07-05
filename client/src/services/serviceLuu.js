import { http } from "./configURL";

export const serviceLuu = {
  postLuu: (data) => {
    let uri = `/api/luu`;

    return http.post(uri, data);
  },

  getLuuTheoId: (id) => {
    let uri = `/api/luu/${id}`;

    return http.get(uri);
  },

  getLuuTheoNguoiDung: (id) => {
    let uri = `/api/luu/luu-theo-nguoi-dung/${id}`;

    return http.get(uri);
  },

  getLuuTheoBaiViet: (id) => {
    let uri = `/api/luu/luu-theo-bai-viet/${id}`;

    return http.get(uri);
  },

  deleteLuuTheoBaiViet: (idBaiViet, idNguoiDung) => {
    let uri = `/api/luu/xoa-luu-theo-bai-viet`;

    return http.delete(uri, { params: { idBaiViet, idNguoiDung } });
  },

  deleteLuu: (id) => {
    let uri = `/api/luu/${id}`;

    return http.delete(uri);
  },
};
