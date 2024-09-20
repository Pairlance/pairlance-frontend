import React, { useState } from "react";
import NavBar from "../../../components/navBar/NavBar";
import Footer from "../../../components/footer/Footer";
import HeroBanner from "../../../components/common/HeroBanner";
import StepProgress from "../../../components/common/StepProgress";
import RecruiterJobDetails from "../../../components/professionalDetail/RecruiterjobDetail";
import RecruiterJobLocation from "../../../components/location/RecruiterJobLocation";
import RecruiterWorkPreferenceForm from "../../../components/work-preference/RecruiterWorkPref";

const RecruiterMultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const totalSteps = 3;

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
        // return <UploadCVStep onNext={handleNext} />;
        return <RecruiterJobDetails onNext={handleNext}  />;
      case 2:
        return <RecruiterJobLocation onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <RecruiterWorkPreferenceForm  onBack={handleBack} />;
        // return <Pitch onNext={handleNext} onBack={handleBack} />;
      // Add more cases for other steps
      // case 4:
      //   return <Details onNext={handleNext} onBack={handleBack} />;
      // // Add more cases for other steps
      // case 5:
      //   return <JobLocationPref onNext={handleNext} onBack={handleBack} />;
      // // Add more cases for other steps
      // case 6:
      //   return <WorkPreferenceForm  onBack={handleBack} />;
      // Add more cases for other steps
      default:
        return <RecruiterJobDetails onNext={handleNext}  />;
        // return <PersonalInformationStep onNext={handleNext} onBack={handleBack} />;
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center" style={{ fontFamily: "Lato" }}>
        <div className="w-full">
          <HeroBanner
            backgroundImage="/src/assets/edmond.svg"
            title="You're One Step Closer to Finding the Perfect Candidate!"
            subtitle="Complete the quick job details form to start matching with qualified candidates tailored to your needs"
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

        <div className="my-20 lg:w-[700px]">
          {renderStep()} {/* Render the current step */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecruiterMultiStepForm;
