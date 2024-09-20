import React, { useState } from "react";
import axios from "axios";

interface UploadCVProps {
  onNext: (stepData?: string) => void;
}

const UploadCVStep: React.FC<UploadCVProps> = ({ onNext }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState<boolean>(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dahhmqvix/upload";
  const CLOUDINARY_PRESET = "pairlance";

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (isValidFileType(file)) {
      startUpload(file);
    } else {
      alert("Please upload a PDF or DOCX file.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isValidFileType(file)) {
      startUpload(file);
    } else {
      alert("Please upload a PDF or DOCX file.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const isValidFileType = (file: File | undefined): file is File => {
    return (
      file !== undefined &&
      (file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    );
  };

  const startUpload = (file: File) => {
    setSelectedFile(file);
    setIsUploading(true);
    setIsUploadSuccessful(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    axios
      .post(CLOUDINARY_URL, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
      })
      .then((response) => {
        setUploadUrl(response.data.secure_url);
        setIsUploading(false);
        setIsUploadSuccessful(true);
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
        setIsUploading(false);
        alert("File upload failed. Please try again.");
      });
  };

  const handleNext = () => {
    if (isUploadSuccessful && uploadUrl) {
      onNext(uploadUrl); // Pass the uploaded file URL to the next step
    }
  };

  return (
    <>
      <div className=" flex flex-col justify-center items-center" style={{ fontFamily: "lota" }}>
        <div className="flex flex-col items-center justify-center rounded-lg lg:w-[700px] lg:h-[726px] my-10 lg:border lg:border-[#D0D2D6]">
          <div className="flex justify-center font-bold text-[24px] leading-[30.17px] text-[#000000]" style={{ fontFamily: "Merriweather" }}>
            <p>Upload CV</p>
          </div>

          <div className="p-6 rounded-lg border-dashed border-[1.5px] border-[#D0D5DD] text-center lg:w-[408px] lg:m-10" onDrop={handleDrop} onDragOver={handleDragOver} style={{ fontFamily: "Lato" }}>
            <div className="flex flex-col gap-10 items-center justify-center">
              {!selectedFile && (
                <>
                  <div className="">
                    <img src="/src/assets/file.svg" alt="File Upload Icon" />
                  </div>
                  <div className="flex flex-col font-normal">
                    <p className="text-[18px] leading-[21.6px] w-[240px] text-[#5F6774]">
                      Drag and drop to upload a file
                    </p>
                    <p className="text-[14px] leading-[16.8px] text-[#98A2B3]">PDF or DOCX</p>
                  </div>
                  <div className="flex justify-center items-center gap-2 text-[#98A2B3] text-[14px]">
                    <img src="/src/assets/divider.svg" alt="divider" width={176} height={1}  className="hidden lg:block"/>
                    <span className="leading-[16.8px]">OR</span> 
                    <img src="/src/assets/divider.svg" alt="divider" width={176} height={1}  className="hidden lg:block"/>
                  </div>
                  <input type="file" accept=".pdf,.docx" className="hidden" id="fileInput" onChange={handleFileChange} />
                  <label
                    htmlFor="fileInput"
                    className="flex items-center justify-center border border-[#1E3A8A] p-4 h-[54px] w-[168px] rounded-[16px] cursor-pointer text-[#1E3A8A] text-[18px] leading-[21.6px]"
                  >
                    Browse Files
                  </label>
                </>
              )}
              {selectedFile && !isUploading && (
                <div className="text-center">
                  <div className="flex justify-center items-center">
                    <div className="rounded-full bg-[#E7F9ED] p-2">
                      <img src="/src/assets/uploadstate.svg" alt="upload success" width={56} height={56} />
                    </div>
                  </div>
                  <p className="text-[#1D2739] text-[14px] font-semibold leading-[20.3px] mt-4">Document Upload Successful</p>
                  <p className="text-[#98A2B3] text-[12px] leading-[17.4px] font-normal mt-1">{selectedFile.name}</p>
                  <div className="flex justify-center items-center gap-10 mt-6">
                    <button className="flex flex-col items-center text-[#5F6774] text-[12px] leading-[14.4px] font-normal">
                      <img src="/src/assets/trash.svg" alt="trash icon" width={24} height={24} />
                      <span>Delete Document</span>
                    </button>
                    <button className="flex flex-col items-center text-[#5F6774] text-[12px] leading-[14.4px] font-normal">
                      <img src="/src/assets/eyeoff.svg" alt="eyeoff" width={24} height={24} />
                      <span>Preview Document</span>
                    </button>
                  </div>
                </div>
              )}
              {selectedFile && isUploading && (
                <div className="flex flex-col items-center">
                  <img src="/src/assets/pdficon.svg" alt="PDF Icon" className="w-[41.07px] h-[44.8px] mb-4" />
                  <div className="text-[#79808A] text-[18px] font-normal mb-2">{uploadProgress}%</div>
                  <div className="w-[313px] rounded-full h-[6px] bg-[#C0F1DF]">
                    <div className="bg-[#34D399] h-[6px] rounded-[16px]" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p className="text-[#374151] font-semibold text-[16px] leading-[19.2px] mt-2">Uploading Document...</p>
                  <p className="text-[#98A2B3] text-[14px] font-normal leading-[16.8px]">{selectedFile.name}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex w-[80%] mx-auto justify-center">
            <button
              className={`lg:w-[408px] w-full h-[54px] p-4 rounded-[16px] ${
                isUploadSuccessful ? "bg-[#1E3A8A] text-[#FFFFFF] cursor-pointer" : "bg-[#B9C2DB] text-[#98A4C9] cursor-not-allowed"
              }`}
              disabled={!isUploadSuccessful}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadCVStep;
