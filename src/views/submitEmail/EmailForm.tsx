import React from "react";
import MatchingNavBar from "../../components/navBar/MatchingNavBar";
import Footer from "../../components/footer/Footer";
import EmailSummisionForm from "../../components/emailForm/EmailSumisionForm";
import NavBar from "../../components/navBar/NavBar";
// import { RecruiterProvider } from "../auth/recruiter/RecruiterContext";

const RecruiterEmail: React.FC = () => {
  return (
    <>
      {/* <RecruiterProvider> */}

      <div className="hidden lg:block">
        <MatchingNavBar />
      </div>
      <div className="block lg:hidden">
        <NavBar />
      </div>
      <EmailSummisionForm />
      <Footer />
      {/* </RecruiterProvider> */}
    </>
  );
};

export default RecruiterEmail;
