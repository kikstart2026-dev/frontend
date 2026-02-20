import React, { useState } from "react";
import "../../../Main.scss";
import "./ResetPass.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { newPassword, confirmPassword };
    console.log(formData);
  };

  return (
    <div className="resetpass">
      <div className="resetpass-wrap">
        <div className="row">
          {/* Left */}
          <div className="col-6 left">
            <AuthLeft
              comment="Remember your password?"
              linkName="Sign In"
            />
          </div>

          {/* Right */}
          <div className="col-6 right">
            <div className="form-box">
              <div className="head">
                <figure className="fig">
                  <img src={logo} alt="logo" />
                </figure>
                <h2 className="head2">Reset Password</h2>
                <p className="para">
                  Please enter your new password
                </p>
              </div>

              {/* FORM */}
              <form className="auth-form" onSubmit={handleSubmit}>
                
                {/* New Password */}
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      className="inp"
                      type="password"
                      placeholder=" "
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <label
                      className={
                        newPassword ? "floating active lbl" : "floating lbl"
                      }
                    >
                      New Password
                    </label>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      className="inp"
                      type="password"
                      placeholder=" "
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <label
                      className={
                        confirmPassword ? "floating active lbl" : "floating lbl"
                      }
                    >
                      Confirm Password
                    </label>
                  </div>
                </div>

                {/* Button */}
                <Button
                  type="submit"
                  className="submit-btn"
                  text="UPDATE"
                  variant="primary"
                >
                  UPDATE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}