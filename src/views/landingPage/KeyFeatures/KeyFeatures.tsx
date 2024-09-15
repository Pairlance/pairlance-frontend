import React from "react";

const KeyFeatures: React.FC = () => {
  return (
    <section
      className="py-16 bg-white lg:text-center w-[75% mx-auto px-5 lg:px-0"
      style={{ fontFamily: "lato" }}
    >
      <div className="container mx-auto">
        <div className="text-2xl font-bold text-gray-800 mb-4">
          <div className="flex lg:items-center lg:justify-center">
            <div className="bg-blue-900 rounded-full w-[65px] h-[65px] flex items-center justify-center"></div>
            <p
              className="relative right-7 top-4 text-[#374151]"
              style={{ fontFamily: "Merriweather" }}
            >
              <span className="text-white text-[36px] font-bold">K</span>ey
              Features
            </p>
          </div>
        </div>
        <div className="flex justify-center text-gray-600 font-normal mb-12 lg:text-[18px] text-[14px] lg:text-center lg:w-[1086px] md:w-[362px] mx-auto leading-[21.16px]">
          <p>
            Explore the powerful features designed to enhance your job search
            and recruitment experience. Find the perfect match with our
            intuitive tools and easy-to-use platform.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-5 lg:w-[1240px] mx-auto">
          <div className="bg-[#E9EBF3] p-6 rounded-lg shadow-md md:w-[362px] lg:w-[389.33px] text-left">
            <div className="flex items-center mb-2 gap-1">
              <img src="/src/assets/keybenefits/star.svg" alt="star" />
              <h3 className="text-lg font-semibold text-gray-800">
                Automatic Matching
              </h3>
            </div>
            <p className="text-[#5F6774] lg:text-[16px] text-[14px] font-normal lg:leading-[19.2px] leading-[16.8px] md:w-[325px]">
              Save time with our smart algorithm that automatically matches you
              with the best candidates or jobs based on your preferences and
              requirements.
            </p>
          </div>
          <div className="bg-[#E9EBF3] p-6 rounded-lg shadow-md md:w-[362px] lg:w-[389.33px] text-left">
            <div className="flex items-center mb-2 gap-1">
              <img src="/src/assets/keybenefits/star.svg" alt="star" />
              <h3 className="text-lg font-semibold text-gray-800">
                Swipe Functionality
              </h3>
            </div>
            <p className="text-[#5F6774] lg:text-[16px] text-[14px] font-normal lg:leading-[19.2px] leading-[16.8px] md:w-[325px]">
              Easily browse through potential candidates or job listings with
              our intuitive swipe feature, making your search quick and
              efficient.
            </p>
          </div>
          <div className="bg-[#E9EBF3] p-6 rounded-lg shadow-md md:w-[362px] lg:w-[389.33px] text-left">
            <div className="flex items-center mb-2 gap-1">
              <img src="/src/assets/keybenefits/star.svg" alt="star" />
              <h3 className="text-lg font-semibold text-gray-800">
                No Sign-Up Needed
              </h3>
            </div>
            <p className="text-[#5F6774] lg:text-[16px] text-[14px] font-normal lg:leading-[19.2px] leading-[16.8px] md:w-[325px]">
              Start exploring job opportunities or finding top talent instantly,
              without the hassle of creating an account or logging in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
