import React, { useEffect } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { changeDate } from "../../utils/changeDate";
import { Link, useParams } from "react-router-dom";
import ActionBar from "./ActionBar/ActionBar";
import { getBaiVietAction } from "../../redux/actions/actionBlog";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../services/configURL";
import parse from "html-react-parser";

const BlogPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const baiViet = useSelector((state) => state.reducerBlog?.blog);

  useEffect(() => {
    dispatch(getBaiVietAction(id));
  }, []);

  return (
    <div className="blog">
      <h2 className="blog__header">{baiViet.tieu_de}</h2>

      <div className="blog__author">
        <Link to={`/profile/${baiViet.nguoi_dung?.id}`}>
          <Avatar
            className="blog__author-avatar"
            icon={<UserOutlined />}
            src={`${BASE_URL}/${baiViet.nguoi_dung?.avatar}`}
          />
        </Link>

        <div className="ml-4">
          <div className="blog__author-name">
            {baiViet.nguoi_dung?.nick_name}
          </div>

          <div className="blog__author-date">{changeDate(baiViet.ngay)}</div>
        </div>
      </div>

      {baiViet.hinh_anh && <img src={`${BASE_URL}/${baiViet.hinh_anh}`} />}

      <div className="blog__content-item">{parse(`${baiViet.noi_dung}`)}</div>

      <ActionBar />
    </div>
  );
};

export default BlogPage;
