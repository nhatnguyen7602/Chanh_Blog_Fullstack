import { REMOVE_USER, SET_USER } from "../constants/constantUser";
import { serviceAuth } from "../../services/serviceAuth";
import { serviceLocalStorage } from "../../services/serviceLocalStorage";
import { onMessage } from "../../utils/message";
import { ERROR, SUCCESS } from "../../constants/constantUI";
import { serviceUser } from "../../services/serviceUser";
import { setAuthorization } from "../../services/configURL";

const setUser = (payload) => {
  return { type: SET_USER, payload };
};

const removeUser = () => {
  return { type: REMOVE_USER };
};

export const loginAction = (dataLogin, onSuccess) => {
  return (dispatch) => {
    serviceAuth
      .login(dataLogin)
      .then((res) => {
        const { message, data } = res.data;
        const { token_user, ...userInfo } = data;

        onMessage(SUCCESS, message);

        onSuccess();

        serviceLocalStorage.userInfo.setInfo(userInfo);
        serviceLocalStorage.userInfo.setToken(data.token_user);

        setAuthorization(token_user);

        dispatch(setUser(userInfo));
      })
      .catch((err) => {
        onMessage(ERROR, err.response.data.message);
      });
  };
};

export const logoutAction = () => (dispatch) => {
  serviceLocalStorage.userInfo.remove();

  setAuthorization();

  dispatch(removeUser());
};

export const updateUserAction = (id, dataUser, onFinish) => (dispatch) => {
  serviceUser
    .putNoAvatar(id, dataUser)
    .then((res) => {
      onMessage(SUCCESS, res.data.message);

      serviceLocalStorage.userInfo.setInfo(res.data.data);

      dispatch(setUser(res.data.data));

      onFinish();
    })
    .catch((err) => {
      onMessage(ERROR, err.response.data.message);

      onFinish();
    });
};

export const updateUserAvatarAction = (dataUser, onFinish) => (dispatch) => {
  serviceUser
    .postAvatar(dataUser)
    .then((res) => {
      onMessage(SUCCESS, res.data.message);

      serviceLocalStorage.userInfo.setInfo(res.data.data);

      dispatch(setUser(res.data.data));

      onFinish();
    })
    .catch((err) => {
      onMessage(ERROR, err.response.data.message);

      onFinish();
    });
};
