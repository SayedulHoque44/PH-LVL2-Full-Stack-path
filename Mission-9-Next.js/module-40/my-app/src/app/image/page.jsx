import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center space-y-4">
      <div className="border-2 border-green-500 p-10">
        <h1>Regular img</h1>
        <img
          src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
          alt="img"
          height={800}
          width={800}
          className="mx-auto"
        />
      </div>
      <div className="border-2 border-green-500 p-10">
        <h1>Image Component of Next.js optimized</h1>
        <Image
          src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
          alt="img"
          height={800}
          width={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default page;
