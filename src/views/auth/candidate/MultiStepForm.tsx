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
        const updatedFormData = updateFormData(stepData, currentStep);
        setFormData(updatedFormData);

        if (currentStep < totalSteps) {
            scrollToTop();
            setCurrentStep(currentStep + 1);
        } else {
            await handleSubmit(updatedFormData);
        }

        return true; 
    } catch (error) {
        // console.error("Error moving to next step or submitting", error);
        return false; 
    }
};


  const updateFormData = (stepData: any, step: number) => {
    switch (step) {
      case 1:
        return { ...formData, cv: stepData };
      case 2:
        return { ...formData, personalInfo: stepData };
      case 3:
        return { ...formData, pitch: stepData };
      case 4:
        return { ...formData, details: stepData };
      case 5:
        return { ...formData, locationPref: stepData };
      case 6:
        return { ...formData, workPref: stepData };
      default:
        return formData;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      scrollToTop();
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (updatedFormData: FormData) => {
    const apiUrl = import.meta.env.VITE_BASE_URL;

    try {
      const formDataToSend = new FormData();

      // Validate required fields
      if (!updatedFormData.personalInfo.full_name) {
        throw new Error("Full name is required");
      }
      if (!updatedFormData.personalInfo.gender) {
        throw new Error("Gender is required");
      }
      if (!updatedFormData.personalInfo.email) {
        throw new Error("Email is required");
      }
      if (!updatedFormData.personalInfo.phoneNumber) {
        throw new Error("Phone number is required");
      }
      if (!updatedFormData.pitch.text) {
        throw new Error("Summary pitch is required");
      }
      if (!updatedFormData.details.yearsOfExperience) {
        throw new Error("Years of experience is required");
      }
      if (!updatedFormData.details.roleLevel) {
        throw new Error("Role level is required");
      }

      // Append data to FormData
      if (updatedFormData.cv) {
        formDataToSend.append("resume_url", updatedFormData.cv);
      }
      formDataToSend.append("full_name", updatedFormData.personalInfo.full_name);
      formDataToSend.append("gender", updatedFormData.personalInfo.gender);
      formDataToSend.append("email", updatedFormData.personalInfo.email);
      if (updatedFormData.personalInfo.photo) {
        formDataToSend.append("image_url", updatedFormData.personalInfo.photo);
      }
      formDataToSend.append("phone_number", updatedFormData.personalInfo.phoneNumber);
      formDataToSend.append("summary_pitch", updatedFormData.pitch.text);
      formDataToSend.append("years_of_experience", updatedFormData.details.yearsOfExperience);
      formDataToSend.append("role_level", updatedFormData.details.roleLevel);
      formDataToSend.append("work_type", JSON.stringify(updatedFormData.workPref.workType || []));
      formDataToSend.append("employment_type", JSON.stringify(updatedFormData.workPref.employmentType || []));
      formDataToSend.append("salary_range", updatedFormData.workPref.salaryScale || "");
      formDataToSend.append("job_locations", JSON.stringify(updatedFormData.locationPref.selectedLocations || []));
      formDataToSend.append("job_roles", JSON.stringify(updatedFormData.details.selectedRoles || []));

      await axios.post(`${apiUrl}/api/upload-candidate`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // message.success("Form submitted successfully!");

    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "An error occurred";
        const detailedError = error.response.data.error || "";
        if (detailedError) {
          message.error(`${errorMessage}: ${detailedError}`);
        } else {
          message.error(errorMessage);
        }
      } else if (error.message) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UploadCVStep
            onNext={handleNext}
            formData={formData.cv}
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
        return null;
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:justify-center lg:items-center" style={{ fontFamily: "Lato" }}>
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
