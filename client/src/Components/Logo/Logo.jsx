import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src="/logo.png" />
      <span>Chanh's Blog</span>
    </Link>
  );
};

export default Logo;
