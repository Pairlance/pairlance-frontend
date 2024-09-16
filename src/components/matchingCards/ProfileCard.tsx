import React, { useState } from "react";
import ResumeModal from "./ResumeModal";

interface ProfileCardProps {
  name: string;
  role: string;
  summary: string;
  imageUrl: string;
  onNext: () => void; // New prop for preview
  onShortlist: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  summary,
  imageUrl,
  onShortlist,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="flex flex-col lg:w-[95%] bg-[#F5F5F5] h-[100%] mx-auto rounded-[16px] lg:p-5">
        <div className="flex justify-end z-10">
          <div
            className="relative top-0 right-0 mt-4 mr-4"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button className="text-[red] hover:text-gray-600">
              <img
                src="/src/assets/bugger.svg"
                alt=""
                width={25.14}
                height={22.86}
              />
            </button>

            {showTooltip && (
              <div
                className="absolute top-0 right-0  bg-white border border-gray-300 shadow-lg rounded-lg p-5 mt-6"
                style={{ fontFamily: "lato" }}
              >
                <div className="flex justify-between items-center text-[16px] font-semibold text-[#374151] w-full">
                  <h4 className="font-semibold text-gray-700">ShortList</h4>
                  <button
                    className="text-[#000000] hover:text-gray-700 h-[11.09px] w-[11.09px] "
                    onClick={() => setShowTooltip(false)}
                  >
                    &times;
                  </button>
                </div>
                <p className="text-[#79808A] text-sm leading-[16.8px] w-[270px]">
                  View your shortlisted candidates here. Click to see all the
                  profiles you've saved and easily select the right candidates
                  before submitting their CVs to your email.
                </p>
                <div className="flex justify-end">
                  <button className="text-[16px] font-bold leading-[19.2px]">
                    GOT IT!
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center h-[80% mt-">
          {/* Card Container */}
          <div className="relative w-[632px] bg-white rounded-[16px] border  p-6">
            {/* Candidate Info */}
            <div className="flex items-center space-x-4">
              <img
                src={imageUrl}
                alt={`${name}'s profile`}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-gray-500">{role}</p>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-4 border-t-[1px]">
              <h3 className="font-semibold text-gray-700">Pitch/Summary:</h3>
              <div className="text-gray-600 text-sm mt-2">{summary}</div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-end   border-t-[1px] pt-10">
              <div className="flex gap-1  w-[60%]">
                <button
                  onClick={toggleModal}
                  className="flex justify-center items-center w-[168px border border-[#1E3A8A] text-[#1E3A8A] text-[18px] px-[16px] rounded-[16px] h-[54px] leading-[21.6px]"
                >
                  Preview CV
                </button>
                <button
                  onClick={onShortlist}
                  className="flex justify-center items-center bg-[#1E3A8A] w-[168px text-[#FFFFFF] text-[18px] px-[16px] rounded-[16px] h-[54px] leading-[21.6px]"
                >
                  Add to Shortlist
                </button>
              </div>
            </div>
          </div>
        </div>
        <ResumeModal isOpen={isModalOpen} toggleModal={toggleModal} />
      </div>
    </div>
  );
};

export default ProfileCard;
