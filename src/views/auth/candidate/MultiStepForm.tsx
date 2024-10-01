import React, { useState } from "react";
import NavBar from "../../../components/navBar/NavBar";
import Footer from "../../../components/footer/Footer";
import HeroBanner from "../../../components/common/HeroBanner";
import StepProgress from "../../../components/common/StepProgress";
import PersonalInformationStep from "../../../components/PersonalInformationStep/PersonalInformationStep";
import UploadCVStep from "../../../components/UploadCVStep/UploadCVStep";
import { Pitch } from "../../../components/pitch/Pitch";
import Details from "../../../components/professionalDetail/Details";
import JobLocationPref from "../../../components/location/JobLocationPref";
import WorkPreferenceForm from "../../../components/work-preference/WorkPref";
import axios from "axios";
import { message } from "antd";


interface PersonalInfo {
  full_name: string;
  gender: string;
  phoneNumber: string;
  email: string;
  photo: string;
}

interface Details {
  selectedRoles: string[];
  yearsOfExperience: string;
  roleLevel: string;
}

interface LocationPref {
  selectedLocations: string[];
}

interface WorkPref {
  workType: string;
  salaryScale: string;
  employmentType: string;
}

interface FormData {
  cv: File | null;
  personalInfo: PersonalInfo;
  pitch: { text: string };
  details: Details;
  locationPref: LocationPref;
  workPref: WorkPref;
}

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); 
  const totalSteps = 6;

  const [formData, setFormData] = useState<FormData>({
    cv: null,
    personalInfo: {
      full_name: "",
      gender: "",
      email: "",
      phoneNumber: "",
      photo: "",
    },
    pitch: { text: "" },
    details: {
      selectedRoles: [],
      roleLevel: "",
      yearsOfExperience: "",
    },
    locationPref: { selectedLocations: [] },
    workPref: {
      workType: "",
      salaryScale: "",
      employmentType: "",
    },
  });


   
   const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto', 
    });
  };

 
  const handleNext = async (stepData?: any): Promise<boolean> => {
    try {
      updateFormData(stepData, currentStep);

      if (currentStep < totalSteps) {
        scrollToTop();
        setCurrentStep(currentStep + 1);
        return true;
      } else {
        await handleSubmit();
        // console.log("Form submitted successfully");
        return true;
      }
    } catch (error) {
      // console.error("Submission failed", error);
      return false;
    }
  };

  // Handle data update for each step
  const updateFormData = (stepData: any, step: number) => {
    setFormData((prevState) => {
      switch (step) {
        case 1:
          return { ...prevState, cv: stepData };
        case 2:
          return { ...prevState, personalInfo: stepData };
        case 3:
          return { ...prevState, pitch: stepData };
        case 4:
          return { ...prevState, details: stepData };
        case 5:
          return { ...prevState, locationPref: stepData };
        case 6:
          return { ...prevState, workPref: stepData };
        default:
          return prevState;
      }
    });
  };

  // Function to move to the previous step
  const handleBack = () => {
    if (currentStep > 1) {
      scrollToTop();
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to handle submission of all data
  const handleSubmit = async () => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
  
    try {
      const formDataToSend = new FormData();
  
      // Validation check for missing fields before appending to FormData
      if (!formData.personalInfo.full_name) {
        throw new Error("Full name is required");
      }
      if (!formData.personalInfo.gender) {
        throw new Error("Gender is required");
      }
      if (!formData.personalInfo.email) {
        throw new Error("Email is required");
      }
      if (!formData.personalInfo.photo) {
        throw new Error("Profile picture is required");
      }
      if (!formData.personalInfo.phoneNumber) {
        throw new Error("Phone number is required");
      }
      if (!formData.pitch.text) {
        throw new Error("Summary pitch is required");
      }
      if (!formData.details.yearsOfExperience) {
        throw new Error("Years of experience is required");
      }
      if (!formData.details.roleLevel) {
        throw new Error("Role level is required");
      }
  
      
      if (formData.cv) {
        formDataToSend.append("resume_url", formData.cv); 
      }
  
      
      formDataToSend.append("full_name", formData.personalInfo.full_name);
      formDataToSend.append("gender", formData.personalInfo.gender);
      formDataToSend.append("email", formData.personalInfo.email);
      formDataToSend.append("image_url", formData.personalInfo.photo); // Profile picture
      formDataToSend.append("phone_number", formData.personalInfo.phoneNumber);
      formDataToSend.append("summary_pitch", formData.pitch.text);
      formDataToSend.append("years_of_experience", formData.details.yearsOfExperience);
      formDataToSend.append("role_level", formData.details.roleLevel);
  
      
      formDataToSend.append("work_type", JSON.stringify(formData.workPref.workType || []));
      formDataToSend.append("employment_type", JSON.stringify(formData.workPref.employmentType || []));
      formDataToSend.append("salary_range", formData.workPref.salaryScale || "");
      formDataToSend.append("job_locations", JSON.stringify(formData.locationPref.selectedLocations || []));
      formDataToSend.append("job_roles", JSON.stringify(formData.details.selectedRoles || []));
  
      
      // for (const [key, value] of formDataToSend.entries()) {
      //   console.log(`${key}:`, value); 
      // }
  
      
       await axios.post(
        `${apiUrl}/api/upload-candidate`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
  
      // console.log("Form data submitted successfully!", response.data);
      return true;
    } catch (error: any) {
      // console.error("Error submitting form data", error);
  
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
  
        Object.keys(serverErrors).forEach((field) => {
          message.error(`${field}: ${serverErrors[field]}`);
        });
      } else if (error.message) {
      } else {
        message.error("An unexpected error occurred");
      }
  
      throw error; 
    }
  };
  
  
  
  

  // Function to handle step click
  const handleStepClick = (step: number) => {
    // console.log(`Step clicked: ${step}`);
    setCurrentStep(step);
  };

  // Conditionally render the current step
const renderStep = () => {
  switch (currentStep) {
    case 1:
      return (
        <UploadCVStep
          onNext={handleNext}
          formData={formData.cv} // Pass CV data
        />
      );
    case 2:
      return (
        <PersonalInformationStep
          onNext={handleNext}
          onBack={handleBack}
          formData={formData.personalInfo}
        />
      );
    case 3:
      return (
        <Pitch
          onNext={handleNext}
          onBack={handleBack}
          formData={formData.pitch} 
        />
      );
    case 4:
      return (
        <Details
          onNext={handleNext}
          onBack={handleBack}
          formData={formData.details} 
        />
      );
    case 5:
      return (
        <JobLocationPref
          onNext={handleNext}
          onBack={handleBack}
          formData={formData.locationPref} 
        />
      );
    case 6:
      return (
        <WorkPreferenceForm
          onNext={handleNext}
          onBack={handleBack}
          // formData={formData.workPref} 
        />
      );
    default:
      return (
        <PersonalInformationStep
          onNext={handleNext}
          onBack={handleBack}
          formData={formData.personalInfo} 
        />
      );
  }
};


  return (
    <>
      <NavBar />
      <div
        className="flex flex-col lg:justify-center lg:items-center"
        style={{ fontFamily: "Lato" }}
      >
        <div className="w-full">
          <HeroBanner
            backgroundImage="/src/assets/hero2.jpg"
            title="You're Just a Few Steps Away from Your Next Opportunity!"
            subtitle="Upload your CV and complete your profile in a few simple steps to connect with top recruiters."
          />
        </div>

        <div className="mt-8">
          <StepProgress
            currentStep={currentStep}
            totalSteps={totalSteps}
            completedColor="#1E3A8A"
            upcomingColor="#FFFF"
            borderColor="#1E3A8A"
            onStepClick={handleStepClick} 
          />
        </div>

        <div className="my-20 lg:w-[700px]">
          {renderStep()} 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MultiStepForm;
