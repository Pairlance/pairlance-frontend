import React from "react";
import { Modal } from "antd";

interface Candidate {
  full_name: string;
  job_roles: string[];
  resume_url: any | string;
  image_url?: string;
  summary_pitch: string;
}

interface ResumeModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  candidate: Candidate | null;
}

const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  toggleModal,
  candidate,
}) => {
  if (!candidate) return null;
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(candidate.resume_url ?? '')}&embedded=true`;

  return (
    <Modal
      title=""
      open={isOpen}
      onCancel={toggleModal}
      footer={null}
      // width="50%"
      className="w-[100%] lg:w-[50%]"
    >
      <div className="flex" style={{fontFamily:"lato"}}>
        {/* Left Side - Candidate Details */}
        <div className="w-1/3 p-6 bg-[#145349] text-[#FFFFFF]">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src={candidate.image_url || "https://via.placeholder.com/150"}
            alt="Profile"
          />
          <h1 className="text-xl font-bold">{candidate.full_name}</h1>
          <p className="text-sm">{candidate.job_roles.join(", ")}</p>

          <h2 className="mt-6 font-semibold">Pitch Summary</h2>
          {/* <p className="lg:text-sm text-[10px]">{candidate.summary_pitch}</p> */}
        </div>

        {/* Right Side - CV Viewer */}
        <div className="w-2/3 p-6">
          {candidate.resume_url ? (
            <iframe
              src={googleViewerUrl}
              title="Candidate CV"
              style={{ width: "100%", height: "500px", border: "none" }}
            />
          ) : (
            <p>No CV available.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ResumeModal;
