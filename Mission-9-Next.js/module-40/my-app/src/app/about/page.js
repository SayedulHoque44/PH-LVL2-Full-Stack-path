import React from "react";
import HeaderStyle from "./About.module.css";

export const metadata = {
  title: "About Us",
  description: "know about us",
};

const AboutPage = () => {
  return (
    <div>
      <h1 className={HeaderStyle.header}>This About Page</h1>
    </div>
  );
};

export default AboutPage;
