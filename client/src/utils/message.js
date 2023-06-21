import { message } from "antd";

export const onMessage = (type, content) => {
  message[type](content);
};
