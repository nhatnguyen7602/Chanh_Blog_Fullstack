import React, { useEffect, useRef, useState } from "react";
import InputComment from "./InputComment";
import ItemComment from "./ItemComment";
import { serviceBinhLuan } from "../../../../services/serviceBinhLuan";
import { Drawer } from "antd";
import { BsChatDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { filterAndSortArr } from "../../../../utils/filterAndSortArr";

const Commnent = () => {
  const idUser = useSelector((state) => state.reducerUser.userInfo?.id);
  const idBlog = useSelector((state) => state.reducerBlog.blog?.id);

  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const commentRef = useRef();

  const rootComments = comments.filter((comment) => comment.id_cha === null);

  const replies = (commentId) =>
    comments
      .filter((comment) => comment.id_cha === commentId)
      .sort(
        (a, b) => Date.parse(a.ngay_binh_luan) - Date.parse(b.ngay_binh_luan)
      );

  const renderComment = () => {
    if (comments.length === 0) {
      return (
        <div className="comment-empty">
          Hãy là người đầu tiên chia sẻ cảm nghĩ!
        </div>
      );
    }

    return rootComments.map((rootComment) => {
      return (
        <ItemComment
          handleDeleteComment={handleDeleteComment}
          handleAddComment={handleAddComment}
          key={rootComment.id}
          comment={rootComment}
          replies={replies(rootComment.id)}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
        />
      );
    });
  };

  const handleComment = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    commentRef.current.reset();
  };

  const handleAddComment = (data, idComment = null) => {
    !idComment
      ? serviceBinhLuan.postBinhLuan(data).then(() => {
          commentRef.current.reset();
          setActiveComment(null);
          setCommentCount(commentCount + 1);
        })
      : serviceBinhLuan
          .putBinhLuan(idComment, data)
          .then(() => {
            setActiveComment(null);
            setCommentCount(commentCount - 1);
          })
          .catch((err) => {
            console.log(err);
          });
  };

  const handleDeleteComment = (id) => {
    serviceBinhLuan.deleteBinhLuan(id).then(() => {
      setCommentCount(commentCount + 1);
    });
  };

  useEffect(() => {
    idBlog &&
      serviceBinhLuan
        .getBinhLuanTheoBaiViet(idBlog)
        .then((res) => {
          setComments(filterAndSortArr(res.data.data.binh_luan, idUser));
        })
        .catch((err) => {
          console.log(err);
        });
  }, [idBlog, commentCount]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 63.9375em)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <button onClick={handleComment} className="blog__action-btn">
        <div className="blog__action-icon">
          <BsChatDots />
          <span>{comments.length}</span>
        </div>
      </button>

      <Drawer
        title="Bình luận"
        placement="right"
        onClose={onCloseDrawer}
        open={openDrawer}
        width={isMobile ? "100%" : "50%"}
      >
        <InputComment
          ref={commentRef}
          handleSubmit={handleAddComment}
          submitLable="Bình luận"
        />

        <div>{renderComment()}</div>
      </Drawer>
    </div>
  );
};

export default Commnent;
