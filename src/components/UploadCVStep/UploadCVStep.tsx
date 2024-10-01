import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { divider, eyeoff, pdficon, trash, uploadicon, uploadstate } from "../../assets";

interface UploadCVProps {
  onNext: (fileData?: File) => void;
  formData: File | null; 
}

const UploadCVStep: React.FC<UploadCVProps> = ({ onNext, formData }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(formData);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState<boolean>(!!formData);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileURL, setFileURL] = useState<string>("");

  useEffect(() => {
    if (formData) {
      setSelectedFile(formData);
      setIsUploadSuccessful(true);
    }
  }, [formData]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (isValidFileType(file)) {
      handleFileSelection(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isValidFileType(file)) {
      handleFileSelection(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const isValidFileType = (file: File | undefined): file is File => {
    return file !== undefined && file.type === "application/pdf";
  };

  const handleFileSelection = (file: File) => {
    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    const uploadSimulation = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadSimulation);
          setIsUploading(false);
          setIsUploadSuccessful(true);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleNext = () => {
    if (isUploadSuccessful && selectedFile) {
      onNext(selectedFile);
    }
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setIsUploading(false);
    setIsUploadSuccessful(false);
  };

  const handlePreview = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setFileURL(url);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    URL.revokeObjectURL(fileURL);
    setFileURL("");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center" style={{ fontFamily: "lota" }}>
        <div className="flex flex-col items-center justify-center rounded-lg lg:w-[700px] lg:h-[726px] my-10 lg:border lg:border-[#D0D2D6]">
          <div className="flex justify-center font-bold text-[24px] leading-[30.17px] text-[#000000]" style={{ fontFamily: "Merriweather" }}>
            <p>Upload CV</p>
          </div>

          <div
            className="xl:p-10 p-6 rounded-lg border-dashed border-[1.5px] border-[#5FC381] text-center lg:w-[408px] lg:m-10"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ fontFamily: "Lato" }}
          >
            <div className="flex flex-col gap-10 items-center justify-center">
              {!selectedFile && (
                <>
                  <div>
                    <img src={uploadicon} alt="File Upload Icon" />
                  </div>
                  <div className="flex flex-col font-normal">
                    <p className="text-[18px] leading-[21.6px] w-[240px] text-[#5F6774]">
                      Drag and drop to upload a file
                    </p>
                    <p className="text-[14px] leading-[16.8px] text-[#98A2B3]">
                      Only PDF files are allowed
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-2 text-[#98A2B3] text-[14px]">
                    <img src={divider} alt="divider" width={176} height={1} className="hidden lg:block" />
                    <span className="leading-[16.8px]">OR</span>
                    <img src={divider} alt="divider" width={176} height={1} className="hidden lg:block" />
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
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
                      <img src={uploadstate} alt="upload success" width={56} height={56} />
                    </div>
                  </div>
                  <p className="text-[#1D2739] text-[14px] font-semibold leading-[20.3px] mt-4">
                    Document Uploaded Successfully
                  </p>
                  <p className="text-[#98A2B3] text-[12px] leading-[17.4px] font-normal mt-1">
                    {selectedFile.name}
                  </p>
                  <div className="flex justify-center items-center gap-10 my-6">
                    <button
                      onClick={handleDelete}
                      className="flex flex-col items-center text-[#5F6774] text-[12px] leading-[14.4px] font-normal"
                      title="click to remove file"
                    >
                      <img src={trash} alt="trash icon" width={24} height={24} />
                      <span>Delete Document</span>
                    </button>
                    <button
                      onClick={handlePreview}
                      className="flex flex-col items-center text-[#5F6774] text-[12px] leading-[14.4px] font-normal"
                      title="click to preview the file"
                    >
                      <img src={eyeoff} alt="eyeoff" width={24} height={24} />
                      <span>Preview Document</span>
                    </button>
                  </div>
                </div>
              )}
              {selectedFile && isUploading && (
                <div className="flex flex-col items-center">
                  <img src={pdficon} alt="PDF Icon" className="w-[41.07px] h-[44.8px] mb-4" />
                  <p className="text-[#374151] font-semibold text-[16px] leading-[19.2px] mt-2">
                    Uploading Document...
                  </p>
                  <p className="text-[#6B7280] text-[14px] leading-[20.3px]">
                    {uploadProgress}% Complete
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-[6px] mt-2">
                    <div
                      className="bg-[#5FC381] h-[6px] rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            className={`${
              selectedFile && isUploadSuccessful
                ? "bg-[#1E3A8A] text-[#FFFFFF]"
                : "bg-[#B9C2DB] text-[#98A4C9]"
            } rounded-[16px] p-[16px] lg:w-[60%] w-[100%] h-[54px] text-[18px] leading-[21.6px] mt-5 lg:mt-[unset]`}
            disabled={!selectedFile || !isUploadSuccessful}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>

      <Modal open={modalVisible} onCancel={closeModal} footer={null} className="w-[50%]">
        <iframe
          src={`${fileURL}#toolbar=0`}
          title="File Preview"
          className="w-full h-[600px]"
          frameBorder="0"
        ></iframe>
      </Modal>
    </>
  );
};

export default UploadCVStep;
