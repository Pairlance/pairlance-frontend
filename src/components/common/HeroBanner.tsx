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
          className="font-bold lg:text-[36px] text-[18px] lg:leading-[45.25px] leading-[22.63px] lg:w-[875px]"
          style={{ fontFamily: "Merriweather" }}
        >
          {title}
        </p>
        <p className="mt-2 font-normal lg:leading-[21.6px] leading-[16.8px] lg:text-[18px] text-[14px] text-[#E8E8E8]">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
