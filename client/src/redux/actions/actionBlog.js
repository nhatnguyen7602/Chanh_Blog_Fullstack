import { serviceBaiViet } from "../../services/serviceBaiViet";
import { serviceLuu } from "../../services/serviceLuu";
import {
  SET_BLOG,
  SET_BLOGS_SAVE,
  SET_BLOGS_WRITE,
} from "../constants/constantBlog";

const setBlog = (payload) => {
  return { type: SET_BLOG, payload };
};

const setBlogsWrite = (payload) => {
  return { type: SET_BLOGS_WRITE, payload };
};

const setBlogsSave = (payload) => {
  return { type: SET_BLOGS_SAVE, payload };
};

export const getBaiVietAction = (idBaiViet) => (dispatch) => {
  serviceBaiViet
    .getBaiViet(idBaiViet)
    .then((res) => {
      dispatch(setBlog(res.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getBaiVietTheoNguoiDungAction = (idNguoiDung) => (dispatch) => {
  serviceBaiViet
    .getBaiVietTheoUser(idNguoiDung)
    .then((res) => {
      dispatch(setBlogsWrite(res.data.data.bai_viet));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getLuuTheoNguoiDungAction = (idNguoiDung) => (dispatch) => {
  serviceLuu
    .getLuuTheoNguoiDung(idNguoiDung)
    .then((res) => {
      dispatch(setBlogsSave(res.data.data.luu.map((item) => item.bai_viet)));
    })
    .catch((err) => {
      console.log(err);
    });
};
