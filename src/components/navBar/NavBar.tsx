import React, { useState, useEffect } from 'react';
import logo from "../../assets/navbar/logo.svg"

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'auto'; // Allow scrolling on the background
    } else {
      document.body.style.overflowY = 'auto'; // Enable scroll on the whole page when the menu is closed
    }

    return () => {
      document.body.style.overflowY = 'auto'; // Clean up on component unmount
    };
  }, [isOpen]);

  return (
    <nav className="relative z-50">
      <div className="flex items-center justify-between h-[108px] px-5 md:px-20 bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-2 text-[#374151]" style={{ fontFamily: 'Georgia' }}>
          {/* Logo */}
          <div className="flex items-center">
            {/* <img src="/src/assets/navbar/logo.svg" alt="Brand logo" width={45} height={64} /> */}
            <img src={logo} alt="brand logo" width={45} height={64}/>
            <span className="text-[28.2px] font-bold leading-[32.05px]">PairLance</span>
          </div>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 30 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Nav Links for Desktop */}
        <div className="hidden md:flex items-center space-x-4 gap-4 font-normal text-[18px] leading-[21.6px]">
          <a
            href="/"
            className={`${location.pathname === '/' ? 'text-blue-900' : 'text-gray-600'} hover:text-blue-700`}
          >
            Home
          </a>
          <a
            href="/recruiter"
            className={`${location.pathname === '/recruiter' ? 'text-blue-900' : 'text-gray-600'} hover:text-blue-700`}
          >
            Recruiter
          </a>
          <a
            href="/candidate"
            className={`${location.pathname === '/candidate' ? 'text-blue-900' : 'text-gray-600'} hover:text-blue-700`}
          >
            Candidate
          </a>
        </div>

        {/* Contact Us Button */}
        <div className="hidden md:block">
          <button className="p-[16px] w-[196px] h-[54px] bg-[#1E3A8A] text-white rounded-[16px] font-semibold text-[18px] leading-[21.6px]">
            Contact Us
          </button>
        </div>

        {/* Overlay and Mobile Menu */}
        <div
          className={`fixed inset-0 h-screen w-full bg-black bg-opacity-25 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out ${
            isOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
          onClick={toggleMenu} // Close menu if clicking outside
        ></div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-[50%] bg-white transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out z-50 overflow-hidden`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
        >
          <div className="flex items-center justify-end h-[108px] px-5 bg-white ">
            {/* Close Icon */}
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col items-start gap-7 pl-5 font-normal text-[18px] leading-[21.6px]">
            <li>
              <a
                href="/"
                className={`${location.pathname === '/' ? 'text-blue-900' : 'text-gray-600'} hover:text-blue-700`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/recruiter"
                className={`${location.pathname === '/recruiter' ? 'text-blue-900' : 'text-gray-600'} hover:text-blue-700`}
              >                Recruiter
              </a>
            </li>
            <li>
              <a
                href="/candidate"
                className={`${location.pathname === '/candidate' ? 'text-blue-900' : 'text-gray-600'} hover:text-blue-700`}
              >
                Candidate
              </a>
           </li>
            <li>
              <button className="p-[16px] w-[154px] h-[48px] bg-[#1E3A8A] text-white rounded-[16px] font-semibold text-[18px] leading-[21.6px]">
                Contact Us
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
