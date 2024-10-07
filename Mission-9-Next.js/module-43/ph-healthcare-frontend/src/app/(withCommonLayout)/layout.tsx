import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {/* CommonLayout */}
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
