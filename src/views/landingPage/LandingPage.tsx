// import PersonalInformationStep from "../../components/PersonalInformationStep/PersonalInformationStep";
// import UploadCVStep from "../../components/UploadCVStep/UploadCVStep";
import FAQSection from "./faqs/Faqs";
import { Hero } from "./hero/Hero";
import { HowItWorks } from "./howitworks/HowItWorks";
import KeyBenefits from "./keybenefits/KeyBenefits";
import KeyFeatures from "./KeyFeatures/KeyFeatures";

const LandingPage: React.FC = () => {
  return (
    <div>
      <Hero />
      <HowItWorks/>
      <KeyFeatures/>
      <KeyBenefits/>
      {/* <UploadCVStep/> */}
      {/* <PersonalInformationStep/> */}
      <FAQSection/>
    </div>
  )
}

export default LandingPage;