import React, { useEffect, useState } from "react";
import { serviceThich } from "../../../../services/serviceThich";
import { onMessage } from "../../../../utils/message";
import { WARNING } from "../../../../constants/constantUI";
import { useSelector } from "react-redux";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import moment from "moment";

const Like = () => {
  const userId = useSelector((state) => state.reducerUser.userInfo?.id);
  const blogId = useSelector((state) => state.reducerBlog.blog?.id);

  const [likes, setLikes] = useState([]);

  const myLike = likes.find((like) => like.ma_nguoi_dung === userId);

  const handleLike = () => {
    if (!userId) {
      onMessage(WARNING, "Vui lòng đăng nhập!");
    } else {
      const data = {
        ma_bai_viet: blogId,
        ma_nguoi_dung: userId,
        ngay_thich: moment().format(),
      };

      if (!myLike) {
        serviceThich
          .postThich(data)
          .then((res) => {
            setLikes([...likes, res.data.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        serviceThich
          .deleteThich(myLike.id)
          .then(() => {
            setLikes(likes.slice(0, -1));
          })

          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    blogId &&
      serviceThich
        .getThichTheoBaiViet(blogId)
        .then((res) => {
          setLikes(res.data.data.thich);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [blogId]);

  return (
    <button className="blog__action-btn" onClick={handleLike}>
      {myLike ? (
        <div className="blog__action-icon-target">
          <BsHeartFill />
          <span>{likes.length}</span>
        </div>
      ) : (
        <div className="blog__action-icon">
          <BsHeart />
          <span>{likes.length}</span>
        </div>
      )}
    </button>
  );
};

export default Like;
