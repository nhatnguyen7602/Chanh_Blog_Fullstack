import { http } from "./configURL";

export const serviceBaiViet = {
  postAnh: (dataForm) => {
    let uri = `/api/bai-viet/upload-img-bai-viet`;

    return http.post(uri, dataForm);
  },

  postBaiViet: (baiViet) => {
    let uri = `/api/bai-viet`;

    return http.post(uri, baiViet);
  },

  getList: () => {
    let uri = `/api/bai-viet`;

    return http.get(uri);
  },

  getBaiViet: (id) => {
    let uri = `/api/bai-viet/${id}`;

    return http.get(uri);
  },

  getBaiVietTheoUser: (idUser) => {
    let uri = `/api/bai-viet/lay-bai-viet-theo-nguoi-viet/${idUser}`;

    return http.get(uri);
  },

  getSearch: (keyword) => {
    let uri = `/api/bai-viet/lay-bai-viet-theo-ten/${keyword}`;

    return http.get(uri);
  },

  putBaiViet: (idBaiViet, dataForm) => {
    let uri = `/api/bai-viet/${idBaiViet}`;

    return http.put(uri, dataForm);
  },

  deleteBaiViet: (idBaiViet) => {
    let uri = `/api/bai-viet/${idBaiViet}`;

    return http.delete(uri);
  },
};
