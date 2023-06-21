import { http } from "./configURL";

export const serviceBinhLuan = {
  postBinhLuan: (data) => {
    let uri = `/api/binh-luan`;

    return http.post(uri, data);
  },

  getBinhLuanTheoBaiViet: (id) => {
    let uri = `/api/binh-luan/binh-luan-theo-bai-viet/${id}`;

    return http.get(uri);
  },

  putBinhLuan: (idComment, data) => {
    let uri = `/api/binh-luan/${idComment}`;

    return http.put(uri, data);
  },

  deleteBinhLuan: (id) => {
    let uri = `/api/binh-luan/${id}`;

    return http.delete(uri);
  },
};
