import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { onMessage } from "../../../../utils/message";
import { WARNING } from "../../../../constants/constantUI";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { serviceLuu } from "../../../../services/serviceLuu";

const Bookmark = () => {
  const userId = useSelector((state) => state.reducerUser.userInfo?.id);
  const blogId = useSelector((state) => state.reducerBlog.blog?.id);

  const [bookmarks, setBookmarks] = useState([]);

  let myBookmark = bookmarks.find(
    (bookmark) => bookmark.ma_nguoi_dung === userId
  );

  const handleBookmark = () => {
    if (!userId) {
      onMessage(WARNING, "Vui lòng đăng nhập!");
    } else {
      if (myBookmark) {
        serviceLuu
          .deleteLuu(myBookmark.id)
          .then((res) => {
            setBookmarks(bookmarks.slice(0, -1));
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const data = {
          ma_bai_viet: blogId,
          ma_nguoi_dung: userId,
        };

        serviceLuu
          .postLuu(data)
          .then((res) => {
            setBookmarks([...bookmarks, res.data.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    blogId &&
      serviceLuu
        .getLuuTheoBaiViet(blogId)
        .then((res) => {
          setBookmarks(res.data.data.luu);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [blogId]);

  return (
    <button onClick={handleBookmark} className="blog__action-btn">
      {myBookmark ? (
        <div className="blog__action-icon-target">
          <BsBookmarkFill />
        </div>
      ) : (
        <div className="blog__action-icon">
          <BsBookmark />
        </div>
      )}
    </button>
  );
};

export default Bookmark;
