import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { serviceBaiViet } from "../../services/serviceBaiViet";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import moment from "moment";
import { onMessage } from "../../utils/message";
import { SUCCESS } from "../../constants/constantUI";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/configURL";
import * as Yup from "yup";

const WriteBlogPage = () => {
  const userId = useSelector((state) => state.reducerUser.userInfo.id);

  const [imgSrc, setImgSrc] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  function uploadAdapter(loader) {
    return {
      upload: () => {
        const formData = new FormData();

        return loader.file.then((file) => {
          formData.append("file", file);

          return serviceBaiViet
            .postAnh(formData)
            .then((res) => {
              return { default: `${BASE_URL}/${res.data.url}` };
            })
            .catch((err) => {
              console.log("err: ", err);
            });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const formik = useFormik({
    initialValues: {
      tieu_de: "",
      hinh_anh: null,
      noi_dung: "",
      ngay: "",
      nguoi_viet_id: userId,
    },

    validationSchema: Yup.object().shape({
      tieu_de: Yup.string().required("Vui lòng đặt tiêu đề cho bài viết!"),

      hinh_anh: Yup.mixed().required(
        "Vui lòng chọn hình đại diện cho bài viết!"
      ),

      noi_dung: Yup.string().required("Vui lòng viết nội dung!"),
    }),

    onSubmit: (values) => {
      const data = { ...values, ngay: moment().format() };

      let formData = new FormData();

      for (let key in data) {
        formData.append(key, data[key]);
      }

      serviceBaiViet
        .postBaiViet(formData)
        .then((res) => {
          onMessage(SUCCESS, res.data.message);

          setTimeout(() => {
            if (location.key === "default") {
              navigate("/");
            } else {
              navigate(-1);
            }
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const handleEditorChange = () => (event, editor) => {
    formik.setFieldValue("noi_dung", editor.getData());
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }

    file && formik.setFieldValue("hinh_anh", file);
  };

  return (
    <form className="write-blog" onSubmit={formik.handleSubmit}>
      <input
        type="text"
        placeholder="Tiêu đề bài viết"
        autoFocus
        name="tieu_de"
        className="write-blog__header"
        onChange={formik.handleChange}
      />
      {formik.errors.tieu_de && formik.touched.tieu_de && (
        <p className="profile-form__error">{formik.errors.tieu_de}</p>
      )}

      <div>
        <label className="write-blog__select" for="file">
          Chọn hình đại diện cho bài viết
        </label>
        {formik.errors.hinh_anh && formik.touched.hinh_anh && (
          <p className="profile-form__error">{formik.errors.hinh_anh}</p>
        )}

        <input type="file" id="file" onChange={handleChangeFile} hidden />
      </div>

      <img className="write-blog__img" src={imgSrc} />

      <CKEditor
        config={{
          extraPlugins: [uploadPlugin],
          placeholder: "Nội dung bài viết",
          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "outdent",
              "indent",
              "|",
              "uploadImage",
              "blockQuote",
              "|",
              "undo",
              "redo",
            ],
          },
        }}
        editor={ClassicEditor}
        onChange={handleEditorChange()}
      />
      {formik.errors.noi_dung && formik.touched.noi_dung && (
        <p className="profile-form__error">{formik.errors.noi_dung}</p>
      )}

      <button
        disabled={formik.dirty ? false : true}
        className="write-blog__submit"
        type="submit"
      >
        Xuất bản
      </button>
    </form>
  );
};

export default WriteBlogPage;
