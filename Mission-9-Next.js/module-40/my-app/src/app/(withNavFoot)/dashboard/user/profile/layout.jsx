import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <div className="bg-green-500/25">
        <h1>i am the wrapper/layout of profile</h1>
        <div>{children}</div>
      </div>
    </>
  );
};

export default layout;
