import React, { useState } from "react";
import NavBar from "../../../components/navBar/NavBar";
import Footer from "../../../components/footer/Footer";
import HeroBanner from "../../../components/common/HeroBanner";
import StepProgress from "../../../components/common/StepProgress";
import RecruiterJobLocation from "../../../components/location/RecruiterJobLocation";
import RecruiterWorkPreferenceForm from "../../../components/work-preference/RecruiterWorkPref";
import axios, { AxiosError } from "axios";
import RecruiterJobDetails from "../../../components/professionalDetail/RecruiterjobDetail";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

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
  const navigate = useNavigate();

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto', 
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      scrollToTop();
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      scrollToTop();
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataSubmit = async (data: any): Promise<void> => {
    switch (currentStep) {
      case 1:
        setFormData((prevData) => ({
          ...prevData,
          jobDetails: {
            years_of_experience: data.yearsOfExperience,
            role_level: data.role_level,
            job_roles: data.selectedRoles,
          },
        }));
        break;
      case 2:
        setFormData((prevData) => ({
          ...prevData,
          jobLocations: {
            job_locations: data.selectedLocations,
            gender: data.gender,
          },
        }));
        break;
      case 3:
        setFormData((prevData) => ({
          ...prevData,
          workPreferences: {
            workType: data.workType || [],
            employmentType: data.employmentType || [],
            salaryScale: data.salaryScale || "",
          },
        }));

        const submissionData = {
          ...formData.jobDetails,
          ...formData.jobLocations,
          ...formData.workPreferences,
        };

        await handleSubmit(submissionData);
        return;
      default:
        break;
    }

    handleNext();
  };

  const handleSubmit = async (submissionData: any) => {
    const apiUrl = import.meta.env.VITE_BASE_URL;

    const formattedSubmissionData = {
      gender: submissionData.gender,
      years_of_experience: submissionData.years_of_experience,
      role_level: submissionData.role_level,
      work_type: submissionData.workType, 
      employment_type: submissionData.employmentType,
      salary_range: submissionData.salaryScale, 
      job_locations: submissionData.job_locations, 
      job_roles: submissionData.job_roles,
    };
  
    
    // console.log("Submitting data to API:", formattedSubmissionData);
  
    try {
      const response = await axios.post(
        `${apiUrl}/api/match-recruiter`,
        formattedSubmissionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const recruiterId = response.data?.data?.recruiterId;
      const candidates = response.data?.data?.candidates || [];
  
      if (candidates.length > 0) {
        message.success("Candidates matched! Redirecting...", 2);
        setTimeout(() => {
          navigate("/matching", {
            state: {
              candidates: candidates,
              recruiterId: recruiterId,
            },
          });
        }, 2500);
      } else {
        message.warning("No candidates matched your criteria.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || "An error occurred during submission.";
      message.error(errorMessage);
    }
  };
  
  

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RecruiterJobDetails formData={formData.jobDetails} onNext={handleDataSubmit} />;
      case 2:
        return <RecruiterJobLocation formData={formData.jobLocations} onNext={handleDataSubmit} onBack={handleBack} />;
      case 3:
        return <RecruiterWorkPreferenceForm formData={formData.workPreferences} onNext={handleDataSubmit} onBack={handleBack} />;
      default:
        return <RecruiterJobDetails formData={formData.jobDetails} onNext={handleDataSubmit} />;
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:justify-center lg:items-center" style={{ fontFamily: "Lato" }}>
        <HeroBanner
          backgroundImage="/src/assets/edmond.svg"
          title="You're One Step Closer to Finding the Perfect Candidate!"
          subtitle="Complete the quick job details form to start matching with qualified candidates tailored to your needs"
        />
        <div className="flex justify-center">
          <StepProgress
            currentStep={currentStep}
            totalSteps={totalSteps}
            completedColor="#1E3A8A"
            upcomingColor="#FFFF"
            borderColor="#1E3A8A"
            onStepClick={handleStepClick}
          />
        </div>
        <div className="my-20 lg:w-[700px]">{renderStep()}</div>
      </div>
      <Footer />
    </>
  );
};

export default RecruiterMultiStepForm;
