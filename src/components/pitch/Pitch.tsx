import React, { useState } from "react";

interface PitchProps {
  onNext: (stepData?: any) => Promise<boolean>;
  onBack: () => void;
  formData: { text: string }; // Add formData here
}

export const Pitch: React.FC<PitchProps> = ({ onNext, onBack, formData }) => {
  const maxWords = 150;

  const [text, setText] = useState<string>(formData.text || '');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    const words = newText.trim().split(/\s+/);
    if (words.length <= maxWords) {
      setText(newText);
    }
  };

  const countWords = (text: string) => {
    const words = text.trim().split(/\s+/);
    return words[0] === '' ? 0 : words.length;
  };

  const wordCount = countWords(text);

  const isTyping = text.trim().length > 0;

  return (
    <div className="flex flex-col items-center justify-center rounded-lg lg:w-[700px] lg:h-[726px] lg:my-10 lg:border border-[#D0D2D6]">
      <div className="flex flex-col justify-center w-[85%] lg:w-[unset] mx-auto" style={{ fontFamily: "lota" }}>
        <div className="flex justify-center text-[24px] font-bold text-[#374151] leading-[30.17px]" style={{ fontFamily: "Merriweather" }}>
          <p>Write a Pitch</p>
        </div>
        <div className="flex flex-col">
          <label className="text-[16px] text-[#5F6774]">Pitch/Summary</label>
          <textarea
            className="lg:w-[424px] h-[231px] p-[16px] gap-10 border border-[#D0D2D6] rounded-[16px] outline-none mt-4"
            placeholder="Write a brief pitch highlighting your skills, experience, and what makes you a great fit for potential opportunities"
            value={text}
            onChange={handleChange}
            maxLength={1000} 
          />
          <div className="flex justify-end font-normal text-[12px] text-[#5C5C5C] leading-[14.4px]">
            <p>{`${wordCount}/${maxWords} words`}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-6">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="border border-[#1E3A8A] text-[#1E3A8A] text-[18px] p-[16px] rounded-[16px] h-[54px] w-[191px] leading-[21.6px] font-semibold"
            >
              Back
            </button>
          )}

          <button
            type="button"
            onClick={() => onNext({ text })}
            disabled={!isTyping}
            className={`text-[18px] p-[16px] rounded-[16px] h-[54px] w-[191px] leading-[21.6px] font-semibold ${isTyping ? 'bg-[#1E3A8A] text-white' : 'bg-[#B9C2DB] text-[#98A4C9]'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
