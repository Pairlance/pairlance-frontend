import React, { useState, useEffect } from "react";
import Selection from "../common/Selection";

interface Detail {
  selectedRoles: string[];
  yearsOfExperience: string;
  roleLevel: string;
}

interface DetailsProps {
  onNext: (stepData?: Detail) => void; 
  onBack?: () => void;
  formData: Detail;
}

const Details: React.FC<DetailsProps> = ({ onNext, onBack, formData }) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(formData.selectedRoles || []);
  const [yearsOfExperience, setYearsOfExperience] = useState(formData.yearsOfExperience || "");
  const [roleLevel, setRoleLevel] = useState(formData.roleLevel || "");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      !!selectedRoles.length && !!yearsOfExperience && !!roleLevel
    );
  }, [selectedRoles, yearsOfExperience, roleLevel]);

  const handleRolesChange = (roles: string[]) => {
    setSelectedRoles(roles);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      onNext({
        selectedRoles,
        yearsOfExperience,
        roleLevel,
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg lg:w-[700px] xl:h-[726px] gap-10 lg:border border-[#D0D2D6] py-10"
      style={{ fontFamily: "lato" }}
    >
      <div
        className="flex justify-center font-bold text-center text-[24px] leading-[30.17px] text-[#374151]"
        style={{ fontFamily: "Merriweather" }}
      >
        <p>Professional Details</p>
      </div>
      <form
        className="flex flex-col gap-10 w-[85%] lg:w-[unset] mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px]">
            Preferred Job Roles/Titles
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
            className={`p-[16px] border bg-[#ffff] rounded-[16px] h-[54px] outline-none ${
              !yearsOfExperience ? "text-[#79808A] text-[14px] text-opacity-60" : "text-black"
            }`}
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
          >
            <option value="" disabled hidden>
              Select years
            </option>
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
            className={`p-[16px] border bg-[#ffff] rounded-[16px] h-[54px] outline-none ${
              !roleLevel ? "text-[#79808A] text-[14px] text-opacity-60" : "text-[#000]"
            }`}
            value={roleLevel}
            onChange={(e) => setRoleLevel(e.target.value)}
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="flex justify-center gap-5">
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
