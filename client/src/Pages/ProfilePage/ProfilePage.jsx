import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import MenuProfile from "./MenuProfile/MenuProfile";
import ModalInfoUser from "./ModalInfoUser/ModalInfoUser";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { serviceUser } from "../../services/serviceUser";
import { BASE_URL } from "../../services/configURL";

const ProfilePage = () => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});

  const userLogin = useSelector((state) => state.reducerUser.userInfo);

  const isMyProfile = +id === userLogin?.id;

  useEffect(() => {
    isMyProfile
      ? setUserInfo(userLogin)
      : serviceUser
          .getIdUser(+id)
          .then((res) => {
            setUserInfo(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
  }, [userLogin, isMyProfile]);

  return (
    <div className="profile">
      <div className="profile-info">
        <Avatar
          className="profile-info__avatar"
          icon={<UserOutlined />}
          src={userInfo.avatar ? `${BASE_URL}/${userInfo.avatar}` : null}
        />

        <div className="profile-info__name">{userInfo.nick_name}</div>
        <div className="profile-info__imail">{userInfo.email}</div>

        {isMyProfile && <ModalInfoUser />}
      </div>

      <MenuProfile isMyProfile={isMyProfile} />
    </div>
  );
};

export default ProfilePage;
