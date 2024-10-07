import React from "react";

const DynamicProudct = ({ params, searchParams }) => {
  return (
    <div>
      Dynamic Routes {params.productId} {searchParams.type}
    </div>
  );
};

export default DynamicProudct;
