import { useState } from "react";
import axios from "axios";
import { branlogo, facebook, instagram, linkedin, twitter } from "../../assets";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
  
    try {
      const apiUrl = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(`${apiUrl}/email`, {
        email,
      });
  
      // console.log("Success response:", response);
      setMessage(response.data.message); 
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error response:", error);
  
      
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message || "Subscription failed. Please try again.");
      } else {
        setMessage("Subscription failed. Please try again."); 
      }
  
      
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
      setEmail(""); 
    }
  };
  
  
  

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#0D183A] text-white py-8"
      style={{ fontFamily: "lato" }}
    >
      <div className="container mx-auto lg:w-[90%] w-full flex flex-col-reverse lg:flex-row justify-between lg:items-center px-4 gap-5 xl:gap-0">
        <div className="flex flex-col lg:items-center md:items-start gap-5 xl:gap-0">
          <div
            className="mb-4 flex items-center"
            style={{ fontFamily: "Georgia" }}
          >
            <img src={branlogo} alt="Brand logo" width={45} height={64} />
            <h1 className="text-xl font-bold leading-[32.05px] mt-2">
              PairLance
            </h1>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/ede.mathias.5?mibextid=ZbWKwL">
              <img src={facebook} alt="facebook" />
            </a>

            <a
              href="https://www.instagram.com/edcodez?igsh=eW1ubDNjZjlodzFr"
              className="text-white"
            >
              <img src={instagram} alt="" />
            </a>
            <a
              href="https://x.com/mathybaba?t=Ac-G_lIQ7VkkgYqMA0Kw-A&s=09"
              className="text-white"
            >
              <img src={twitter} alt="twitter-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/edemathiasdev?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="text-white"
            >
              <img src={linkedin} alt="linked icon" />
            </a>
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:mx-8">
          <h2 className="text-[18px] leading-[21.6px] font-semibold">Contact</h2>
          <p className="text-[16px] leading-[19.2px] font-normal mt-2 text-[#FFFFFF]">
            support@pairlance.com
          </p>
        </div>

        <div className="mt-8 lg:mt-0 flex flex-col gap-5 xl:gap-0">
          <h2
            className="text-[24px] font-bold leading-[30.17px]"
            style={{ fontFamily: "Merriweather" }}
          >
            Subscribe To Our Newsletter
          </h2>
          <p className="text-[16px] mt-2 leading-[19px] font-normal text-[#E8E8E8] lg:w-[530.08px]">
            Stay ahead of the curve - subscribe to our newsletter for insights
            and updates.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col lg:flex-row gap-5 text-[14px] leading-[16px]"
          >
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-1 rounded-lg text-[E5E7EB] bg-transparent border lg:w-[285px] h-[49px]"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-[#374151] p-[16px] rounded-[16px] font-semibold lg:w-[196px] h-[54px]"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && <p className="text-[16px] mt-2 text-[#BFBF]">{message}</p>}
        </div>
      </div>

      <div className="border-t border-[#EEEFF2] mt-8 pt-4 w-[90% mx-auto">
        <p className="text-center text-[12px] text-gray-400 leading-[14.4px] font-normal mt-1">
          © {currentYear} PairLance. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
