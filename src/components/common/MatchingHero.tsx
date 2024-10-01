import React from "react";

const MatchingHero: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 lg:my-10 my-5" style={{ fontFamily: "lato" }}>
      <div
        className="flex flex-col text-2xl font-bold text-gray-800" 
      >
        <div className="flex items-center justify-center ">
          <div className="bg-blue-900 rounded-full lg:w-[65px] w-[35px] lg:h-[65px] h-[35px] flex items-center justify-center"></div>
          <p
            className="relative lg:right-8 right-4 lg:text-[36px] text-[18px]  lg:top-4 top-3 text-[#374151]"
            style={{ fontFamily: "Merriweather" }}
          >
            <span className="text-white lg:text-[36px] text-[18px] font-bold">H</span>ere Are
            Your Matched Candidates!
          </p>
        </div>
      </div>
      <div className="flex justify-center text-center text-[#5F6774] lg:w-[989px] mx-auto lg:text-[18px] text-[14px] lg:leading-[21.6px] px-5 lg:px-0">
        <p>
          Swipe right to add candidates to your shortlist, or swipe left to
          remove them from your current search. Find the perfect fit for your
          job in just a few clicks!
        </p>
      </div>
    </div>
  );
};

export default MatchingHero;
