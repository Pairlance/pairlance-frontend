import "../index.css";
import MultiStepForm from "../views/auth/candidate/MultiStepForm";
import RecruiterCandidateMatch from "../views/auth/recruiter/RecruiterCandidateMatch";
import RecruiterMultiStepForm from "../views/auth/recruiter/RecruiterMultiStepForm";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import RecruiterEmail from "../views/submitEmail/EmailForm";
import ScrollToTop from "../ScrollToTop";
  
export const Router=()=> {
  return (
    <>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/candidate" element={<MultiStepForm />} />
        <Route path="/recruiter" element={<RecruiterMultiStepForm />} />
        <Route path="/matching" element={<RecruiterCandidateMatch />} />
        <Route path="/email" element={<RecruiterEmail />} />
      </Routes>
    </>
  );
}
