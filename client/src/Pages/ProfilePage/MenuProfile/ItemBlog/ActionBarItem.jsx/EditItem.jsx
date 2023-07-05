import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

const EditItem = ({ blogId }) => {
  return (
    <Link to={`/blog/edit/${blogId}`}>
      <button className="profile-blog__btn-edit">
        <BsPencilSquare />
      </button>
    </Link>
  );
};

export default EditItem;
