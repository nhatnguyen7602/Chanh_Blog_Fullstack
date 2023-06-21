import { useFormik } from "formik";
import moment from "moment";
import { forwardRef, useImperativeHandle } from "react";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const InputComment = (
  {
    submitLable,
    handleSubmit,
    parentId,
    tagUserName,
    hasCancle,
    handleCancle,
    initialData,
  },
  ref
) => {
  const userInfo = useSelector((state) => state.reducerUser.userInfo);
  const idBaiViet = useSelector((state) => state.reducerBlog.blog?.id);

  const formik = useFormik({
    initialValues: {
      ma_bai_viet: initialData ? initialData.ma_bai_viet : +idBaiViet,
      ma_nguoi_dung: initialData ? initialData.ma_nguoi_dung : userInfo?.id,
      ngay_binh_luan: initialData ? initialData.ngay_binh_luan : "",
      noi_dung: initialData ? initialData.noi_dung : "",
      id_cha: initialData ? initialData.id_cha : parentId,
      tag_user_name: initialData ? initialData.tag_user_name : tagUserName,
    },

    onSubmit: (values) => {
      initialData
        ? handleSubmit(values, initialData.id)
        : handleSubmit({ ...values, ngay_binh_luan: moment().format() });
    },
  });

  useImperativeHandle(ref, () => ({
    reset: () => {
      formik.setFieldValue("noi_dung", "");
    },
  }));

  return userInfo ? (
    <form className="comment-input" onSubmit={formik.handleSubmit}>
      <textarea
        autoFocus
        name="noi_dung"
        maxLength={255}
        className="comment-input__text"
        placeholder={
          !hasCancle ? "Hãy chia sẻ cảm nghĩ của bạn về bài viết" : ""
        }
        value={formik.values.noi_dung}
        onChange={formik.handleChange}
      />

      <div className="comment__input-btn">
        {hasCancle && (
          <button onClick={handleCancle} className="comment-input__btn-cancle">
            Hủy
          </button>
        )}

        <button
          disabled={formik.dirty ? false : true}
          type="submit"
          className="comment-input__btn-ok"
        >
          {submitLable}
        </button>
      </div>
    </form>
  ) : (
    <div className="comment-input__login">
      <BsFillPatchQuestionFill className="comment-input__login-icon" />
      <div>Bạn muốn chia sẻ cảm nghĩ?</div>
      <div>
        Vui lòng{" "}
        <Link to="/account">
          <span className="comment-input__login-btn">đăng nhập</span>
        </Link>
      </div>
    </div>
  );
};
export default forwardRef(InputComment);
