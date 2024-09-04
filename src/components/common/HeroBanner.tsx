import React from "react";

interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ backgroundImage, title, subtitle }) => {
  return (
    <div
      className="relative flex justify-center items-center text-center mb-6 h-[258px] bg-no-repeat bg-center bg-cover w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-[#0D183A] opacity-50"></div>
      <div className="relative flex flex-col text-[#FFFFFF]">
        <p
          className="font-bold text-[36px] leading-[45.25px] w-[875px]"
          style={{ fontFamily: "Merriweather" }}
        >
          {title}
        </p>
        <p className="mt-2 font-normal leading-[21.6px] text-[18px] text-[#E8E8E8]">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
