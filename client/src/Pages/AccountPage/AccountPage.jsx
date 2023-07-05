import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AccountPage = () => {
  const [login, setLogin] = useState(true);

  const handleLoginLogout = () => {
    setLogin(!login);
  };

  return (
    <>
      <div className="account">
        <div className="account__logo">
          <img src="./logo.png" />
        </div>

        <div>
          {login ? (
            <Login />
          ) : (
            <Register handleLoginLogout={handleLoginLogout} />
          )}
        </div>

        <div className="account__footer">
          {login ? "Chưa có" : "Đã có"} tài khoản?
          <button className="account__footer-btn" onClick={handleLoginLogout}>
            {login ? "Đăng ký" : "Đăng nhập"} ngay!
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
