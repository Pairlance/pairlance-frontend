export const HowItWorks: React.FC = () => {
  return (
    <>
      <div
        className="flex flex-col gap-10 lg:my-[100px] my-[50px]"
        style={{ fontFamily: "lato" }}
      >
        <div className="flex flex-col justify-center lg:text-center gap-5">
          <div
            className="flex lg:justify-center lg:items-center font-bold text-[36px] pl-4 lg:pl-0"
            style={{ fontFamily: "Merriweather" }}
          >
            <img src="/src/assets/howitworks/Ellipse.svg" alt="" />
            <p className="relative right-8 top-4 text-[#374151] text-[36px]"  style={{ fontFamily: "Merriweather" }}>
              <span className="text-white">H</span>ow It Works
            </p>
          </div>
          <div className="text-[#5F6774] lg:text-[18px] text-[14px] font-normal lg:text-center lg:w-[1096px] md:w-[358px] mx-auto lg:leading-[21.6px] leading-[16.8px] px-4 lg:px-0">
            <p>
              Discover a seamless way to connect with top talent or your dream
              job. Our platform simplifies the hiring process, matching
              candidates with recruiters in just a few clicks
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-20 items-center pr-5 lg:pr-0">
          <div className="flex items-center lg:w-[55%]">
            <div className="bg-[#1E3A8A] lg:w-[20%] w-[135px] lg:h-[264px] h-[80px]"></div>
            <div>
              <img
                src="/src/assets/howitworks/groups.svg"
                alt="groups"
                width={600}
                height={512}
              />
            </div>
          </div>

          <div className="flex flex-col gap-10 text-[#5F6774] text-[16px] lg:w-[30%] px-5 lg:px-0">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[18px] font-bold">
                <img src="/src/assets/howitworks/uploadicon.svg" alt="" />
                <p>Upload Your CV (Candidates)</p>
              </div>
              <p>
                Create a profile and upload your CV in just a few minutes. We do
                the rest
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[18px] font-bold">
                <img src="/src/assets/howitworks/posticon.svg" alt="" />
                <p>Post a Job (Recruiters)</p>
              </div>
              <p>
                Fill out a simple form with your job requirements. We’ll match
                you with the best candidates
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[18px] font-bold">
                <img src="/src/assets/howitworks/swipeicon.svg" alt="" />
                <p>Swipe and Match</p>
              </div>
              <p className="w-[342px">
                Recruiters can swipe through candidate profiles, save top
                matches, and request their CVs instantly
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
