import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { serviceBaiViet } from "../../../../../services/serviceBaiViet";
import { getBaiVietTheoNguoiDungAction } from "../../../../../redux/actions/actionBlog";
import { Popconfirm } from "antd";
import { BsTrash } from "react-icons/bs";

const DeleteItem = ({ blogId }) => {
  const userId = useSelector((state) => state.reducerUser.userInfo?.id);

  const dispatch = useDispatch();

  const handleDelete = () => {
    serviceBaiViet
      .deleteBaiViet(blogId)
      .then(() => {
        dispatch(getBaiVietTheoNguoiDungAction(userId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Popconfirm
      title="Xóa bài viết"
      description="Bạn có chắc muốn xóa bài viết"
      onConfirm={handleDelete}
      okText="Có"
      cancelText="Hủy"
    >
      <button className="profile-blog__btn-delete">
        <BsTrash />
      </button>
    </Popconfirm>
  );
};

export default DeleteItem;
