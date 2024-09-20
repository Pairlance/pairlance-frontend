import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";
import type { SelectProps } from "antd";

interface RecruiterJobLocation {
  onNext: () => void;
  onBack?: () => void;
}

const RecruiterJobLocation: React.FC<RecruiterJobLocation> = ({
  onNext,
  onBack,
}) => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [gender, setGender] = useState<string>("");

  useEffect(() => {
    // Form is valid if at least one location is selected and gender is chosen
    setIsFormValid(selectedLocations.length > 0 && gender !== "");
  }, [selectedLocations, gender]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted with the following data:", {
        selectedLocations,
        gender,
      });
      onNext();
    }
  };

  const roles = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  // Map the roles to Ant Design's Select options format
  const options: SelectProps["options"] = roles.map((role) => ({
    label: role,
    value: role,
  }));

  const handleChange = (value: string[]) => {
    setSelectedLocations(value);
    console.log(`Selected locations: ${value}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg lg:w-[700px] h-[726px] gap-10 lg:border border-[#D0D2D6]"
      style={{ fontFamily: "Lato" }}
    >
      <div
        className="flex justify-center font-bold text-center text-[24px] leading-[30.17px] text-[#374151]"
        style={{ fontFamily: "Merriweather" }}
      >
        <p>Gender & Location Preferences</p>
      </div>
      <form className="flex flex-col gap-10 w-[95%] mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px]">
            Job Location(s)
          </label>
          <Space style={{ width: "100%" }} direction="vertical">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select locations"
              onChange={handleChange}
              options={options}
            />
          </Space>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">
            Gender
          </label>
          <select
            className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
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

export default RecruiterJobLocation;
