import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import "antd/dist/reset.css";
import { useLocation } from "react-router-dom";
import { goodtick } from "../../assets";
import axios from "axios";

const EmailSubmissionForm = () => {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const { cvUrls = [], candidateIds = [], recruiterId = '' } = location.state || {};

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
       
        const payload = {
            email: email,
            resume: cvUrls,
            matched_candidate_ids: candidateIds,
            recruiterId:recruiterId
        };

        // console.log("payload: ", payload);
        

        const apiUrl = import.meta.env.VITE_BASE_URL; 

        // console.log("Sending API Request:");
        // console.log("URL:", `${apiUrl}/email/send-email`);
        // console.log("Data:", payload);

        const response = await axios.post(`${apiUrl}/email/send-email`, payload, {
            headers: {
                "Content-Type": "application/json", 
            },
        });
        // console.log("API Response:", response.data);
        if (response.data.message === 'Email sent successfully') {
            setTimeout(() =>{
                setIsModalVisible(true); 
                setEmail("");
                setLoading(false);
            }, 1000);
        } else {
            throw new Error("Unexpected response from server"); 
        }

    } catch (error: any) {
        message.error("Submission failed. Please try again."); 
        // console.error("Submission failed:", error.response?.data || error.message);
    }
};



  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="flex justify-center items-center lg:border border-[#D0D2D6] lg:h-[726px] lg:w-[700px] mx-auto rounded-[16px] my-10"
      style={{ fontFamily: "Lato" }}
    >
      <div className="bg-white p-8 max-w-md flex flex-col gap-5">
        <h2
          className="text-[24px] font-bold text-center leading-[30.17px]"
          style={{ fontFamily: "Merriweather" }}
        >
          Provide Your Email
        </h2>
        <p className="text-center text-[#5F6774] text-[18px] leading-[21.6px] mb-8">
          Enter your email address to receive the selected candidates' CVs
          directly in your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[#5F6774] font-semibold mb-2 text-[16px] leading-[19.2px]"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              className="w-full h-[49px] p-[16px] border border-[#D0D2D6] rounded-[16px] bg-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!email}
            className={`w-full p-[16px] rounded-[16px] font-semibold text-[18px] leading-[21.6px] ${
              email ? "bg-[#1E3A8A] text-white" : "bg-[#B9C2DB] text-[#98A4C9]"
            }`}       >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <Modal
        open={isModalVisible}
          footer={null}
          onCancel={handleModalClose}
          centered
        >
          <div className="flex flex-col justify-center items-center h-[470px] w-[624px p-5 mx-auto">
            <div className="mb-6">
              <img src={goodtick} alt="Success" />
            </div>
            <h2
              className="text-xl font-bold text-center mb-4 w-[440px] h-[60px] leading-[30.17px]"
              style={{ fontFamily: "Merriweather" }}
            >
              Your email has been successfully submitted!
            </h2>
            <p className="text-center text-[#5F6774] text-[18px] mb-6 leading-[21.6px] lg:w-[476px]">
              The CVs of the selected candidates will be sent to the provided
              email address shortly.
            </p>
            <div className="flex flex-col lg:flex-row lg:space-x-4 gap-5 lg:gap-0 w-full">
              <Button
                type="default"
                onClick={() => (window.location.href = "/")}
                className="border border-[#1E3A8A] text-[#1E3A8A] p-[16px] h-[54px] rounded-[16px] w-full"
              >
                Return to Homepage
              </Button>
              <Button
                type="primary"
                onClick={() => (window.location.href = "/recruiter")}
                className="bg-[#1E3A8A] text-[#FFFFFF] p-[16px] rounded-[16px] h-[54px] w-full"
              >
                Find More Candidates
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default EmailSubmissionForm;
