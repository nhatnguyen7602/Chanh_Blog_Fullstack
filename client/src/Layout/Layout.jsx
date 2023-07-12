import React from "react";
import Header from "../Components/HeaderTheme/Header";
import Footer from "../Components/FooterTheme/Footer";

const Layout = ({ Component }) => {
  return (
    <div className="layout">
      <Header />

      <div className="grid">{Component}</div>

      <Footer />
    </div>
  );
};

export default Layout;
