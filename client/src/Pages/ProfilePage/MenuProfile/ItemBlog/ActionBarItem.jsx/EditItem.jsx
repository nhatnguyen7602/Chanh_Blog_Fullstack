import React from "react";
import { MdEditNote } from "react-icons/md";
import { Link } from "react-router-dom";

const EditItem = ({ blogId }) => {
  return (
    <Link to={`/blog/edit/${blogId}`}>
      <button className="profile-blog__btn-edit">
        <MdEditNote />
      </button>
    </Link>
  );
};

export default EditItem;
