import { Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions/actionUser";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = (dataLogin) => {
    const onSuccess = () => {
      setTimeout(() => {
        if (location.key === "default") {
          navigate("/");
        } else {
          navigate(-1);
        }
      }, 1000);
    };

    dispatch(loginAction(dataLogin, onSuccess));
  };

  return (
    <div>
      <h2 className="account__header">Đăng nhập</h2>

      <Form size="large" onFinish={onFinish}>
        <Form.Item
          style={{ fontFamily: "Ysabeau" }}
          name="email"
          rules={[
            {
              required: true,
              message: "Nhập email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="pass_word"
          rules={[
            {
              required: true,
              message: "Nhập mật khẩu!",
            },
          ]}
        >
          <Input type="password" placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item>
          <button className="account__btn" type="submit">
            Đăng nhập
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
