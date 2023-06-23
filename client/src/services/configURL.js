import axios from "axios";
import { serviceLocalStorage } from "./serviceLocalStorage";

export const BASE_URL = "https://api.nhatnguyen.click";

const http = axios.create({
  baseURL: BASE_URL,
});

export function setAuthorization(token) {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
}

setAuthorization(serviceLocalStorage.userInfo.getToken());

export { http };
