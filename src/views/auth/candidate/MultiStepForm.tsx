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

// Define TypeScript interfaces for form data
interface PersonalInfo {
  full_name: string;
  gender: string;
  // phone_number: string;
  phoneNumber: string;
  email: string;
  // image_url: string;
  photo: string;
}

interface Details {
  selectedRoles: string[];
  // years_of_experience: string;
  yearsOfExperience: string;
  // role_level: string;
  roleLevel: string;
}

interface LocationPref {
  selectedLocations: string[];
}

interface WorkPref {
  // work_type: string[];
  // employment_type: string[];
  // salary_ranges: string;
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
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const totalSteps = 6;

  // State to hold all form data
  const [formData, setFormData] = useState<FormData>({
    cv: null,
    personalInfo: {
      full_name: "",
      gender: "",
      // phone_number: "",
      email: "",
      // image_url: "",
      phoneNumber: "",
      photo: "",
    },
    pitch: { text: "" },
    details: {
      selectedRoles: [],
      // years_of_experience: "",
      // role_level: "",
      roleLevel: "",
      yearsOfExperience: "",
    },
    locationPref: { selectedLocations: [] },
    workPref: {
      // work_type: [],
      // employment_type: [],
      // salary_ranges: "",
      workType: "",
      salaryScale: "",
      employmentType: "",
    },
  });

  // Function to move to the next step
  const handleNext = async (stepData?: any): Promise<boolean> => {
    try {
      // Ensure form data is updated with current step's data
      console.log("Current Step Data:", stepData);
      updateFormData(stepData, currentStep);

      if (currentStep < totalSteps) {
        // Move to the next step
        setCurrentStep(currentStep + 1);
        return true;
      } else {
        // On the final step, submit all data
        await handleSubmit(); // Wait for form submission to complete
        console.log("Form submitted successfully");
        // Add navigation or success message logic here
        return true;
      }
    } catch (error) {
      console.error("Submission failed", error);
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
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to handle submission of all data
  const handleSubmit = async () => {
    const apiUrl = import.meta.env.VITE_BASE_URL;
    try {
      const formDataToSend = {
        cv_url: formData.cv, // Handle file data properly
        full_name: formData.personalInfo.full_name || "",
        gender: formData.personalInfo.gender || "",
        email: formData.personalInfo.email || "",
        image_url: formData.personalInfo.photo || "",
        phone_number: formData.personalInfo.phoneNumber || "",
        summary_pitch: formData.pitch.text || "",
        years_of_experience: formData.details.yearsOfExperience || "",
        role_level: formData.details.roleLevel || "",
        work_type: formData.workPref.workType || [], // Include work_type data
        employment_type: formData.workPref.employmentType, // Include employment_type data
        salary_ranges: formData.workPref.salaryScale || "", // Include salary_ranges data
        job_locations: formData.locationPref.selectedLocations || [],
        job_roles: formData.details.selectedRoles || [],
      };

      console.log("Detail sent:", formDataToSend);

      // Send the data to the API
      const response = await axios.post(
        `${apiUrl}/api/upload-candidate`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form data submitted successfully!", response.data);
      return true; // Indicate that the submission was successful
    } catch (error) {
      console.error("Error submitting form data", error);
      throw error; // Rethrow the error to handle it in handleNext
    }
  };

  // Function to handle step click
  const handleStepClick = (step: number) => {
    console.log(`Step clicked: ${step}`);
    setCurrentStep(step);
  };

  // Conditionally render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UploadCVStep onNext={handleNext} />;
      case 2:
        return (
          <PersonalInformationStep onNext={handleNext} onBack={handleBack} />
        );
      case 3:
        return <Pitch onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Details onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <JobLocationPref onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <WorkPreferenceForm onNext={handleNext} onBack={handleBack} />;
      default:
        return (
          <PersonalInformationStep onNext={handleNext} onBack={handleBack} />
        );
    }
  };

  return (
    <>
      <NavBar />
      <div
        className="flex flex-col justify-center items-center"
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
            onStepClick={handleStepClick} // Make steps clickable
          />
        </div>

        <div className="my-20 lg:w-[700px]">
          {renderStep()} {/* Render the current step */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MultiStepForm;
