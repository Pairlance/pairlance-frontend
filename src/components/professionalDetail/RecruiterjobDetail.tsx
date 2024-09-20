import React, { useState, useEffect } from "react";
// import { Select, Space } from "antd";
// import type { SelectProps } from "antd";
import Selection from "../common/Selection"
interface RecruiterJobDetailsProps {
  onNext: () => void;
  onBack?: () => void;
}

const RecruiterJobDetails: React.FC<RecruiterJobDetailsProps> = ({ onNext }) => {
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    setIsFormValid(!!gender && !!phoneNumber);
  }, [gender, phoneNumber]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted with the following data:", {
        gender,
        phoneNumber,
      });
      onNext();
    }
  };
  const handleRolesChange = (roles: string[]) => {
    setSelectedRoles(roles);
  };

  // const roles = [
  //   "Data Analyst",
  //   "Project Manager",
  //   "Front-End Developer",
  //   "Back-End Developer",
  //   "UI/UX Designer",
  //   "DevOps Engineer",
  // ];

  // Map the roles to Ant Design's Select options format
  // const options: SelectProps["options"] = roles.map((role) => ({
  //   label: role,
  //   value: role,
  // }));

  // const handleChange = (value: string[]) => {
  //   console.log(`selected ${value}`);
  // };

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
          {/* <Space style={{ width: "100%" }} direction="vertical">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select roles"
              onChange={handleChange}
              options={options}
            />
          </Space> */}
          <Selection selectedRoles={selectedRoles} onChange={handleRolesChange}/>
        </div>

        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">
          Years of Experience
          </label>
          <input
            type="number"
            className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none"
            placeholder="Enter years of experience"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">
            Role Level
          </label>
          <select
            className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select level</option>
            <option value="Female">Junior</option>
            <option value="Male">Intermediate</option>
            <option value="Other">Expert</option>
          </select>
        </div>

        <div className="flex w-full">
          {/* <button
            type="button"
            onClick={onBack}
            className="border border-[#1E3A8A] text-[18px] p-[16px] rounded-[16px] h-[54px] w-[195px] leading-[21.6px] font-semibold"
          >
            Back
          </button> */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`text-[18px] p-[16px] rounded-[16px] h-[54px] w-full leading-[21.6px]font-semibold ${
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
