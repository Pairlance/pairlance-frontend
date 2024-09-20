import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`p-5 my-4 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 mx-auto ${
        isOpen ? "bg-gray-100" : ""
      } w-full md:w-[70%]`}
      onClick={() => setIsOpen(!isOpen)}
     style={{fontFamily:"lato"}}>
      <div className="flex justify-between items-center">
        <p className="font-normal text-[#374151] lg:text-center text-start lg:text-[18px] text-[14px] lg:leading-[21.6px] leading-[16.8px]">
          {question}
        </p>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </div>
      {isOpen && <p className="mt-2 text-[#374151]  text-[18px] leading-[21.6px] text-start">{answer}</p>}
    </div>
  );
};

export default FAQItem;
