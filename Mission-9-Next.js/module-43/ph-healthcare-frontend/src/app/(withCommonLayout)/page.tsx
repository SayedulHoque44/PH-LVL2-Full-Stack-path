import React from "react";

import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import Specialist from "@/components/UI/HomePage/Specialist/Specialist";
import TopRatedDoctors from "@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/UI/HomePage/WhyUs/WhyUs";
import HowWorks from "@/components/UI/HomePage/HowWorks/HowWorks";
import Stats from "@/components/UI/HomePage/Stats/Stats";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Specialist />
      <TopRatedDoctors />
      <WhyUs />
      <HowWorks />
      <Stats />
    </>
  );
};

export default HomePage;
