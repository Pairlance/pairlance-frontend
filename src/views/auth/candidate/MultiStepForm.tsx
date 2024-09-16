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
import axios from "axios"; // Assuming you're using axios for the submission

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const totalSteps = 6;

  // State to hold all form data
  const [formData, setFormData] = useState({
    cv: null,
    personalInfo: {},
    pitch: "",
    details: {},
    locationPref: {},
    workPref: {}
  });

  // Handle data update for each step
  const updateFormData = (stepData: any, step: number) => {
    switch (step) {
      case 1:
        setFormData({ ...formData, cv: stepData });
        break;
      case 2:
        setFormData({ ...formData, personalInfo: stepData });
        break;
      case 3:
        setFormData({ ...formData, pitch: stepData });
        break;
      case 4:
        setFormData({ ...formData, details: stepData });
        break;
      case 5:
        setFormData({ ...formData, locationPref: stepData });
        break;
      case 6:
        setFormData({ ...formData, workPref: stepData });
        break;
      default:
        break;
    }
  };

  // Function to handle submission of all data
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      
      // Append each property of formData to FormData
      for (const [key, value] of Object.entries(formData)) {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (typeof value === 'object') {
          formDataToSend.append(key, JSON.stringify(value)); // Convert objects to JSON strings
        } else {
          formDataToSend.append(key, value as string);
        }
      }
  
      await axios.post("https://pairlance.vercel.app/api/upload-candidate", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log("Form data submitted successfully!");
    } catch (error) {
      console.error("Error submitting form data", error);
    }
  };
  

  // Function to move to the next step
  const handleNext = (stepData: any) => {
    console.log('Current Step Data:', stepData); 
    updateFormData(stepData, currentStep);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // On final step, submit all data
      handleSubmit();
    }
  };

  // Function to move to the previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
        return <PersonalInformationStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Pitch onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Details onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <JobLocationPref onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <WorkPreferenceForm onNext={handleNext} onBack={handleBack} />;
      default:
        return <PersonalInformationStep onNext={handleNext} onBack={handleBack} />;
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center" style={{ fontFamily: "Lato" }}>
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
