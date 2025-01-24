import React from 'react'
import signupImg from "../assets/login/signup.png";
import Template from '../components/core/Auth/Template';

const SignUp = () => {
  return (

      <Template
        title="Join the millions leraning to code with StudyNotion"
        description1="Build skills for today, tomorrow, and beyond."
        description2=" Education to future-proof your career"
        image={signupImg}
        formType="signup"
      />

  )
}

export default SignUp
