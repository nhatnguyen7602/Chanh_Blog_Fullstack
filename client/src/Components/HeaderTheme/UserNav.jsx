import React from "react";
import { BiPencil } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../services/configURL";

const UserNav = () => {
  const userInfo = useSelector((state) => state.reducerUser.userInfo);

  const renderContent = () => {
    if (!userInfo) {
      return (
        <Link className="user-nav__btn" to="/account">
          Đăng nhập
        </Link>
      );
    } else {
      return (
        <div className="user-nav">
          <Link className="user-nav__btn" to={`/blog/write`}>
            <BiPencil />
            <span className="ml-4">Viết bài</span>
          </Link>

          <UserDropdown idUser={userInfo.id}>
            <Avatar
              className="user-nav__avatar"
              size={40}
              icon={<UserOutlined />}
              src={`${BASE_URL}/${userInfo.avatar}`}
            />
          </UserDropdown>
        </div>
      );
    }
  };

  return <div>{renderContent()}</div>;
};

export default UserNav;
