import React, { useState } from "react";
import "../../../Main.scss";
import "./ForgetPass.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { email };
    console.log(formData);

    navigate("/reset-pass");
  };

  return (
    <div className="forgetpass">
      <div className="forgetpass-wrap">
        <div className="row">
          
          {/* Left */}
          <div className="col-6 left">
            <AuthLeft
            />
          </div>

          {/* Right */}
          <div className="col-6 right">
            <div className="form-box">
              
              <div className="head">
                <figure className="fig">
                  <img src={logo} alt="logo" />
                </figure>

                <h2 className="head2">Forgot password?</h2>

                <p className="para">
                  Please enter your email to reset your password
                </p>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      className="inp"
                      type="email"
                      placeholder=" "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label
                      className={
                        email ? "floating active lbl" : "floating lbl"
                      }
                    >
                      Email
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="submit-btn"
                  text="Continue"
                  variant="primary"
                >
                  Continue
                </Button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}