import React from 'react'
import MatchingNavBar from '../../components/navBar/MatchingNavBar'
import Footer from '../../components/footer/Footer'
import EmailSummisionForm from '../../components/emailForm/EmailSumisionForm'
import NavBar from '../../components/navBar/NavBar'

const EmailForm: React.FC = () => {
  return (
    <>
      <div className='hidden lg:block'>
      <MatchingNavBar/>
      </div>
      <div className='block lg:hidden'>
        <NavBar/>
      </div>
      <EmailSummisionForm/>
      <Footer/>
    </>
  )
}

export default EmailForm