import React from "react";
import loginImg from "../assets/login/login.png";
import Template from "../components/core/Auth/Template";

const Login = () => {
  return (

      <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow and think differently"
      description2=" Education to future proof your carrer"
      image={loginImg}
      formType="login"
      
  
    />

  );
};

export default Login;
