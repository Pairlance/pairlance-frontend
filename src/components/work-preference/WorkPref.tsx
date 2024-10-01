import React, { useState, useEffect } from "react";
import { message } from "antd";
import ConfirmationModal from "../../views/auth/candidate/SuccessModal";

interface WorkPreferenceProps {
  onBack?: () => void;
  onNext: (stepData?: any) => Promise<boolean>; // Assume onNext returns a promise indicating success
}

const WorkPreferenceForm: React.FC<WorkPreferenceProps> = ({
  onBack,
  onNext,
}) => {
  const [workType, setWorkType] = useState<string[]>([]);
  const [employmentType, setEmploymentType] = useState<string[]>([]);
  const [salaryScale, setSalaryScale] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for managing submission
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsFormValid(
      workType.length > 0 && employmentType.length > 0 && !!salaryScale
    );
  }, [workType, employmentType, salaryScale]);

  const handleWorkTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWorkType((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleEmploymentTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setEmploymentType((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSalaryScaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSalaryScale(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      setIsSubmitting(true); // Disable submit button while submitting

      // Ensure all state fields are up to date
      const dataToSubmit = {
        workType,
        employmentType,
        salaryScale,
      };

      // console.log("Form Data to be sent: ", dataToSubmit); // Log data for debugging

      try {
        const isSuccessful = await onNext(dataToSubmit);

        if (isSuccessful) {
          // message.success("Form submitted successfully!");
          setIsModalVisible(true); // Show the modal
        } else {
          // message.error("Failed to submit the form. Please try again.");
        }
      } catch (error) {
        message.error("An error occurred during submission.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      message.error("Please complete all required fields before submitting.");
    }
  };

  
  
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const salaryOptions = [
    "50,000 - 100,000",
    "100,000 - 200,000",
    "200,000 - 300,000",
    "300,000 - 400,000",
    "400,000 - 500,000",
    "500,000 - 600,000",
    "600,000 - 700,000",
    "700,000 - 800,000",
    "800,000 - 900,000",
    "900,000 - 1,000,000",
    "1,000,000+",
  ];

  return (
    <>
      <div
        className="flex flex-col items-center justify-center rounded-lg lg:w-[700px] h-[726px] gap-10 lg:border border-[#D0D2D6]"
        style={{ fontFamily: "Lato" }}
      >
        <div
          className="flex justify-center font-bold text-center text-[24px] leading-[30.17px] text-[#374151]"
          style={{ fontFamily: "Merriweather" }}
        >
          <p>Work Preference</p>
        </div>
        <form
          className="flex flex-col gap-10 lg:w-[unset] w-[85%] mx-auto"
          onSubmit={handleSubmit}
        >
          {/* Work Type Section */}
          <div className="flex flex-col">
            <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-2 text-[16px]">
              Work Type
            </label>
            <div className="flex flex-col ml-4 gap-3">
              <label className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  value="Remote"
                  checked={workType.includes("Remote")}
                  onChange={handleWorkTypeChange}
                  className="text-gray-600"
                />
                Remote
              </label>
              <label className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  value="Hybrid"
                  checked={workType.includes("Hybrid")}
                  onChange={handleWorkTypeChange}
                  className="text-gray-600"
                />
                Hybrid
              </label>
              <label className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  value="On-Site"
                  checked={workType.includes("On-Site")}
                  onChange={handleWorkTypeChange}
                  className="text-gray-600"
                />
                On-Site
              </label>
            </div>
          </div>

          {/* Employment Type Section */}
          <div className="flex flex-col">
            <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-2 text-[16px]">
              Employment Type
            </label>
            <div className="flex flex-col ml-4 gap-3">
              <label className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  value="Full-Time"
                  checked={employmentType.includes("Full-Time")}
                  onChange={handleEmploymentTypeChange}
                  className="text-gray-600"
                />
                Full-Time
              </label>
              <label className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  value="Part-Time"
                  checked={employmentType.includes("Part-Time")}
                  onChange={handleEmploymentTypeChange}
                  className="text-gray-600"
                />
                Part-Time
              </label>
              <label className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  value="Contract"
                  checked={employmentType.includes("Contract")}
                  onChange={handleEmploymentTypeChange}
                  className="text-gray-600"
                />
                Contract
              </label>
              <label className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  value="Freelance"
                  checked={employmentType.includes("Freelance")}
                  onChange={handleEmploymentTypeChange}
                  className="text-gray-600 "
                />
                Freelance
              </label>
            </div>
          </div>

          {/* Salary Scale Section */}
          <div className="flex flex-col">
            <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-2">
              Salary Scale
            </label>
            <select
              value={salaryScale}
              onChange={handleSalaryScaleChange}
              className="border bg-[#ffff] rounded-[16px] p-[16px] h-[54px] outline-none"
            >
              {/* <option value="" disabled>
                Select Salary Scale
              </option> */}
              {salaryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons Section */}
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
              disabled={!isFormValid || isSubmitting}
              className={`text-[18px] p-[16px] rounded-[16px] h-[54px] w-[195px] leading-[21.6px] font-semibold ${
                isFormValid && !isSubmitting
                  ? "bg-[#1E3A8A] text-white"
                  : "bg-[#B9C2DB] text-[#98A4C9]"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <ConfirmationModal 
                visible={isModalVisible}
                onCancel={handleModalCancel}
            />
    </>
  );
};

export default WorkPreferenceForm;
