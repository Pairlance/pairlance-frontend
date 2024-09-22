import React, { useState } from "react";
import NavBar from "../../../components/navBar/NavBar";
import Footer from "../../../components/footer/Footer";
import HeroBanner from "../../../components/common/HeroBanner";
import StepProgress from "../../../components/common/StepProgress";
import RecruiterJobLocation from "../../../components/location/RecruiterJobLocation";
import RecruiterWorkPreferenceForm from "../../../components/work-preference/RecruiterWorkPref";
import axios, { AxiosError } from "axios";
import RecruiterJobDetails from "../../../components/professionalDetail/RecruiterjobDetail";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { message } from "antd"; // Import Ant Design message component

interface FormData {
  jobDetails: {
    years_of_experience: string;
    role_level: string;
    job_roles: string[];
  };
  jobLocations: {
    job_locations: string[];
    gender: string;
  };
  workPreferences: {
    workType: string[];
    employmentType: string[];
    salaryScale: string;
  };
}

const RecruiterMultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation

  const [formData, setFormData] = useState<FormData>({
    jobDetails: {
      years_of_experience: "",
      role_level: "",
      job_roles: [],
    },
    jobLocations: {
      job_locations: [],
      gender: "",
    },
    workPreferences: {
      workType: [],
      employmentType: [],
      salaryScale: "",
    },
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataSubmit = async (data: any): Promise<void> => {
    console.log(`Data at Step ${currentStep}:`, data);

    switch (currentStep) {
      case 1:
        setFormData((prevData) => {
          const updatedData = {
            ...prevData,
            jobDetails: {
              ...prevData.jobDetails,
              role_level: data.role_level,
              years_of_experience: data.yearsOfExperience,
              job_roles: data.selectedRoles,
            },
          };
          console.log("Updated FormData after Step 1:", updatedData);
          return updatedData;
        });
        break;
      case 2:
        setFormData((prevData) => {
          const updatedData = {
            ...prevData,
            jobLocations: {
              ...prevData.jobLocations,
              job_locations: data.selectedLocations,
              gender: data.gender,
            },
          };
          console.log("Updated FormData after Step 2:", updatedData);
          return updatedData;
        });
        break;
      case 3:
        setFormData((prevData) => {
          const updatedData = {
            ...prevData,
            workPreferences: {
              ...prevData.workPreferences,
              workType: data.workType || [],
              employmentType: data.employmentType || [],
              salaryScale: data.salaryScale || "",
            },
          };
          console.log("Updated FormData after Step 3:", updatedData);
          return updatedData;
        });

        const submissionData = {
          years_of_experience:
            data.yearsOfExperience || formData.jobDetails.years_of_experience,
          role_level: data.role_level || formData.jobDetails.role_level,
          job_roles: data.selectedRoles || formData.jobDetails.job_roles,
          job_locations: formData.jobLocations.job_locations,
          gender: formData.jobLocations.gender,
          work_type: data.workType || formData.workPreferences.workType,
          employment_type:
            data.employmentType || formData.workPreferences.employmentType,
          salary_ranges: data.salaryScale || formData.workPreferences.salaryScale,
          email: "mathias@gmail.com", // Hardcoded email for testing
        };

        console.log("Final submission data:", submissionData);

        await handleSubmit(submissionData);
        return; // Prevent further actions after submission
      default:
        break;
    }

    handleNext();
  };

  const handleSubmit = async (submissionData: any) => {
    console.log("Sending data to API:", submissionData);
    const apiUrl = import.meta.env.VITE_BASE_URL;

    try {
      const response = await axios.post(
        `${apiUrl}/api/match-recruiter`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API response:", response.data);

      // Display success message
      message.success("Form submitted successfully! Redirecting...", 2); // Show success for 2 seconds

      // Delay the navigation to /matching by 2.5 seconds
      setTimeout(() => {
        const candidates = response.data.data.candidates; // Access candidates array
        console.log(candidates); // Log to check the structure
        navigate("/matching", {
          state: {
            candidates: candidates, // Pass candidates to matching page
          },
        });
      }, 2500);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "API submission error:",
        axiosError.response?.data || axiosError.message
      );
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RecruiterJobDetails onNext={handleDataSubmit} />;
      case 2:
        return (
          <RecruiterJobLocation onNext={handleDataSubmit} onBack={handleBack} />
        );
      case 3:
        return (
          <RecruiterWorkPreferenceForm
            onNext={handleDataSubmit}
            onBack={handleBack}
          />
        );
      default:
        return <RecruiterJobDetails onNext={handleDataSubmit} />;
    }
  };

  return (
    <>
      <NavBar />
      <div
        className="flex flex-col justify-center items-center"
        style={{ fontFamily: "Lato" }}
      >
        <HeroBanner
          backgroundImage="/src/assets/edmond.svg"
          title="You're One Step Closer to Finding the Perfect Candidate!"
          subtitle="Complete the quick job details form to start matching with qualified candidates tailored to your needs"
        />
        <StepProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          completedColor="#1E3A8A"
          upcomingColor="#FFFF"
          borderColor="#1E3A8A"
        />
        <div className="my-20 lg:w-[700px]">{renderStep()}</div>
      </div>
      <Footer />
    </>
  );
};

export default RecruiterMultiStepForm;
