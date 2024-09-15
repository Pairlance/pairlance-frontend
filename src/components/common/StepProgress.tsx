import React from "react";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  completedColor?: string;
  completedTextColor?: string;
  upcomingColor?: string;
  upcomingTextColor?: string;
  borderColor?: string;
  onStepClick?: (step: number) => void;
}

const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  completedColor = "#1E3A8A",   // Background color for completed steps
  completedTextColor = "#FFFFFF", // Text color for completed steps
  upcomingColor = "#E5E7EB",      // Background color for upcoming steps
  upcomingTextColor = "#374151",  // Text color for upcoming steps
  borderColor = "#1E3A8A",       // Static border color for all steps
  onStepClick,
}) => {
  return (
    <div className="flex flex-col gap-3 mt-6">
      <div className="text-[18px] leading-[21.6px] font-normal text-[#374151]">
        <p>
          Step {currentStep} of {totalSteps}
        </p>
      </div>
      <div className="flex justify-center items-center">
        {[...Array(totalSteps)].map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`rounded-full lg:w-[48px] w-[24px] lg:h-[48px] h-[24px] flex items-center justify-center border`}
              style={{
                borderColor: borderColor,
                backgroundColor: index < currentStep - 1 ? completedColor : upcomingColor,
                color: index < currentStep - 1 ? completedTextColor : upcomingTextColor,
              }}
              onClick={() => onStepClick && onStepClick(index + 1)} // Handle step click
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className=" lg:w-[62px] w-[30px] h-[1px]"
                style={{
                  backgroundColor: borderColor,
                }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;
