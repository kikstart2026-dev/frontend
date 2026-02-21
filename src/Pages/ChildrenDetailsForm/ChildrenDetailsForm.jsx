import React, { useState } from 'react';
import "../../Main.scss"
import "./ChildrenDetailsForm.scss";
import AuthForm from "../../Component/Authentication/AuthForm/AuthForm";

export default function ChildrenDetailsForm() {

  const signupFields = [
    { label: "Full Name", name: "fullName", type: "text", placeholder: "Jane Cooper" },
    { label: "Email", name: "email", type: "email", placeholder: "janecooper@example.com" },
    { label: "Phone", name: "phone", type: "text", placeholder: "000 000 0000" },
    { label: "Location", name: "location", type: "text", placeholder: "Access your location" },
    { label: "Pass-Code", name: "passcode", type: "text", placeholder: "000 000" },
    { label: "Desired Password", name: "password", type: "password", placeholder: "********" },
    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "********" },
    { label: "I agree to the Terms of Service and Privacy Policy", name: "terms", type: "checkbox" }
  ];

  return (
    <div className='signup'>
      <div className='container'>
        <div className="signup-wrap">
          <div className="row">

            {/* Left Section */}
            <div className="col-6 left">
              {/* <AuthLeft 
                comment="Have an account?" 
                linkName="SignIn" 
              /> */}
            </div>

            {/* Right Section */}
            <div className="col-6 right">
              <div className="form-box">
                <AuthForm 
                  fields={signupFields} 
                  buttonText="SIGN UP" 
                  title="Sign up"
                  subtitle="Please fill this form to create your account."
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}