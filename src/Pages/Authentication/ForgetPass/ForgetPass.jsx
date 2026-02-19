import React, { useState } from 'react';
import "../../../Main.scss";
import "./SignIn.scss";
import AuthLeft from  "../../../Component/Authentication/AuthLeft/AuthLeft";
import AuthForm from "../../../Component/Authentication/AuthForm/AuthForm";

export default function SignIn() {

  const [loginType, setLoginType] = useState("email");

  const emailFields = [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    }
  ];

  const phoneFields = [
    {
      label: "Phone Number",
      name: "phone",
      type: "tel",
      pattern: "[0-9]{10}"
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    }
  ];

  return (
    <div className='signin'>
      <div className='container'>
        <div className="signin-wrap">
          <div className="row">
            
            <div className="col-6 left">
              <div className="left-box">
                <AuthLeft comment="Don’t have an account?" linkName="SignUp" />
              </div>
            </div>

            <div className="col-6 right">


              <AuthForm
                title="Login"
                subtitle="Please fill this form to login your account"
                buttonText="LOGIN"
                fields={loginType === "email" ? emailFields : phoneFields}
                
              />
              {/* 🔹 LOGIN TYPE TOGGLE */}
              <div className="login-toggle">
                <button
                  className={loginType === "email" ? "active" : ""}
                  onClick={() => setLoginType("email")}
                >
                  Login with Email
                </button>

                <button
                  className={loginType === "phone" ? "active" : ""}
                  onClick={() => setLoginType("phone")}
                >
                  Login with Phone Number
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}