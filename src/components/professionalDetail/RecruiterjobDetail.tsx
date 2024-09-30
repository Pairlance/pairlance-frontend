import React, { useState, useEffect } from "react";
import Selection from "../common/Selection";

interface RecruiterJobDetailsProps {
  onNext: (data: {
    role_level: string;
    yearsOfExperience: string;
    selectedRoles: string[];
  }) => void;
  onBack?: () => void;
}

const RecruiterJobDetails: React.FC<RecruiterJobDetailsProps> = ({
  onNext,
}) => {
  const [role_level, setRoleLevel] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    setIsFormValid(
      !!role_level && !!yearsOfExperience && selectedRoles.length > 0
    );
  }, [role_level, yearsOfExperience, selectedRoles]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
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
      className="flex flex-col items-center justify-center rounded-lg lg:w-[700px] w-full lg:h-[726px] gap-10 lg:border border-[#D0D2D6]"
      style={{ fontFamily: "lato" }}
    >
      <div
        className="flex justify-center font-bold text-center text-[24px] leading-[30.17px] text-[#374151]"
        style={{ fontFamily: "Merriweather" }}
      >
        <p>Job Details</p>
      </div>
      <form
        className="flex flex-col gap-10 lg:w-[408PX] w-[22em] px-5 lg:px-[unset] mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px]">
            Job Title
          </label>
          <Selection
            selectedRoles={selectedRoles}
            onChange={handleRolesChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">
          Number of Years of Experience
          </label>
          <select
            // className="p-[16px] border bg-[#ffff] rounded-[16px] outline-none h-[54px]"
            className={`p-[16px] border bg-[#ffff] rounded-[16px] h-[54px] outline-none ${
              !yearsOfExperience ? "text-[#5F6774] text-[14px]" : "text-[#000]"
            }`}
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
          >
            <option value="">Select years</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">
            Role Level
          </label>
          <select
            // className="p-[16px] border border-[#D0D2D6] bg-white rounded-[16px] h-[54px] outline-none"
            className={`p-[16px] border bg-[#ffff] rounded-[16px] h-[54px] outline-none ${
              !role_level ? "text-[#79808A] text-[14px]" : "text-[#000]"
            }`}
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
              isFormValid
                ? "bg-[#1E3A8A] text-white"
                : "bg-[#B9C2DB] text-[#98A4C9]"
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
