import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsBookmarkDash } from "react-icons/bs";
import { serviceLuu } from "../../../../../services/serviceLuu";
import { getLuuTheoNguoiDungAction } from "../../../../../redux/actions/actionBlog";
import { Popconfirm } from "antd";

const BookmarkOffItem = ({ blogId }) => {
  const userInfo = useSelector((state) => state.reducerUser.userInfo);

  const dispatch = useDispatch();

  const handleBookmarkOff = () => {
    serviceLuu
      .deleteLuuTheoBaiViet(blogId, userInfo.id)
      .then((res) => {
        dispatch(getLuuTheoNguoiDungAction(userInfo.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Popconfirm
      title="Bỏ lưu bài viết"
      description="Bạn có chắc muốn bỏ lưu bài viết"
      onConfirm={handleBookmarkOff}
      okText="Có"
      cancelText="Hủy"
    >
      <button className="profile-blog__btn-delete">
        <BsBookmarkDash />
      </button>
    </Popconfirm>
  );
};

export default BookmarkOffItem;
