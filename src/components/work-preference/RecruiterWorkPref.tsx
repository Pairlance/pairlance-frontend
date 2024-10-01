import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

interface RecruiterWorkPreferenceProps {
  formData: {
    workType: string[];
    employmentType: string[];
    salary_range: string;
  };
  onBack?: () => void;
  onNext?: (data: {
    workType: string[];
    employmentType: string[];
    salary_range: string;
  }) => Promise<any>;
}

const RecruiterWorkPreferenceForm: React.FC<RecruiterWorkPreferenceProps> = ({
  formData,
  onBack,
  onNext,
}) => {
  const [workType, setWorkType] = useState<string[]>(formData.workType || []); 
  const [employmentType, setEmploymentType] = useState<string[]>(formData.employmentType || []);
  const [salary_range, setSalaryScale] = useState<string>(formData.salary_range || ""); 
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(workType.length > 0 && employmentType.length > 0 && !!salary_range);
  }, [workType, employmentType, salary_range]);

  const handleWorkTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWorkType((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleEmploymentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmploymentType((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSalaryScaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSalaryScale(e.target.value); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      setIsSubmitting(true);

      try {
        const data = { workType, employmentType, salary_range };
        if (onNext) {
          const response = await onNext(data);

          if (response) {
            message.success("Form submitted successfully!");
            setTimeout(() => {
              navigate("/matching", { state: { candidates: response } });
            }, 1000);
          }
        }
      } catch (error) {
        // message.error("Failed to submit the form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      message.error("Please complete all required fields before submitting.");
    }
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
    <div
      className="flex flex-col items-center justify-center rounded-lg lg:w-[700px] lg:h-[726px] gap-10 lg:border border-[#D0D2D6]"
      style={{ fontFamily: "Lato" }}
    >
      <div
        className="flex justify-center font-bold text-center text-[24px] leading-[30.17px] text-[#374151] xl:mt-10"
        style={{ fontFamily: "Merriweather" }}
      >
        <p>Work Specifications</p>
      </div>
      <form
        className="flex flex-col gap-10 lg:mx-auto lg:w-[70%] w-full p-3 lg:p-[unset]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-2 text-[16px]">
            Work Type
          </label>
          <div className="flex flex-col ml-4 gap-3">
            {["Remote", "Hybrid", "On-Site"].map((type) => (
              <label className="flex gap-3 items-center" key={type}>
                <input
                  type="checkbox"
                  value={type}
                  checked={workType.includes(type)}
                  onChange={handleWorkTypeChange}
                  className="text-gray-600"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-2 text-[16px]">
            Employment Type
          </label>
          <div className="flex flex-col ml-4 gap-3">
            {["Full-Time", "Part-Time", "Contract", "Freelance"].map((type) => (
              <label className="flex gap-3 items-center" key={type}>
                <input
                  type="checkbox"
                  value={type}
                  checked={employmentType.includes(type)}
                  onChange={handleEmploymentTypeChange}
                  className="text-gray-600"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-2">
            Salary Scale
          </label>
          <select
            value={salary_range}
            onChange={handleSalaryScaleChange}
            className="border bg-[#ffff] rounded-[16px] h-[54px] p-[16px] outline-none"
          >
            <option value="" disabled>
              Select Salary
            </option>
            {salaryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between gap-5">
          <button
            type="button"
            onClick={onBack}
            className="border border-[#1E3A8A] lg:text-[18px] p-[16px] rounded-[16px] h-[54px] w-[50%] leading-[21.6px] font-semibold"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`lg:text-[18px] p-[16px] rounded-[16px] h-[54px] w-[50%] md:leading-[21.6px] md:font-semibold ${
              isFormValid && !isSubmitting
                ? "bg-[#1E3A8A] text-white"
                : "bg-[#D0D2D6] text-[#A3A3A3]"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterWorkPreferenceForm;
