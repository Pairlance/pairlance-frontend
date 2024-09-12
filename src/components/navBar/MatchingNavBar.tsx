import React from 'react';

const MatchingNavBar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between h-[108px] px-20 bg-white shadow-md sticky top-0 z-10">
      <div className="flex items-center space-x-2 text-[#374151]" style={{fontFamily:"Georgia"}}>
        {/* Logo */}
        <div className="flex items-center">
          <img src="/src/assets/navbar/logo.svg" alt="Brand logo" width={45} height={64}/>
          <span className="text-[28.2px] font-bold leading-[32.05px]" >PairLance</span>
        </div>
      </div>

      {/* Contact Us Button */}
      <div>
        <button
          // href="/contact"
          className=" p-[16px]  w-[196px] h-[54px] bg-[#1E3A8A] text-white rounded-[16px] font-semibold text-[18px] leading-[21.6px]"
        >
          Contact Us
        </button>
      </div>
    </nav>
  );
};

export default MatchingNavBar;
