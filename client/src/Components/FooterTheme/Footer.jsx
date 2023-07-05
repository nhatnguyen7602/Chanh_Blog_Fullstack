import React from "react";
import Logo from "../Logo/Logo";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer grid__full-width">
      <div className="grid footer-content">
        <p>
          © Vui lòng liên kết đến bài gốc khi trích dẫn các nội dung từ website
          này.
        </p>

        <div className="footer-link">
          <a
            className="footer__icon"
            href="https://www.facebook.com/NhatNguyen7602"
            target="_blank"
          >
            <FaFacebook />
          </a>

          <a
            className="footer__icon"
            href="https://instagram.com/eb.conca"
            target="_blank"
          >
            <FaInstagram />
          </a>

          <a
            className="footer__icon"
            href="https://www.youtube.com/@nguyenminhnhat5946"
            target="_blank"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
