import { Tabs } from "antd";
import ListBlog from "./ListBlog";

const myItems = [
  {
    key: "1",
    label: `Bài viết của tôi`,
    children: <ListBlog />,
  },

  {
    key: "2",
    label: `Bài viết đã lưu`,
    children: <ListBlog blogSave />,
  },
];

const items = [
  {
    key: "1",
    label: `Tất cả bài viết`,
    children: <ListBlog />,
  },
];

const MenuProfile = ({ isMyProfile }) => {
  return (
    <Tabs centered defaultActiveKey="1" items={isMyProfile ? myItems : items} />
  );
};
export default MenuProfile;
