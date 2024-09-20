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
  phone_number: string;
  phoneNumber: string;
  email: string;
  image_url: string;
  photo: string;
}

interface Details {
  selectedRoles: string[];
  years_of_experience: string;
  yearsOfExperience: string;
  role_level: string;
  roleLevel: string;
}

interface LocationPref {
  selectedLocations: string[];
}

interface WorkPref {
  work_type: string[];
  employment_type: string[];
  salary_ranges: string;
  workType:string;
  salaryScale:string;
  employmentType:string;
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
      full_name: '',
      gender: '',
      phone_number: '',
      email: '',
      image_url: '',
      phoneNumber: "",
      photo: ""
    },
    pitch: { text: '' },
    details: {
      selectedRoles: [], years_of_experience: '', role_level: '', roleLevel: '',
      yearsOfExperience: ""
    },
    locationPref: { selectedLocations: [] },
    workPref: {
      workType: "",
      salaryScale: "",
      employmentType: "",
      work_type: [],
      employment_type: [],
      salary_ranges: ""
    }
  });

  // Handle data update for each step
  const updateFormData = (stepData: any, step: number) => {
    switch (step) {
      case 1:
        setFormData(prevState => ({ ...prevState, cv: stepData }));
        break;
      case 2:
        setFormData(prevState => ({ ...prevState, personalInfo: stepData }));
        break;
      case 3:
        setFormData(prevState => ({ ...prevState, pitch: stepData }));
        break;
      case 4:
        setFormData(prevState => ({ ...prevState, details: stepData }));
        break;
      case 5:
        setFormData(prevState => ({ ...prevState, locationPref: stepData }));
        break;
      case 6:
        setFormData(prevState => ({ ...prevState, workPref: stepData }));
        break;
      default:
        break;
    }
  };

  // Function to handle submission of all data
  const handleSubmit = async () => {
    try {
      const formDataToSend = {
        cv_url: formData.cv, // Handle file data properly
        full_name: formData.personalInfo.full_name || '',
        gender: formData.personalInfo.gender || '',
        email: formData.personalInfo.email || '',
        image_url: formData.personalInfo.photo || '',
        phone_number: formData.personalInfo.phoneNumber || '',
        summary_pitch: formData.pitch.text || '',
        years_of_experience: formData.details.yearsOfExperience || '',
        role_level: formData.details.roleLevel || '',
        work_type: formData.workPref.workType || [], // Include work_type data
        employment_type: formData.workPref.employmentType, // Include employment_type data
        salary_ranges: formData.workPref.salaryScale
        || '', // Include salary_ranges data
        job_locations: formData.locationPref.selectedLocations || [],
        job_roles: formData.details.selectedRoles || [],
      };
      console.log("detail sent:", formDataToSend);
  
      // Send the data to the API
      const response = await axios.post("https://pairlance.vercel.app/api/upload-candidate", formDataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log("Form data submitted successfully!", response.data);
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
      handleSubmit();
      // On final step, submit all data
      console.log('Final Form Data before submission:', formData);
      
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
