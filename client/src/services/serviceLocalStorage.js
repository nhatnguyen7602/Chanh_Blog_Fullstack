const USER_INFO = "USER_INFO";
const USER_TOKEN = "USER_TOKEN";

export const serviceLocalStorage = {
  userInfo: {
    setInfo: (info) => {
      const jsonInfo = JSON.stringify(info);

      localStorage.setItem(USER_INFO, jsonInfo);
    },

    setToken: (token) => {
      const jsonToken = JSON.stringify(token);

      localStorage.setItem(USER_TOKEN, jsonToken);
    },

    getInfo: () => {
      const jsonInfo = localStorage.getItem(USER_INFO);

      if (jsonInfo) {
        return JSON.parse(jsonInfo);
      } else {
        return null;
      }
    },

    getToken: () => {
      const jsonToken = localStorage.getItem(USER_TOKEN);

      if (jsonToken) {
        return JSON.parse(jsonToken);
      } else {
        return null;
      }
    },

    remove: () => {
      localStorage.removeItem(USER_INFO);
      localStorage.removeItem(USER_TOKEN);
    },
  },
};
