import React from "react";

const page = () => {
  throw new Error("This is An Error! :) "); // only this page will cause error, other will be work fine
  return <div></div>;
};

export default page;
