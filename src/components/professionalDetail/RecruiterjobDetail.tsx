import React, { useState, useEffect } from "react";
import Selection from "../common/Selection";

interface RecruiterJobDetailsProps {
  onNext: (data: { role_level: string; yearsOfExperience: string; selectedRoles: string[] }) => void;
  onBack?: () => void;
}

const RecruiterJobDetails: React.FC<RecruiterJobDetailsProps> = ({ onNext }) => {
  const [role_level, setRoleLevel] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    // Form validation: ensures all fields are filled
    setIsFormValid(!!role_level && !!yearsOfExperience && selectedRoles.length > 0);
  }, [role_level, yearsOfExperience, selectedRoles]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      // Pass the form data up to the parent component
      onNext({
        role_level,
        yearsOfExperience,
        selectedRoles,
      });
    }
  };

  const handleRolesChange = (roles: string[]) => {
    setSelectedRoles(roles);
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg lg:w-[700px] h-[726px] gap-10 lg:border border-[#D0D2D6]"
      style={{ fontFamily: "lato" }}
    >
      <div
        className="flex justify-center font-bold text-center text-[24px] leading-[30.17px] text-[#374151]"
        style={{ fontFamily: "Merriweather" }}
      >
        <p>Job Details</p>
      </div>
      <form className="flex flex-col gap-10 w-[408PX] px-5 lg:px-[unset] mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px]">
            Job Title
          </label>
          <Selection selectedRoles={selectedRoles} onChange={handleRolesChange} />
        </div>

        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">
            Years of Experience
          </label>
          <input
            type="number"
            className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none"
            placeholder="Enter years of experience"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">
            Role Level
          </label>
          <select
            className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none"
            value={role_level}
            onChange={(e) => setRoleLevel(e.target.value)}
          >
            <option value="">Select level</option>
            <option value="Junior">Junior</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="flex w-full">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`text-[18px] p-[16px] rounded-[16px] h-[54px] w-full leading-[21.6px] font-semibold ${
              isFormValid ? "bg-[#1E3A8A] text-white" : "bg-[#B9C2DB] text-[#98A4C9]"
            }`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterJobDetails;
