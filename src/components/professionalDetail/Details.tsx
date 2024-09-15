import React, { useState, useEffect } from "react";
import Selection from "../common/Selection";

interface DetailsProps {
  onNext: (stepData?: any) => void;
  onBack?: () => void;
}

const Details: React.FC<DetailsProps> = ({ onNext, onBack }) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [roleLevel, setRoleLevel] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(!!selectedRoles.length && !!yearsOfExperience && !!roleLevel);
  }, [selectedRoles, yearsOfExperience, roleLevel]);

  const handleRolesChange = (roles: string[]) => {
    setSelectedRoles(roles);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted with the following data:", {
        selectedRoles,
        yearsOfExperience,
        roleLevel,
      });
      onNext({
        selectedRoles,
        yearsOfExperience,
        roleLevel,
      });
    }
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
        <p>Professional Details</p>
      </div>
      <form className="flex flex-col gap-10 w-[85%] lg:w-[unset] mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px]">
            Preferred Job Roles/Titles
          </label>
          <Selection selectedRoles={selectedRoles} onChange={handleRolesChange} />
        </div>

        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">
            Number of Years of Experience
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
            value={roleLevel}
            onChange={(e) => setRoleLevel(e.target.value)}
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="flex justify-between gap-5">
          <button
            type="button"
            onClick={onBack}
            className="border border-[#1E3A8A] text-[18px] p-[16px] rounded-[16px] h-[54px] w-[195px] leading-[21.6px] font-semibold"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`text-[18px] p-[16px] rounded-[16px] h-[54px] w-[195px] leading-[21.6px] font-semibold ${
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

export default Details;
