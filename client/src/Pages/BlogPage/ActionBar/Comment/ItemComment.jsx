import React from "react";
import { Avatar, Dropdown, Popconfirm } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { changeDate } from "../../../../utils/changeDate";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  EDIT_COMMENT,
  REPLY_COMMENT,
  WARNING,
} from "../../../../constants/constantUI";
import InputComment from "./InputComment";
import { onMessage } from "../../../../utils/message";
import { BASE_URL } from "../../../../services/configURL";

const ItemComment = ({
  comment,
  handleDeleteComment,
  handleAddComment,
  replies,
  activeComment,
  setActiveComment,
  parentId,
}) => {
  const items = [
    {
      key: "edit",
      label: (
        <button className="comment-item__action-more-item">
          <BiEditAlt />
          <span className="ml-4">Sửa</span>
        </button>
      ),
    },

    {
      key: "delete",
      label: (
        <Popconfirm
          placement="rightBottom"
          title="Xóa bình luận"
          description="Bạn có chắc muốn xóa bình luận"
          onConfirm={() => {
            handleDeleteComment(comment.id);
          }}
          okText="Có"
          cancelText="Hủy"
        >
          <button className="comment-item__action-more-item">
            <BiTrash />
            <span className="ml-4">Xóa</span>
          </button>
        </Popconfirm>
      ),
    },
  ];

  const idUser = useSelector((state) => state.reducerUser.userInfo?.id);
  const idBaiViet = useSelector((state) => state.reducerBlog.Blog?.id);

  const onClick = ({ key }) => {
    if (key === "edit") {
      setActiveComment({ id: comment.id, type: EDIT_COMMENT });
    }
  };

  const isMyComment = comment.nguoi_dung.id === idUser;

  const isReply =
    activeComment &&
    activeComment.type === REPLY_COMMENT &&
    activeComment.id === comment.id &&
    idUser;

  const isEdit =
    activeComment &&
    activeComment.type === EDIT_COMMENT &&
    activeComment.id === comment.id;

  const replyId = parentId ? parentId : comment.id;

  return (
    <div className="comment-item">
      <div>
        <Avatar
          className="comment-item__avatar"
          icon={<UserOutlined />}
          src={`${BASE_URL}/${comment.nguoi_dung.avatar}`}
        />
      </div>

      <div className="grid__full-width ml-4">
        <div className="comment-item__right">
          <div
            className={!isEdit ? "comment-item__content" : "comment-item__edit"}
          >
            <div className="comment-item__name">
              {comment.nguoi_dung.nick_name}
            </div>

            <div className="comment-item__text">
              {comment.tag_user_name && (
                <span className="comment-item__tag">
                  {comment.tag_user_name}&ensp;
                </span>
              )}

              {!isEdit ? (
                comment.noi_dung
              ) : (
                <InputComment
                  hasCancle
                  handleCancle={(e) => {
                    e.preventDefault();
                    setActiveComment(null);
                  }}
                  submitLable="Cập nhật"
                  handleSubmit={handleAddComment}
                  initialData={comment}
                />
              )}
            </div>
          </div>

          <div className="comment-item__action">
            <button
              className="comment-item__action-reply"
              onClick={() => {
                if (idUser) {
                  setActiveComment({ id: comment.id, type: REPLY_COMMENT });
                } else {
                  onMessage(WARNING, "Vui lòng đăng nhập!");
                }
              }}
            >
              Trả lời
            </button>

            <BsDot />

            <div>{changeDate(comment.ngay_binh_luan)}</div>

            {isMyComment && (
              <Dropdown
                trigger={["click"]}
                menu={{
                  items,
                  onClick,
                }}
                placement="bottomRight"
              >
                <BsThreeDots className="comment-item__action-more" />
              </Dropdown>
            )}
          </div>

          {isReply && (
            <InputComment
              hasCancle
              handleCancle={(e) => {
                e.preventDefault();
                setActiveComment(null);
              }}
              idBaiViet={idBaiViet}
              submitLable="Trả lời"
              handleSubmit={handleAddComment}
              parentId={replyId}
              tagUserName={comment.nguoi_dung.nick_name}
            />
          )}
        </div>

        <div className="comment-item__reply">
          {replies.length !== 0 &&
            replies.map((reply) => (
              <ItemComment
                idBaiViet={idBaiViet}
                key={reply.id}
                comment={reply}
                handleDeleteComment={handleDeleteComment}
                handleAddComment={handleAddComment}
                replies={[]}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                parentId={comment.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ItemComment;
