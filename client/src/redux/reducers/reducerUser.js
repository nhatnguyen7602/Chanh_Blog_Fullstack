import { serviceLocalStorage } from "../../services/serviceLocalStorage";
import { REMOVE_USER, SET_USER } from "../constants/constantUser";

const initialState = {
  userInfo: serviceLocalStorage.userInfo.getInfo(),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return { ...state, userInfo: payload };

    case REMOVE_USER:
      return { ...state, userInfo: null };

    default:
      return state;
  }
};
