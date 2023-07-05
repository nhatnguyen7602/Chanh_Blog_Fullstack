import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { serviceBaiViet } from "../../services/serviceBaiViet";
import { useFormik } from "formik";
import { onMessage } from "../../utils/message";
import { SUCCESS } from "../../constants/constantUI";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../services/configURL";
import * as Yup from "yup";

const EditBlogPage = () => {
  const [blog, setBlog] = useState({});

  const [imgSrc, setImgSrc] = useState(null);

  const { idBlog } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    serviceBaiViet
      .getBaiViet(+idBlog)
      .then((res) => {
        setBlog(res.data.data);
        setImgSrc(`${BASE_URL}/${res.data.data.hinh_anh}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    enableReinitialize: true,

    initialValues: {
      tieu_de: blog.tieu_de,
      hinh_anh: blog.hinh_anh,
      noi_dung: blog.noi_dung,
      ngay: blog.ngay,
      nguoi_viet_id: blog.nguoi_viet_id,
    },

    validationSchema: Yup.object().shape({
      tieu_de: Yup.string().required("Vui lòng đặt tiêu đề cho bài viết!"),

      hinh_anh: Yup.mixed().required(
        "Vui lòng chọn hình đại diện cho bài viết!"
      ),

      noi_dung: Yup.string().required("Vui lòng viết nội dung!"),
    }),

    onSubmit: (values) => {
      console.log("values: ", values);
      let formData = new FormData();

      for (let key in values) {
        formData.append(key, values[key]);
      }

      serviceBaiViet
        .putBaiViet(idBlog, formData)
        .then((res) => {
          onMessage(SUCCESS, res.data.message);

          setTimeout(() => {
            navigate(-1);
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

  useEffect(() => {
    const { id, nguoi_dung, ...dataBlog } = blog;
    formik.setValues(dataBlog);
  }, [blog, formik.setValues]);

  return (
    <form className="write-blog" onSubmit={formik.handleSubmit}>
      <input
        type="text"
        placeholder="Tiêu đề bài viết"
        autoFocus
        name="tieu_de"
        className="write-blog__header"
        value={formik.values.tieu_de}
        onChange={formik.handleChange}
      />
      {formik.errors.tieu_de && formik.touched.tieu_de && (
        <p className="profile-form__error">{formik.errors.tieu_de}</p>
      )}

      <div>
        <label className="write-blog__select" htmlFor="file">
          Đổi hình đại diện cho bài viết
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
        data={formik.values.noi_dung}
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
        Tái bản
      </button>
    </form>
  );
};

export default EditBlogPage;
