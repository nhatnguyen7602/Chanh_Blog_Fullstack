import { http } from "./configURL";

export const serviceUser = {
  getIdUser: (id) => {
    let uri = `/api/nguoi-dung/${id}`;

    return http.get(uri);
  },

  putNoAvatar: (id, dataUser) => {
    let uri = `/api/nguoi-dung/${id}`;

    return http.put(uri, dataUser);
  },

  postAvatar: (dataUser) => {
    let uri = `/api/nguoi-dung/upload-avatar`;

    return http.post(uri, dataUser);
  },
};
