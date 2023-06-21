import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";

const Search = ({ onSearch }) => {
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

          onSearch(text);
        }}
        className="search__btn"
      >
        <BiSearchAlt2 />
      </button>
    </form>
  );
};

export default Search;
