import React from "react";

const MatchingHero: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 my-10" style={{ fontFamily: "lato" }}>
      <div
        className="flex flex-col text-2xl font-bold text-gray-800" 
      >
        <div className="flex items-center justify-center">
          <div className="bg-blue-900 rounded-full w-[65px] h-[65px] flex items-center justify-center"></div>
          <p
            className="relative right-8 top-4 text-[#374151]"
            style={{ fontFamily: "Merriweather" }}
          >
            <span className="text-white text-[36px] font-bold">H</span>ere Are
            Your Matched Candidates!
          </p>
        </div>
      </div>
      <div className="flex justify-center text-center text-[#5F6774] w-[989px] mx-auto text-[18px] leading-[21.6px]">
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
