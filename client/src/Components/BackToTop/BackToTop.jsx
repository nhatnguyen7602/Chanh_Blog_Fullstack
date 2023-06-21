import React, { useEffect, useState } from "react";
import { UpOutlined } from "@ant-design/icons";

const BackToTop = () => {
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {backToTop && (
        <button onClick={scrollUp} className="back-to-top">
          <UpOutlined />
        </button>
      )}
    </>
  );
};

export default BackToTop;
