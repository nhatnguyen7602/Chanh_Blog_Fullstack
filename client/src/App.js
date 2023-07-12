import "./styles/andtStyle.css";
import "./styles/ckStyle.css";
import "./App.css";
import "normalize.css";
import Layout from "./Layout/Layout";
import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { ConfigProvider } from "antd";
import moment from "moment";
import "moment/locale/vi";
import BlogPage from "./Pages/BlogPage/BlogPage";
import AccountPage from "./Pages/AccountPage/AccountPage";
import BackToTop from "./Components/BackToTop/BackToTop";
import WriteBlogPage from "./Pages/WriteBlogPage/WriteBlogPage";
import EditBlogPage from "./Pages/EditBlogPage/EditBlogPage";
import { useEffect } from "react";
import { serviceLuu } from "./services/serviceLuu";
import { useDispatch } from "react-redux";
import { logoutAction } from "./redux/actions/actionUser";

moment.locale("vi");

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    serviceLuu
      .getLuuTheoId(1)
      .then(() => {})
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          dispatch(logoutAction());
        }
      });
  }, []);

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f2921d",
            fontFamily: "Ysabeau",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/account" element={<AccountPage />} />

            <Route path="/" element={<HomePage />} />

            <Route
              path="/blog/:id"
              element={<Layout Component={<BlogPage />} />}
            />

            <Route
              path="/blog/write"
              element={
                <PrivateRoute>
                  <Layout Component={<WriteBlogPage />} />
                </PrivateRoute>
              }
            />

            <Route
              path="/blog/edit/:idBlog"
              element={
                <PrivateRoute>
                  <Layout Component={<EditBlogPage />} />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile/:id"
              element={<Layout Component={<ProfilePage />} />}
            />
          </Routes>
        </BrowserRouter>

        <BackToTop />
      </ConfigProvider>
    </div>
  );
}

export default App;
