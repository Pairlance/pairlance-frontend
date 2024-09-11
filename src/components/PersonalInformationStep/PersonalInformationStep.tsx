import React, { useState, useEffect } from "react";
// import NavBar from "../navBar/NavBar";
// import Footer from "../footer/Footer";
// import HeroBanner from "../common/HeroBanner";
// import StepProgress from "../common/StepProgress";

interface PersonalInformationStepProps {
  onNext: () => void;
  onBack?: () => void;
}

const PersonalInformationStep: React.FC<PersonalInformationStepProps> = ({ onNext }) => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form
  useEffect(() => {
    setIsFormValid(!!fullName && !!gender && !!phoneNumber && !!email);
  }, [fullName, gender, phoneNumber, email]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted with the following data:", {
        fullName,
        gender,
        phoneNumber,
        email,
        photo,
      });
      onNext(); // Move to the next step
    }
  };

  return (
    <>
      {/* <NavBar /> */}
      <div className="flex flex-col justify-center items-center" style={{ fontFamily: "Lato" }}>
        

        <div className="flex flex-col border border-[#D0D2D6] my-20 w-[700px] rounded-[16px] p-20 gap-10" style={{ fontFamily: "Lato" }}>
         
            <>
              <div className="text-center mb-8">
                <p className="text-[24px] font-bold text-[#374151] leading-[30.17px]" style={{ fontFamily: "Merriweather" }}>
                  Personal Information
                </p>
              </div>

              <div className="flex items-center justify-center gap-5">
                <div>
                  <img
                    src={photo ? URL.createObjectURL(photo) : "/src/assets/profileholder.svg"} 
                    alt="Profile"
                    className="w-[120px] h-[120px] object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col items-center mt-5">
                  <label className="flex justify-center items-center text-[#1E3A8A] border border-[#1E3A8A] px-4 py-2 rounded-[16px] h-[54px] w-[168px] text-[18px] leading-[21.6px] cursor-pointer text-center">
                    Upload Photo
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                  <p className="text-[#374151] leading-[21.6px] text-[18px]">(Optional)</p>
                </div>
              </div>

              <hr />

              {/* Form Section */}
              <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label className="text-[#5F6774] font-semibold leading-[19.2px]">Full Name</label>
                  <input
                    type="text"
                    className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none h-[49px] w-[432px"
                    placeholder="Jane Doe"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="flex justify-between space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">Gender</label>
                    <select
                      className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none h-[50px]"
                      placeholder="0123456789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none h-[50px]"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="border border-[#1E3A8A] text-[18px] p-[16px] rounded-[16px] h-[54px] w-[195px] leading-[21.6px] font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`text-[18px] p-[16px] rounded-[16px] h-[54px] w-[195px] leading-[21.6px] font-semibold ${
                      isFormValid ? "bg-[#1E3A8A] text-white" : "bg-[#B9C2DB] text-[#98A4C9]"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </form>
            </>
          {/* )} */}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default PersonalInformationStep;
