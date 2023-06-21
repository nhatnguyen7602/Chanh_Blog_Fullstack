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

moment.locale("vi");

function App() {
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#f2921d", fontFamily: "Ysabeau" } }}
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
  );
}

export default App;
