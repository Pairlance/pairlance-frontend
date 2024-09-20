import "../index.css";
import MultiStepForm from "../views/auth/candidate/MultiStepForm";
import RecruiterCandidateMatch from "../views/auth/recruiter/RecruiterCandidateMatch";
import RecruiterMultiStepForm from "../views/auth/recruiter/RecruiterMultiStepForm";
import { Route, Routes } from "react-router-dom";
import EmailForm from "../components/emailForm/EmailSumisionForm";
import App from "../App";

export const Router=()=> {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/candidate" element={<MultiStepForm />} />
        <Route path="/recruiter" element={<RecruiterMultiStepForm />} />
        <Route path="/matching" element={<RecruiterCandidateMatch />} />
        <Route path="/email" element={<EmailForm />} />
      </Routes>
    </>
  );
}
