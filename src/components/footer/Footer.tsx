// import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-[#0D183A] text-white py-8"
      style={{ fontFamily: "lato" }}
    >
      <div className="container mx-auto lg:w-[90%] w-full flex flex-col-reverse md:flex-row justify-between lg:items-center px-4">
        <div className="flex flex-col lg:items-center md:items-start">
          <div className="mb-4 flex" style={{fontFamily:"Georgia"}}>
            <img
              src="/src/assets/footer/brandlogo.svg"
              alt="Brand logo"
              width={45}
              height={64}
            />
            <h1 className="text-xl font-bold leading-[32.05px]">PairLance</h1>
          </div>
          <div className="flex space-x-4">
            <img src="/src/assets/footer/facebook.svg" alt="" />
            <a href="#" className="text-white">
              <img src="/src/assets/footer/instagram.svg" alt="" />
            </a>
            <a href="#" className="text-white">
              <img src="/src/assets/footer/twitter.svg" alt="" />
            </a>
            <a href="#" className="text-white">
              <img src="/src/assets/footer/linkedin.svg" alt="" />
            </a>
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:mx-8">
          <h2 className="text-[18px] leading-[21.6px] font-semibold">Contact</h2>
          <p className="text-[16px] leading-[19.2px] font-normal mt-2 text-[#FFFFFF]">support@pairlance.com</p>
        </div>

        <div className="mt-8 md:mt-0">
          <h2 className="text-[24px] font-bold leading-[30.17px]" style={{fontFamily:"Merriweather"}}>Subscribe To Our Newsletter</h2>
          <p className="text-[16px] mt-2 leading-[19px] font-normal text-[#E8E8E8] lg:w-[530.08px]">
            Stay ahead of the curve - subscribe to our newsletter for insights
            and updates.
          </p>
          <form className="mt-4 flex flex-col lg:flex-row gap-5 text-[14px] leading-[16px]">
            <input
              type="email"
              placeholder="Enter email address"
              className="p-1 rounded-lg text-[E5E7EB] bg-transparent border lg:w-[285px] h-[49px]"
            />
            <button
              type="submit"
              className="bg-white text-[#374151] p-[16px] rounded-[16px] font-semibold lg:w-[196px] h-[54px]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom - Copyright */}
      <div className="border-t border-[#EEEFF2] mt-8 pt-4 w-[90%] mx-auto">
        <p className="text-center text-[12px] text-gray-400 leading-[14.4px] font-normal mt-1">
          © 2024 PairLance. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
