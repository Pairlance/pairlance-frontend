import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";
import axios from "axios";
import type { SelectProps } from "antd";

interface LocationPref {
  selectedLocations: string[];
}

interface DetailsProps {
  onBack?: () => void;
  onNext: (stepData?: any) => Promise<boolean>;
  formData: LocationPref; 
}

const JobLocationPref: React.FC<DetailsProps> = ({ onNext, onBack, formData }) => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>(formData.selectedLocations || []);
  const [isFormValid, setIsFormValid] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsFormValid(selectedLocations.length > 0);
  }, [selectedLocations]);

  useEffect(() => {
    const fetchLocations = async () => {
      const apiUrl = import.meta.env.VITE_BASE_URL;
      try {
        const response = await axios.get(`${apiUrl}/api/locations`);
        setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setError("Failed to load locations. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      onNext({ selectedLocations });
    }
  };

  
  const options: SelectProps["options"] = locations.map((location) => ({
    label: location,
    value: location,
  }));

  
  const handleChange = (value: string[]) => {
    setSelectedLocations(value);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg lg:w-[700px] xl:h-[726px] gap-10 py-10 lg:border border-[#D0D2D6]" style={{ fontFamily: "Lato" }}>
      <div className="flex justify-center font-bold text-center text-[24px] leading-[30.17px] text-[#374151]" style={{ fontFamily: "Merriweather" }}>
        <p>Location Preference</p>
      </div>
      <form className="flex flex-col gap-10 w-[85%] mx-auto lg:w-[unset]" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-[#5F6774] font-semibold leading-[19.2px]">Preferred Job Locations</label>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <Space style={{ width: "100%" }} direction="vertical">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder={loading ? "Loading locations..." : "Please select locations"}
              onChange={handleChange}
              options={options}
              loading={loading}
              value={selectedLocations} // Ensure the selected locations are displayed
              aria-label="Preferred job locations"
            />
          </Space>
        </div>
        <div className="flex justify-center gap-5">
          <button
            type="button"
            onClick={onBack}
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
    </div>
  );
};

export default JobLocationPref;
