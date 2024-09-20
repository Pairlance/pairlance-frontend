import React from 'react';
import { Modal } from 'antd';

interface ResumeModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, toggleModal }) => {
  return (
    <Modal
      title=""
      width="44%"
      visible={isOpen}
      onCancel={toggleModal}
      footer={null}
      // width={600}
      className='sm:w-full'
    >
      <div className="flex">
        {/* Left Side - Green Background */}
        <div className="lg:w-1/3 bg-green-800 p-6 text-white flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <h1 className="text-xl font-bold">Rick Tang</h1>
          <p className="text-sm">Product Designer</p>

          <div className="mt-8 text-sm">
            <h2 className="font-semibold">Details</h2>
            <p>Address</p>
            <p>San Francisco, California</p>
            <p>(415) 870-0377</p>
            <p>ricktang@gmail.com</p>

            <h2 className="mt-6 font-semibold">Links</h2>
            <p>LinkedIn</p>
            <p>Github</p>
            <p>Dribbble</p>

            <h2 className="mt-6 font-semibold">Skills</h2>
            <p>UI Design</p>
            <p>Prototyping</p>
            <p>Wireframing</p>
            <p>Adobe XD</p>
          </div>
        </div>

        {/* Right Side - White Background */}
        <div className="lg:w-2/3 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Profile</h2>
          </div>
          <p className="mt-4 text-gray-700">
            Passionate product designer focused on creating user-centered solutions and meeting business goals. I have over 6 years of experience designing for mobile and web applications. I strive to create clean and intuitive interfaces and believe that design is a tool for solving problems, big and small.
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Experience</h2>
            <div className="mt-4">
              <h3 className="font-semibold">Uber</h3>
              <p className="text-sm text-gray-600">Product Designer</p>
              <p className="text-sm text-gray-600">June 2019 - Present</p>
              <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                <li>Designed and launched a rewards experience for Riders on Uber’s platform</li>
                <li>Collaborated with product managers to prioritize new features</li>
                <li>Worked closely with engineers to ensure feasibility</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">IFTTT</h3>
              <p className="text-sm text-gray-600">Product Designer</p>
              <p className="text-sm text-gray-600">Jan 2017 - May 2019</p>
              <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                <li>Led a redesign of the homepage for IFTTT</li>
                <li>Helped increase user engagement by 30% through a new onboarding flow</li>
                <li>Worked closely with marketing teams to align on brand strategy</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Facebook</h3>
              <p className="text-sm text-gray-600">Product Design Intern</p>
              <p className="text-sm text-gray-600">June 2016 - Aug 2016</p>
              <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                <li>Conducted user research and usability tests</li>
                <li>Created wireframes and high-fidelity prototypes</li>
                <li>Presented designs to stakeholders and iterated based on feedback</li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold">Education</h2>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Boston University</strong>
                <br />
                Bachelor’s in Product Design, Sept 2012 - May 2016
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold">Languages</h2>
              <p className="text-sm text-gray-700 mt-2">English</p>
              <p className="text-sm text-gray-700">Spanish</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ResumeModal;
