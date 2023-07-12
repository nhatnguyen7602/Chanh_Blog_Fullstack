import { Dropdown, Switch } from "antd";
import { BiLogOut, BiUser } from "react-icons/bi";
import { BsSunFill, BsMoonStars } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/actionUser";

const UserDropdown = ({ children, idUser }) => {
  const items = [
    {
      key: "account",
      label: (
        <Link className="dropdown" to={`/profile/${idUser}`}>
          <BiUser />
          <span className="ml-4">Tài khoản</span>
        </Link>
      ),
    },

    {
      key: "logout",
      label: (
        <a className="dropdown">
          <BiLogOut />
          <span className="ml-4">Đăng xuất</span>
        </a>
      ),
    },
  ];

  const dispatch = useDispatch();

  const handleLogout = ({ key }) => {
    if (key === "logout") {
      dispatch(logoutAction());
    }
  };

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items,
        onClick: handleLogout,
      }}
      placement="bottomRight"
    >
      {children}
    </Dropdown>
  );
};
export default UserDropdown;
