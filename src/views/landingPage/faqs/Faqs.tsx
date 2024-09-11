import React from "react";
import FAQItem from "./FAQItem"; // Adjust the path based on your file structure

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "Do I need to sign up to use PairLance?",
      answer:
        "No, signing up is not required to access all the features of PairLance",
    },
    {
      question: "How do you match candidates to jobs?",
      answer:
        "Our algorithm matches candidates to jobs based on their skills, experience, and preferences.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Absolutely, we prioritize your privacy and use advanced security measures to protect your data.",
    },
    {
      question: "Can I contact candidates directly through PairLance?",
      answer:
        "Yes, PairLance allows direct communication with candidates once they are shortlisted for a job.",
    },
  ];

  return (
    <section
      className="text-center w-[80%] mx-auto my-28"
      style={{ fontFamily: "lato" }}
    >
      <div className="container mx-auto">
        <div className="text-2xl font-bold text-gray-800 mb-4">
          <div className="flex items-center justify-center">
            <div className="bg-blue-900 rounded-full w-[65px] h-[65px] flex items-center justify-center"></div>
            <p className="relative right-6 top-4">
              <span className="text-white text-[36px] font-bold">F</span>AQs
            </p>
          </div>
        </div>
        <p className="text-gray-600 mb-12">
          Find answers to the most common questions about using PairLance. Learn
          how to get the most out of your experience on our platform.
        </p>
        <div className="bg-blue-900 rounded-[32px] p-8 relative">
          <div className="absolute inset-0 bg-[url('src/assets/hero/background.svg')] bg-cover rounded-[32px]"></div>
          <div className="relative flex flex-col items-center">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
        <p className="text-[#000000] font-normal mt-8  text-[18px] leading-[21.6px]">
          If you have any further questions or need additional support, feel
          free to reach out to us at <br />
          <a
            href="mailto:support@pairlance.com"
            className="text-[#1E3A8A] font-semibold"
          >
            support@pairlance.com
          </a>
          . We're here to help!
        </p>
      </div>
    </section>
  );
};

export default FAQSection;
