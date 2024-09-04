// import PersonalInformationStep from "../../components/PersonalInformationStep/PersonalInformationStep";
// import UploadCVStep from "../../components/UploadCVStep/UploadCVStep";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navBar/NavBar";
import FAQSection from "./faqs/Faqs";
import { Hero } from "./hero/Hero";
import { HowItWorks } from "./howitworks/HowItWorks";
import KeyBenefits from "./keybenefits/KeyBenefits";
import KeyFeatures from "./KeyFeatures/KeyFeatures";

const LandingPage: React.FC = () => {
  return (
    <div>
      <NavBar/>
      <Hero />
      <HowItWorks/>
      <KeyFeatures/>
      <KeyBenefits/>
      {/* <UploadCVStep/> */}
      {/* <PersonalInformationStep/> */}
      <FAQSection/>
      <Footer/>
    </div>
  )
}

export default LandingPage;