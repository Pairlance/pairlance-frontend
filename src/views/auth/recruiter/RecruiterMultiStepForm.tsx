import React, { useState } from "react";
import NavBar from "../../../components/navBar/NavBar";
import Footer from "../../../components/footer/Footer";
import HeroBanner from "../../../components/common/HeroBanner";
import StepProgress from "../../../components/common/StepProgress";
import RecruiterJobLocation from "../../../components/location/RecruiterJobLocation";
import RecruiterWorkPreferenceForm from "../../../components/work-preference/RecruiterWorkPref";
import axios, { AxiosError } from "axios";
import RecruiterJobDetails from "../../../components/professionalDetail/RecruiterjobDetail";

interface FormData {
  jobDetails: {
    years_of_experience: string;
    role_level: string;
    job_roles: string[];
  };
  jobLocations:{
    job_locations:string[];
    gender:string;
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

  const [formData, setFormData] = useState<FormData>({
    jobDetails: {
      // gender: "",
      // email: "",
      years_of_experience: "",
      role_level: "",
      job_roles: [],
      // gender: ""
    },
    jobLocations:{
      job_locations: [],
      gender: ""
    } ,
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
          console.log("Data from step 1:", updatedData);
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
          console.log("Data from step 2:", updatedData);
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
          console.log("Data from step 3:", updatedData);
          return updatedData;
        });
  
        // Call handleSubmit with the updated data
        const submissionData = {
          years_of_experience: data.yearsOfExperience || formData.jobDetails.years_of_experience,
          role_level: data.role_level || formData.jobDetails.role_level,
          job_roles: data.selectedRoles || formData.jobDetails.job_roles,
          job_locations: formData.jobLocations.job_locations,
          gender: formData.jobLocations.gender,
          work_type: data.workType || formData.workPreferences.workType,
          employment_type: data.employmentType || formData.workPreferences.employmentType,
          salary_ranges: data.salaryScale || formData.workPreferences.salaryScale,
          email:"mathias@gmail.com"
        };
        
        await handleSubmit(submissionData); // Pass submissionData directly
        return; // Prevents handleNext from being called
      default:
        break;
    }
    handleNext();
  };

  const handleSubmit = async (submissionData: any) => {
    console.log("Final data being sent to API:", submissionData);
  
    try {
      const response = await axios.post("https://pairlance.vercel.app/api/match-recruiter", submissionData);
      console.log("Submission successful:", response.data);
      // Handle successful submission (e.g., show a success message)
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Submission error:", axiosError.response?.data || axiosError.message);
      // Handle submission error (e.g., show an error message)
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
          <RecruiterWorkPreferenceForm onNext={handleDataSubmit} onBack={handleBack} />
        );
      default:
        return <RecruiterJobDetails onNext={handleDataSubmit} />;
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center" style={{ fontFamily: "Lato" }}>
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
        <div className="my-20 lg:w-[700px]">
          {renderStep()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecruiterMultiStepForm;
