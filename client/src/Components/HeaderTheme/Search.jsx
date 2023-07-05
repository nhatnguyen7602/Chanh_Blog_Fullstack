import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useSelector } from "react-redux";
import { onMessage } from "../../utils/message";
import { WARNING } from "../../constants/constantUI";

const Search = ({ onSearch }) => {
  const userInfo = useSelector((state) => state.reducerUser.userInfo);

  const [text, setText] = useState("");

  return (
    <form className="search">
      <input
        type="text"
        placeholder="Tìm kiếm theo tiêu đề"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="search__input"
      />

      <button
        onClick={(e) => {
          e.preventDefault();

          if (!userInfo) {
            onMessage(WARNING, "Vui lòng đăng nhập!");
          } else {
            onSearch(text);
          }
        }}
        className="search__btn"
      >
        <BiSearchAlt2 />
      </button>
    </form>
  );
};

export default Search;
