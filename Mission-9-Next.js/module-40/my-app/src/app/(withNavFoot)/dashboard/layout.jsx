import React from "react";
import Navbar from "../../../components/Shared/Navbar";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">{children}</div>
    </div>
  );
};

export default layout;
