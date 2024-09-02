import React from "react";

const UploadCVStep: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-lg">
        {/* Step Indicator */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-900">
            You're Just a Few Steps Away from Your Next Opportunity!
          </h2>
          <p className="text-gray-600 mt-2">
            Upload your CV and complete your profile in a few simple steps to connect with top recruiters.
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex justify-center items-center mb-8">
          {[...Array(6)].map((_, index) => (
            <React.Fragment key={index}>
              <div className={`rounded-full w-8 h-8 flex items-center justify-center text-white ${index === 0 ? "bg-blue-900" : "bg-gray-300"}`}>
                {index + 1}
              </div>
              {index < 5 && <div className="w-8 h-1 bg-gray-300"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Upload Section */}
        <div className="bg-gray-100 p-6 rounded-lg border-dashed border-2 border-gray-300 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload CV</h3>
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-4 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v-4a2 2 0 012-2h14m-7 2l-4-4m4 4l4-4m-4 4V4"
                />
              </svg>
            </div>
            <p className="text-gray-600">Drag and drop to upload a file</p>
            <p className="text-gray-500">PDF or DOCX</p>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">
              Browse Files
            </button>
          </div>
        </div>

        {/* Next Button */}
        <button className="mt-8 w-full bg-blue-900 text-white px-4 py-2 rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default UploadCVStep;
