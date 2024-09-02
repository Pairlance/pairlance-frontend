

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-[90%] mx-auto" style={{fontFamily:'lato'}}>
     <div className="flex flex-col justify-center gap-[50px]">
     <div className="flex flex-col gap-5 text-[48px] font-bold text-center leading-[60.34px] text-[#374151] justify-center mt-24" style={{fontFamily:"Merriweather"}}>
        <p>
        Effortlessly Connect with <span className='border-[3px] border-[#34D399] rounded-tr-[40px] rounded-tl-[40px] rounded-bl-[25px] rounded-br-[25px] px-[8px] py-[4px]'>Top Talent</span> or find 
        </p>
        <p>  your <span className="border-[3px] border-[#34D399] rounded-tr-[40px] rounded-tl-[40px] rounded-bl-[25px] rounded-br-[25px] px-[8px] py-[4px]">Next job</span> in minutes</p>
      </div>
      <div className="flex font-semibold text-[24px] leading-[28.8px] text-[#6B7280] text-center justify-center">
        <p className="w-[1130px]">For recruiters, instantly access a pool of pre-vetted candidates. For job seekers, upload your CV and get matched with the right opportunities</p>
      </div>
      <div className="flex gap-4 justify-center" style={{fontFamily:"lato"}}>
        <button className="flex justify-center w-[292px] h-[54px] p-[16px] rounded-[16px] text-[#FFFFFF] bg-[#1E3A8A] font-semibold text-[18px]" >Find Candidates Now!</button>

        <button className="flex justify-center w-[292px] h-[54px] p-[16px] rounded-[16px] border">Upload Your CV</button>
      </div>
     </div>

      <div className="flex flex-col mt-40">
      <div className="bg-[url('/src/assets/hero/background.svg')] bg-no-repeat bg-contain flex justify-center h-[254px]">
      
      </div>
      <div className="flex justify-center h-[254px relative bottom-[470px]  -mb-[400px]">
      <img src="/src/assets/hero/group.svg" alt="representatives" />
      {/* <img src="/src/assets/hero/receptionist.svg" alt="representatives" />
      <img src="/src/assets/hero/helmetwoman.svg" alt="representatives" />
      <img src="/src/assets/hero/designer.svg" alt="representatives" /> */}
      </div>
      </div>
    </div>
  )
}
