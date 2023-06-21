import React from "react";
import Commnent from "./Comment/Comment";
import Like from "./Like/Like";
import Bookmark from "./Bookmark/Bookmark";

const ActionBar = () => {
  return (
    <div className="blog__action">
      <div className="blog__action-left">
        <Like />
        <Commnent />
      </div>

      <div>
        <Bookmark />
      </div>
    </div>
  );
};

export default ActionBar;
