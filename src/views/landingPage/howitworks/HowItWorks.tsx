

export const HowItWorks:React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-10 my-[100px]" style={{fontFamily:"lato"}}>
        <div className="flex flex-col justify-center text-center gap-5">
        <div className="flex justify-center items-center font-bold text-[36px]" style={{fontFamily:"Merriweather"}}>
          <img src="/src/assets/howitworks/Ellipse.svg" alt="" />
          <p className="relative right-8"><span className="text-white">H</span>ow It Works</p>
        </div>
       <div className="text-[#5F6774] text-[18px] font-normal text-center w-[1096px] mx-auto leading-[21.6px]">
       <p>Discover a seamless way to connect with top talent or your dream job. Our platform simplifies the hiring process, matching candidates with recruiters in just a few clicks</p>
       </div>
        </div>

       <div className="flex gap-20 items-center">
       <div className="flex items-center w-[55%]">
          <div className="bg-[#1E3A8A] w-[20%] h-[264px]"></div>
          <div><img src="/src/assets/howitworks/groups.svg" alt="groups" width={600} height={512} /></div>
        </div>

        <div className="flex flex-col gap-10 text-[#5F6774] text-[16px] w-[30%]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[18px] font-bold">
                <img src="/src/assets/howitworks/uploadicon.svg" alt="" />
                <p>Upload Your CV (Candidates)</p>
              </div>
              <p>Create a profile and upload your CV in just a few minutes. We do the rest</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[18px] font-bold">
                <img src="/src/assets/howitworks/posticon.svg" alt="" />
                <p>Post a Job (Recruiters)</p>
              </div>
              <p>Fill out a simple form with your job requirements. We’ll match you with the best candidates</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[18px] font-bold">
                <img src="/src/assets/howitworks/swipeicon.svg" alt="" />
                <p>Swipe and Match</p>
              </div>
              <p className="w-[342px">Recruiters can swipe through candidate profiles, save top matches, and request their CVs instantly</p>
            </div>
          </div>
       </div>
      </div>
    </>
  )
}
