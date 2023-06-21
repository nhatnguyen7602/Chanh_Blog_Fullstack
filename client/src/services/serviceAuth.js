import axios from "axios";
import { BASE_URL } from "./configURL";

export const serviceAuth = {
  login: (data) => {
    return axios({
      url: `${BASE_URL}/api/auth/dang-nhap`,
      method: "POST",
      data,
    });
  },

  register: (data) => {
    return axios({ url: `${BASE_URL}/api/auth/dang-ky`, method: "POST", data });
  },
};
