import { combineReducers } from "redux";
import reducerUser from "./reducerUser";
import reducerBlog from "./reducerBlog";

export const rootReducer = combineReducers({
  reducerUser,
  reducerBlog,
});
