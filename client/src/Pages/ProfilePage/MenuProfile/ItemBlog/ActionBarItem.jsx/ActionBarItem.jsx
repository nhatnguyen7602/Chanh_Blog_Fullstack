import React from "react";
import BookmarkItem from "./BookmarkItem";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import BookmarkOffItem from "./BookmarkOffItem";

const ActionBarItem = ({ bookmark, edit, remove, bookmarkOff, blogId }) => {
  return (
    <div>
      {bookmark && <BookmarkItem blogId={blogId} />}
      {edit && <EditItem blogId={blogId} />}
      {remove && <DeleteItem blogId={blogId} />}
      {bookmarkOff && <BookmarkOffItem blogId={blogId} />}
    </div>
  );
};

export default ActionBarItem;
