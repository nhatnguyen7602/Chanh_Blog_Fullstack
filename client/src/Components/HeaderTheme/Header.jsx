import React from "react";
import UserNav from "./UserNav";
import Logo from "../Logo/Logo";
import Search from "./Search";

const Header = ({ onSearch }) => {
  return (
    <div className="grid__full-width header">
      <div className="grid header-content">
        <Logo />

        {onSearch && <Search onSearch={onSearch} />}

        <UserNav />
      </div>
    </div>
  );
};

export default Header;
