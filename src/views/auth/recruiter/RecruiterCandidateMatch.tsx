import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { useLocation } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import MatchingNavBar from "../../../components/navBar/MatchingNavBar";
import MatchingHero from "../../../components/common/MatchingHero";
import ResumeModal from "../../../components/matchingCards/ResumeModal";
import ShortlistModal from "../../../components/matchingCards/ShortlistModal";
import "./RecruiterCandidateMatch.css";
import NavBar from "../../../components/navBar/NavBar";
import { Candidate } from "../../../types";


// type Candidate = {
//   id: number;
//   full_name: string;
//   image_url: string;
//   summary_pitch: string;
//   job_roles: string[];
//   cv_url: string;
// };

const RecruiterCandidateMatch: React.FC = () => {
  const location = useLocation();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [shortlist, setShortlist] = useState<Candidate[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShortlistModalOpen, setIsShortlistModalOpen] = useState(false);

  useEffect(() => {
    const candidatesFromState = location.state?.candidates || [];
    setCandidates(candidatesFromState);
  }, [location.state]);

  const handleAddToShortlist = (candidate: Candidate) => {
    setShortlist([...shortlist, candidate]);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleShortlistModal = () => {
    setIsShortlistModalOpen(!isShortlistModalOpen);
  };

  const handleDeleteCandidate = (candidateId: number) => {
    setShortlist((prevShortlist) =>
      prevShortlist.filter((candidate) => candidate.id !== candidateId)
    );
  };

  const handleSubmitShortlist = async (selectedCandidateIds: number[]) => {
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      console.log("Shortlist submitted:", selectedCandidateIds);
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <>
      <div className="hidden lg:block">
        <MatchingNavBar />
      </div>
      <div className="lg:hidden">
        <NavBar />
      </div>
      <MatchingHero />
      <div
        className="flex flex-col lg:w-[1030px] lg:bg-[#F5F5F5] h-[100% mx-auto rounded-[16px] p-5 gap-5 mb-5"
        style={{ fontFamily: "Lato" }}
      >
        <div className="flex justify-end ">
          <div
            className="relative top-0 right-0 mt-4 mr-4 "
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button className="text-[red] hover:text-gray-600" onClick={toggleShortlistModal}>
              <img
                src="/src/assets/bugger.svg"
                alt=""
                width={25.14}
                height={22.86}
              />
              {/* Shortlist Counter */}
              <span className="absolute bottom-5 left-5 inline-flex items-center justify-center px-2 py-1 text-xs font-normal leading-none text-red-100 bg-red-600 rounded-full">
                {shortlist.length}
              </span>
            </button>

            {showTooltip && (
              <div
                className="absolute top-0 right-0 bg-white border border-gray-300 shadow-lg rounded-lg p-5 mt-6 z-10"
                style={{ fontFamily: "lato" }}
              >
                <div className="flex justify-between items-center text-[16px] font-semibold text-[#374151] w-full">
                  <h4 className="font-semibold text-gray-700">ShortList</h4>
                  <button
                    className="text-[#000000] hover:text-gray-700 h-[11.09px] w-[11.09px] mb-4"
                    onClick={() => setShowTooltip(false)}
                  >
                    &times;
                  </button>
                </div>
                <p className="text-[#79808A] text-sm leading-[16.8px] w-[270px]">
                  View your shortlisted candidates here. Click to see all the profiles you've saved and easily select the right candidates before submitting their CVs to your email.
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

        {/* Carousel Container */}
        <div className="lg:w-[60%] w-full mx-auto h-[775px lg:border-none border border-[#D0D2D6] rounded-[16px]">
          <Carousel arrows={true}>
            {candidates.map((candidate, index) => (
              <div
                key={index}
                className="relative bg-white rounded-[16px] p-5 mb-2 w-[30%]"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={candidate.image_url}
                    alt={`${candidate.full_name}'s profile`}
                    className="w-[150px] h-[150px] rounded-[16px] object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{candidate.full_name}</h2>
                    <p className="text-gray-500">{candidate.job_roles.join(", ")}</p>
                  </div>
                </div>

                <div className="mt-4 lg:border-t-[1px]">
                  <h3 className="font-semibold text-gray-700">
                    Pitch/Summary:
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {candidate.summary_pitch}
                  </p>
                </div>

                <div className="flex lg:justify-end lg:items-end lg:border-t-[1px] pt-10">
                  <div className="flex flex-col lg:flex-row lg:gap-1 gap-5 w-full lg:w-[unset]">
                    <button
                      onClick={toggleModal}
                      className="flex justify-center items-center lg:w-[168px] border border-[#1E3A8A] text-[#1E3A8A] text-[18px] px-[16px] rounded-[16px] h-[54px] leading-[21.6px]"
                    >
                      Preview CV
                    </button>
                    <button
                      onClick={() => handleAddToShortlist(candidate)}
                      className="flex justify-center items-center bg-[#1E3A8A] lg:w-[168px] w-full text-[#FFFFFF] text-[18px] px-[16px] rounded-[16px] h-[54px] leading-[21.6px]"
                    >
                      Add to Shortlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <Footer />

      <ResumeModal isOpen={isModalOpen} toggleModal={toggleModal} />

      {/* Import the Shortlist Modal */}
      <ShortlistModal
        isOpen={isShortlistModalOpen}
        toggleModal={toggleShortlistModal}
        shortlist={shortlist}
        onDeleteCandidate={handleDeleteCandidate}
        onSubmitShortlist={handleSubmitShortlist}
      />
    </>
  );
};

export default RecruiterCandidateMatch;
