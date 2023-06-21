import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ERROR, SUCCESS } from "../../constants/constantUI";
import { serviceAuth } from "../../services/serviceAuth";
import { onMessage } from "../../utils/message";

const Register = ({ handleLoginLogout }) => {
  const onFinish = (dataRegister) => {
    serviceAuth
      .register({ ...dataRegister, quyen: "USER" })
      .then((res) => {
        const { message } = res.data;

        onMessage(SUCCESS, message);

        setTimeout(() => {
          handleLoginLogout();
        }, 1000);
      })
      .catch((err) => {
        onMessage(ERROR, err.response.data.message);
      });
  };

  return (
    <div>
      <h2 className="account__header">Đăng ký</h2>

      <Form size="large" onFinish={onFinish}>
        <Form.Item
          name="nick_name"
          rules={[
            {
              required: true,
              message: "Nhập nick name!",
            },
          ]}
        >
          <Input placeholder="Nick name" />
        </Form.Item>

        <Form.Item
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
          <button type="submit" className="account__btn">
            Đăng ký
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
