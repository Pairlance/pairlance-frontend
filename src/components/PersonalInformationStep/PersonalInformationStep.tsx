import React from "react";

const PersonalInformationStep: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-lg">
        {/* Step Indicator */}
        <div className="flex justify-center items-center mb-6">
          {[...Array(6)].map((_, index) => (
            <React.Fragment key={index}>
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center text-white ${
                  index === 1 ? "bg-blue-900" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
              {index < 5 && <div className="w-8 h-1 bg-gray-300"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Personal Information Section */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
        </div>

        {/* Profile Photo Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
            <img
              src="https://via.placeholder.com/150" // Placeholder image
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="text-blue-600 bg-white border border-blue-600 px-4 py-2 rounded-lg">
            Upload Photo
          </button>
          <p className="text-gray-500 mt-2">Optional</p>
        </div>

        {/* Form Section */}
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Jane Doe"
            />
          </div>
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-600 mb-1">Gender</label>
              <select className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-gray-600 mb-1">Phone Number</label>
              <input
                type="text"
                className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="0123456789"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="jane@example.com"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-900 text-white px-4 py-2 rounded-lg"
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
