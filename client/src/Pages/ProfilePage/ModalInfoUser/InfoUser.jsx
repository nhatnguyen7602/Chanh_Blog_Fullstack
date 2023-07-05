import { Form, Input } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserAction,
  updateUserAvatarAction,
} from "../../../redux/actions/actionUser";
import * as Yup from "yup";

const InfoUser = ({ handleCancel, enableOk }, ref) => {
  const dataUser = useSelector((state) => state.reducerUser.userInfo);

  const [imgSrc, setImgSrc] = useState(null);

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: dataUser.id,
      nick_name: dataUser.nick_name,
      email: dataUser.email,
      pass_word: dataUser.pass_word,
      avatar: null,
      quyen: dataUser.quyen,
    },

    validationSchema: Yup.object().shape({
      nick_name: Yup.string().required("Vui lòng nhập nick name!"),

      email: Yup.string()
        .email("Vui lòng nhập đúng định dạng email!")
        .required("Vui lòng nhập email!"),

      pass_word: Yup.string().required("Vui lòng nhập mật khẩu!"),
    }),

    onSubmit: (values) => {
      const onFinish = () => {
        handleCancel();
      };

      if (values.avatar) {
        let formData = new FormData();

        for (let key in values) {
          if (key !== "avatar") {
            formData.append(key, values[key]);
          } else {
            if (values.avatar !== null) {
              formData.append("avatar", values.avatar, values.avatar.name);
            }
          }
        }

        dispatch(updateUserAvatarAction(formData, onFinish));
      } else {
        const dataUser = Object.assign({}, values);
        delete dataUser.avatar;

        dispatch(updateUserAction(dataUser.id, dataUser, onFinish));
      }
    },
  });

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

    file && formik.setFieldValue("avatar", file);
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formik.submitForm();
    },
    resetForm: () => {
      formik.resetForm();

      setImgSrc(null);

      const fileInput = document.getElementById("avatar");
      fileInput.value = "";
    },
  }));

  useEffect(() => {
    formik.dirty ? enableOk(false) : enableOk(true);
  }, [formik.dirty]);

  return (
    <>
      <Form
        labelCol={{
          span: 5,
        }}
      >
        <Form.Item label="Nick name">
          <Input
            name="nick_name"
            value={formik.values.nick_name}
            onChange={formik.handleChange}
          />
          {formik.errors.nick_name && formik.touched.nick_name && (
            <p className="profile-form__error">{formik.errors.nick_name}</p>
          )}
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="profile-form__error">{formik.errors.email}</p>
          )}
        </Form.Item>

        <Form.Item label="Mật khẩu">
          <Input.Password
            name="pass_word"
            value={formik.values.pass_word}
            onChange={formik.handleChange}
          />
          {formik.errors.pass_word && formik.touched.pass_word && (
            <p className="profile-form__error">{formik.errors.pass_word}</p>
          )}
        </Form.Item>

        <Form.Item label="Avatar">
          <div>
            <label className="profile-form__avatar" htmlFor="avatar">
              Chọn hình
            </label>

            <input
              type="file"
              id="avatar"
              onChange={handleChangeFile}
              style={{ display: "none" }}
            />
          </div>

          {imgSrc && (
            <img className="profile-form__img" src={imgSrc} alt="..." />
          )}
        </Form.Item>
      </Form>
    </>
  );
};
export default forwardRef(InfoUser);
