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

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to move to the previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Conditionally render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UploadCVStep onNext={handleNext} />; // Only onNext passed
      case 2:
        return <PersonalInformationStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Pitch onNext={handleNext} onBack={handleBack} />;
      // Add more cases for other steps
      case 4:
        return <Details onNext={handleNext} onBack={handleBack} />;
      // Add more cases for other steps
      case 5:
        return <JobLocationPref onNext={handleNext} onBack={handleBack} />;
      // Add more cases for other steps
      case 6:
        return <WorkPreferenceForm  onBack={handleBack} />;
      // Add more cases for other steps
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
            currentStep={currentStep} // Update this based on the current step
            totalSteps={totalSteps} // Total number of steps
            completedColor="#1E3A8A" // Background color for completed steps
            upcomingColor="#FFFF" // Background color for upcoming steps
            borderColor="#1E3A8A" // Static border color for all steps
          />
        </div>

        <div className="my-20 w-[700px]">
          {renderStep()} {/* Render the current step */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MultiStepForm;
