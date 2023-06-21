import React, { useEffect } from "react";
import ItemBlog from "./ItemBlog/ItemBlog";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBaiVietTheoNguoiDungAction,
  getLuuTheoNguoiDungAction,
} from "../../../redux/actions/actionBlog";
import { List } from "antd";

const ListBlog = ({ blogSave }) => {
  const { id } = useParams();

  const blogsSave = useSelector((state) => state.reducerBlog.blogsSave);
  const blogsWrite = useSelector((state) => state.reducerBlog.blogsWrite);

  const dispatch = useDispatch();

  const renderBlog = () =>
    blogSave ? (
      <List
        pagination={{
          pageSize: 3,
          align: "center",
        }}
        dataSource={blogsSave}
        renderItem={(blog) => <ItemBlog key={blog.id} blog={blog} blogSave />}
      />
    ) : (
      <List
        pagination={{
          pageSize: 3,
          align: "center",
        }}
        dataSource={blogsWrite}
        renderItem={(blog) => <ItemBlog key={blog.id} blog={blog} />}
      />
    );

  useEffect(() => {
    blogSave
      ? dispatch(getLuuTheoNguoiDungAction(id))
      : dispatch(getBaiVietTheoNguoiDungAction(id));
  }, []);

  return <div className="profile-list-blog">{renderBlog()}</div>;
};

export default ListBlog;
