import React from "react";
import { changeDate } from "../../../../utils/changeDate";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ActionBarItem from "./ActionBarItem.jsx/ActionBarItem";
import { BASE_URL } from "../../../../services/configURL";

const ItemBlog = ({ blog, blogSave }) => {
  const { id } = useParams();

  const userLogin = useSelector((state) => state.reducerUser.userInfo);

  const isMyProfile = +id === userLogin?.id;

  return (
    <div className="profile-blog">
      <Link to={`/blog/${blog.id}`} className="profile-blog__img">
        <img src={`${BASE_URL}/${blog.hinh_anh}`} />
      </Link>

      <div className="profile-blog__content">
        <Link to={`/blog/${blog.id}`} className="profile-blog__header">
          {blog.tieu_de}
        </Link>

        <div className="profile-blog__footer">
          <span>{changeDate(blog.ngay)}</span>

          {isMyProfile ? (
            blogSave ? (
              <ActionBarItem blogId={blog.id} bookmarkOff />
            ) : (
              <ActionBarItem blogId={blog.id} edit remove />
            )
          ) : (
            <ActionBarItem blogId={blog.id} bookmark />
          )}
        </div>
      </div>
    </div>
  );
};
export default ItemBlog;
