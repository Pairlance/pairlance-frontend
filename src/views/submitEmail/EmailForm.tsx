import React from 'react'
import MatchingNavBar from '../../components/navBar/MatchingNavBar'
import Footer from '../../components/footer/Footer'
import EmailSummisionForm from '../../components/emailForm/EmailSumisionForm'

const EmailForm: React.FC = () => {
  return (
    <>
      <MatchingNavBar/>
      <EmailSummisionForm/>
      <Footer/>
    </>
  )
}

export default EmailForm