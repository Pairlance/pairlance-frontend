// import PersonalInformationStep from "./components/PersonalInformationStep/PersonalInformationStep";
// import UploadCVStep from "./components/UploadCVStep/UploadCVStep";
import "./index.css";
import MultiStepForm from "./views/auth/candidate/MultiStepForm";
import LandingPage from "./views/landingPage/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/candidate" element={<MultiStepForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
