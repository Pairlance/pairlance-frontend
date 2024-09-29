import React, { useState, useEffect } from "react";
import { Modal, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { Candidate } from "../../types";
import { trash } from "../../assets";



// type Candidate = {
//   full_name: string;
//   image_url: string | undefined;
//   id: number;
//   name: string;
//   role: string;
//   imageUrl: string;
// };

type ShortlistModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  shortlist: Candidate[];
  onDeleteCandidate: (candidateId: number) => void;
  onSubmitShortlist: (selectedCandidates: number[]) => Promise<void>;
  recruiterId: string;
};

const ShortlistModal: React.FC<ShortlistModalProps> = ({
  isOpen,
  toggleModal,
  shortlist,
  onDeleteCandidate,
  onSubmitShortlist,
  recruiterId,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<Set<number>>(
    new Set()
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    // Update selectAll checkbox state based on selectedCandidates
    setSelectAll(selectedCandidates.size === shortlist.length);
  }, [selectedCandidates, shortlist.length]);

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedCandidates(
        new Set(shortlist.map((candidate) => candidate.id))
      );
    } else {
      setSelectedCandidates(new Set());
    }
  };

  const handleCheckboxChange = (
    candidateId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSelection = new Set(selectedCandidates);
    if (e.target.checked) {
      updatedSelection.add(candidateId);
    } else {
      updatedSelection.delete(candidateId);
    }
    setSelectedCandidates(updatedSelection);
  };

  const handleDelete = (candidateId: number) => {
    onDeleteCandidate(candidateId);
    setSelectedCandidates((prev) => {
      const updatedSelection = new Set(prev);
      updatedSelection.delete(candidateId);
      return updatedSelection;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // console.log('Selected Candidates:', selectedCandidates);
      // console.log('Shortlist:', shortlist);
  
      
      const selectedCandidateCVs = shortlist
        .filter(candidate => selectedCandidates.has(candidate.id))
        .map(candidate => candidate.resume_url);
  
      const selectedCandidateIds = shortlist
        .filter(candidate => selectedCandidates.has(candidate.id))
        .map(candidate => candidate.id);
  
      
      // console.log('Selected Candidate CVs:', selectedCandidateCVs);
      // console.log('Selected Candidate IDs:', selectedCandidateIds);
      if (selectedCandidateIds.length === 0) {
        console.warn('No selected candidates found.');
      }
  
      const selectedCandidatesArray = Array.from(selectedCandidates); // Assuming selectedCandidates is a Set
      await onSubmitShortlist(selectedCandidatesArray);
      navigate('/email', {
        state: {
          cvUrls: selectedCandidateCVs,
          candidateIds: selectedCandidateIds,
          recruiterId: recruiterId, 
        },
      });
      setSelectedCandidates(new Set());
      toggleModal();
    } catch (error) {
      // console.error('Error in handleSubmit:', error);
      message.error("Failed to submit shortlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <Modal
      open={isOpen}
      onCancel={toggleModal}
      footer={null}
      className="max-w-lg mx-auto rounded-lg overflow-hidden flex flex-col shortlist"
      style={{ top: 20 }}
    >
      
      <div className="flex justify-between items-center p-4 border-b pt-10">
        <h2 className="text-xl font-semibold">Shortlist</h2>
        
        <div className="flex justify-end items-center p-4">
          <label className="text-sm text-gray-600 flex items-center">
            Select All
            <input
              type="checkbox"
              className="ml-2 form-checkbox h-4 w-4 text-blue-600"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </label>
        </div>
      </div>

      <div className="px-4 pb-4 max-h-72 overflow-y-auto flex flex-col gap-10">
        {shortlist.length > 0 ? (
          shortlist.map((candidate, index) => (
            <div
            key={index} 
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="flex items-center gap-2">
                <div>
                  <button
                    type="button"
                    onClick={() => handleDelete(candidate.id)}
                  >
                    <img src={trash} alt="trash icon" />
                  </button>
                </div>
                <img
                  className="w-10 h-10 rounded-full"
                  src={candidate.image_url}
                  alt="Profile"
                />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    {candidate.full_name}
                  </h3>
                  <p className="text-xs text-gray-500">{candidate.job_roles.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-4 form-checkbox h-4 w-4 text-blue-600"
                  checked={selectedCandidates.has(candidate.id)}
                  onChange={(e) => handleCheckboxChange(candidate.id, e)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No candidates shortlisted yet.</p>
        )}
      </div>
      <div className="p-4  justify-end">
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-[#1E3A8A] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
            disabled={selectedCandidates.size === 0 || loading}
          >
            {loading ? "Submitting..." : "Submit Shortlist"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShortlistModal;
