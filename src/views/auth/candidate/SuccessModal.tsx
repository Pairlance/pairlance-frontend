import React from 'react';
import { Modal } from 'antd';
import { goodtick } from '../../../assets';

interface ConfirmationModalProps {
  visible: boolean;
  onCancel: () => void; 
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onCancel }) => {
  return (
    <Modal
      open={visible}
      footer={null}
      onCancel={onCancel} 
      centered
    >
      <div className="flex flex-col justify-center items-center p-5 mx-auto">
        <div className="mb-6">
          <img src={goodtick} alt="Success" />
        </div>
        <h2
          className="text-xl font-bold text-center  h-[60px] leading-[30.17px]"
          style={{ fontFamily: "Merriweather" }}
        >
          Your details has been successfully captured!
        </h2>
        <p className="text-center text-[#5F6774] text-[18px] mb-6 leading-[21.6px] lg:w-[476px]">
          Recruiter will reach out to you if you are successfully matched!.
        </p>
        <div className="flex flex-col lg:flex-row lg:space-x-4 gap-5 lg:gap-0 w-[60%]">
          <button
            onClick={() => (window.location.href = "/")}
            className="border bg-[#1E3A8A] text-[#ffff] p-[16px] h-[54px] text-[14px] rounded-[16px] w-full"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
