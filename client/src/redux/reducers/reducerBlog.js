import {
  SET_BLOG,
  SET_BLOGS_SAVE,
  SET_BLOGS_WRITE,
} from "../constants/constantBlog";

const initialState = {
  blog: {},
  blogsWrite: [],
  blogsSave: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BLOG:
      return { ...state, blog: payload };

    case SET_BLOGS_WRITE:
      return { ...state, blogsWrite: payload };

    case SET_BLOGS_SAVE:
      return { ...state, blogsSave: payload };

    default:
      return state;
  }
};
