import React from "react";
import { changeDate } from "../../utils/changeDate";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../services/configURL";
import parse from "html-react-parser";

const ItemBlogHome = ({ baiViet }) => {
  return (
    <div className="blog">
      <h2 className="blog__header">{baiViet.tieu_de}</h2>

      <div className="blog__author">
        <Link to={`/profile/${baiViet.nguoi_dung.id}`}>
          <Avatar
            className="blog__author-avatar"
            icon={<UserOutlined />}
            src={`${BASE_URL}/${baiViet.nguoi_dung.avatar}`}
          />
        </Link>

        <div className="ml-4">
          <div className="blog__author-name">
            {baiViet.nguoi_dung.nick_name}
          </div>

          <div className="blog__author-date">{changeDate(baiViet.ngay)}</div>
        </div>
      </div>

      {baiViet.hinh_anh && (
        <img className="blog__img" src={`${BASE_URL}/${baiViet.hinh_anh}`} />
      )}

      <div className="blog__content">{parse(`${baiViet.noi_dung}`)}</div>

      <Link to={`/blog/${baiViet.id}`}>
        <div className="blog__read">Đọc tiếp</div>
      </Link>
    </div>
  );
};

export default ItemBlogHome;
