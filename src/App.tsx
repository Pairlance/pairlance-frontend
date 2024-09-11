// import PersonalInformationStep from "./components/PersonalInformationStep/PersonalInformationStep";
// import UploadCVStep from "./components/UploadCVStep/UploadCVStep";
import "./index.css";
import MultiStepForm from "./views/auth/candidate/MultiStepForm";
import RecruiterCandidateMatch from "./views/auth/recruiter/RecruiterCandidateMatch";
import RecruiterMultiStepForm from "./views/auth/recruiter/RecruiterMultiStepForm";
import LandingPage from "./views/landingPage/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmailForm from "./views/submitEmail/EmailForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/candidate" element={<MultiStepForm />} />
          <Route path="/recruiter" element={<RecruiterMultiStepForm />} />
          <Route path="/matching" element={<RecruiterCandidateMatch />} />
          <Route path="/email" element={<EmailForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
