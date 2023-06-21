import { http } from "./configURL";

export const serviceThich = {
  postThich: (data) => {
    let uri = `/api/thich`;

    return http.post(uri, data);
  },

  getThichTheoBaiViet: (id) => {
    let uri = `/api/thich/thich-theo-bai-viet/${id}`;

    return http.get(uri);
  },

  deleteThich: (id) => {
    let uri = `/api/thich/${id}`;

    return http.delete(uri);
  },
};
