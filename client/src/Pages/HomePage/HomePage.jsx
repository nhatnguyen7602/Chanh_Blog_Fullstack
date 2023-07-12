import React, { useEffect, useState } from "react";
import { serviceBaiViet } from "../../services/serviceBaiViet";
import ItemBlogHome from "./ItemBlogHome";
import Header from "../../Components/HeaderTheme/Header";
import Footer from "../../Components/FooterTheme/Footer";
import { List } from "antd";

const HomePage = () => {
  const [listBaiViet, setListBaiViet] = useState([]);

  const handleSearch = (keyword) => {
    const fetchData = keyword
      ? serviceBaiViet.getSearch(keyword)
      : serviceBaiViet.getList();

    fetchData
      .then((res) => {
        setListBaiViet(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="layout">
      <Header onSearch={handleSearch} />

      <div className="grid">
        <List
          className="mb-20"
          pagination={{
            pageSize: 5,
            align: "center",
          }}
          dataSource={listBaiViet}
          renderItem={(baiViet) => (
            <ItemBlogHome key={baiViet.id} baiViet={baiViet} />
          )}
        />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
