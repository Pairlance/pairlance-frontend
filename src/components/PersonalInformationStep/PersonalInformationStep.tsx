import React, { useState, useEffect } from "react";
import axios from "axios";
import { profileholder } from "../../assets";

interface PersonalInformationStepProps {
  onNext: (stepData?: any) => void;
  onBack?: () => void;
}

const PersonalInformationStep: React.FC<PersonalInformationStepProps> = ({
  onNext,
  onBack,
}) => {
  const [full_name, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Validate form
  useEffect(() => {
    const phoneRegex = /^[0-9]{10,15}$/;
    setIsFormValid(
      !!full_name && !!gender && phoneRegex.test(phoneNumber) && !!email
    );
  }, [full_name, gender, phoneNumber, email]);

  // Upload photo to Cloudinary
  const uploadPhoto = async (file: File) => {
    const cloudApi = import.meta.env.VITE_CLOUDINARY_BASE_URL;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pairlance");

    try {
      const response = await axios.post(
        `${cloudApi}`,
        formData
      );
      const uploadedUrl = response.data.secure_url;
      console.log("Uploaded Photo URL:", uploadedUrl);
      return uploadedUrl; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading photo:", error);
      return null;
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      let uploadedPhotoUrl: string | null = null;
      if (photo) {
        uploadedPhotoUrl = await uploadPhoto(photo);
      }

      // console.log("Form submitted with the following data:", {
      //   full_name,
      //   gender,
      //   phoneNumber,
      //   email,
      //   photo: uploadedPhotoUrl,
      // });

      onNext({
        full_name,
        gender,
        phoneNumber,
        email,
        photo: uploadedPhotoUrl,
      });
    }
  };

  const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^[0-9]{10,15}$/; // Regex for valid phone number length

    // Only show error if the user has started typing (value is not empty)
    if (value && !phoneRegex.test(value)) {
      setPhoneError("Please enter a valid phone number");
    } else {
      setPhoneError(""); // Clear error if the phone number is valid or empty
    }
  };

  useEffect(() => {
    validatePhoneNumber(phoneNumber);
  }, [phoneNumber]);

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ fontFamily: "Lato" }}
    >
      <div
        className="flex flex-col lg:border border-[#D0D2D6] lg:my-20 lg:w-[700px] xl:w-[95%] w-full rounded-[16px] lg:p-20 p-5 gap-10 mx-auto"
        style={{ fontFamily: "Lato" }}
      >
        <div className="text-center mb-8">
          <p
            className="text-[24px] font-bold text-[#374151] leading-[30.17px]"
            style={{ fontFamily: "Merriweather" }}
          >
            Personal Information
          </p>
        </div>

        <div className="flex items-center justify-center gap-5">
          <div>
            <img
              src={photo ? URL.createObjectURL(photo) : profileholder}
              alt="Profile"
              className="w-[120px] h-[120px] object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col items-center mt-5">
            <label className="flex justify-center items-center text-[#1E3A8A] border border-[#1E3A8A] px-4 py-2 rounded-[16px] h-[54px] lg:w-[168px] text-[18px] leading-[21.6px] cursor-pointer text-center">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
            <p className="text-[#374151] leading-[21.6px] text-[18px]">
              (Optional)
            </p>
          </div>
        </div>

        <hr />

        {/* Form Section */}
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-[#5F6774] font-semibold leading-[19.2px]">
              Full Name
            </label>
            <input
              type="text"
              className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none h-[49px]"
              placeholder="Jane Doe"
              required
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col w-[50%]">
              <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">
                Gender
              </label>
              <select
                className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div className="flex flex-col w-[50%]">
              <label className="text-[#5F6774] font-semibold leading-[19.2px] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none"
                placeholder="0123456789"
                required
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  validatePhoneNumber(e.target.value);
                }}
              />
              {phoneError && (
                <p className="text-red-500 text-sm">{phoneError}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              className="p-[16px] border border-[#D0D2D6] rounded-[16px] outline-none h-[50px]"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center gap-5">
            <button
              type="button"
              onClick={onBack}
              className="border border-[#1E3A8A] text-[18px] p-[16px] rounded-[16px] h-[54px] w-[50%] leading-[21.6px] font-semibold"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`text-[18px] p-[16px] rounded-[16px] h-[54px] w-[50%] leading-[21.6px] font-semibold ${
                isFormValid
                  ? "bg-[#1E3A8A] text-white"
                  : "bg-[#B9C2DB] text-[#98A4C9]"
              }`}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInformationStep;
