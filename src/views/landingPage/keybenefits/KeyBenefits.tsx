import React from "react";

const KeyBenefits: React.FC = () => {
  return (
    <section
      className="py-16 bg-white lg:text-center lg:w-[75% mx-auto px-5 lg:px-0"
      style={{ fontFamily: "lato" }}
    >
      <div className="container mx-auto">
        <div className="text-2xl font-bold text-gray-800 mb-4">
          <div className="flex lg:items-center lg:justify-center">
            <div className="bg-blue-900 rounded-full w-[65px] h-[65px] flex items-center justify-center"></div>
            <p
              className="relative right-7 top-4"
              style={{ fontFamily: "Merriweather" }}
            >
              <span className="text-white text-[36px] font-bold leading-[45.25px]">
                K
              </span>
              ey Benefits
            </p>
          </div>
        </div>
        <div className="flex justify-center text-gray-600 font-normal mb-12 lg:text-[18px] text-[14px] lg:text-center lg:w-[1086px] w-full mx-auto leading-[21.16px]">
          <p className="">
            Maximize your potential with a platform designed for both recruiters
            and job seekers. Effortlessly find the right fit, saving time and
            connecting talent with opportunity.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between lg:w-[1077px] mx-auto">
          <div className="w-[50%  text-left mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-[30.17px]">
              For Recruiters
            </h3>
            <div className="text-gray-600 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <img
                    src="src/assets/keybenefits/primecheckcircle.svg"
                    alt="primecheckcircle"
                    width={24}
                    height={24}
                  />
                  <span className="text-[18px] font-bold leading-[21.6px]">
                    Speed:
                  </span>
                </div>
                <p className="text-[16px] font-normal leading-[19.9px]">
                  Get matched with the right candidates in minutes, not weeks.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                  <img
                    src="src/assets/keybenefits/primecheckcircle.svg"
                    alt="primecheckcircle"
                    width={24}
                    height={24}
                  />
                  <span className="text-[18px] font-bold leading-[21.6px]">
                    Efficiency:
                  </span>
                </div>
                <p className="text-[16px] font-normal leading-[19.9px]">
                  Only see candidates who meet your exact criteria.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                  <img
                    src="src/assets/keybenefits/primecheckcircle.svg"
                    alt="primecheckcircle"
                    width={24}
                    height={24}
                  />
                  <span className="text-[18px] font-bold leading-[21.6px]">
                    Cost-Effective:
                  </span>
                </div>
                <p className="text-[16px] font-normal leading-[19.9px]">
                  Pay only for the candidates you choose.
                </p>
              </div>
            </div>
          </div>
          <div className="w-[50% text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-[30.17px]">
              For Candidates
            </h3>
            <div className="text-gray-600 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <img
                    src="src/assets/keybenefits/primecheckcircle.svg"
                    alt="primecheckcircle"
                    width={24}
                    height={24}
                  />{" "}
                  <span className="text-[18px] font-bold leading-[21.6px]">
                    Visibility:
                  </span>
                </div>
                <p className="text-[16px] font-normal leading-[19.9px]">
                  Showcase your skills to top employers.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                  <img
                    src="src/assets/keybenefits/primecheckcircle.svg"
                    alt="primecheckcircle"
                    width={24}
                    height={24}
                  />{" "}
                  <span className="text-[18px] font-bold leading-[21.6px]">
                    Ease of Use:
                  </span>
                </div>
                <p className="text-[16px] font-normal leading-[19.9px]">
                  Upload your CV once, get matched with relevant jobs.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <img
                    src="src/assets/keybenefits/primecheckcircle.svg"
                    alt="primecheckcircle"
                    width={24}
                    height={24}
                  />{" "}
                  <span className="text-[18px] font-bold leading-[21.6px]">
                    Ease of Use:
                  </span>
                </div>
                <p className="text-[16px] font-normal leading-[19.9px]">
                  Privacy: Your personal information is protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
