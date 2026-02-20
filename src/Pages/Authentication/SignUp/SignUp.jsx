import React, { useState } from "react";
import "../../../Main.scss";
import "./SignUp.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [passcode, setPasscode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      fullName,
      email,
      phone,
      location,
      passcode,
      password,
      confirmPassword,
      terms,
    };

    console.log(formData);
  };

  return (
    <div className="signup">
        <div className="signup-wrap">
          <div className="row">
            {/* Left Section */}
            <div className="col-6 left">
              <AuthLeft comment="Have an account?" linkName="SignIn" />
            </div>

            {/* Right Section */}
            <div className="col-6 right">
              <div className="form-box">
                <div className="head">
                  <figure className="fig">
                    <img src={logo} alt="logo" />
                  </figure>
                  <h2 className="head2">Sign up</h2>
                  <p className="para">Please fill this form to create your account.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input className="inp"
                        type="text"
                        placeholder=" "
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                      <label
                        className={fullName ? "floating active lbl" : "floating lbl"}
                      >
                        Full Name
                      </label>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input className="inp"
                        type="email"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label className={email ? "floating active lbl" : "floating lbl"}>
                        Email
                      </label>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input className="inp"
                        type="text"
                        placeholder=" "
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                      <label className={phone ? "floating active lbl" : "floating lbl"}>
                        Phone
                      </label>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input className="inp"
                        type="text"
                        placeholder=" "
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                      <label
                        className={location ? "floating active lbl" : "floating lbl"}
                      >
                        Location
                      </label>
                    </div>
                  </div>

                  {/* Passcode */}
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input className="inp"
                        type="text"
                        placeholder=" "
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        required
                      />
                      <label
                        className={passcode ? "floating active lbl" : "floating lbl"}
                      >
                        Pass-Code
                      </label>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input className="inp"
                        type="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label
                        className={password ? "floating active lbl" : "floating lbl"}
                      >
                        Desired Password
                      </label>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input className="inp"
                        type="password"
                        placeholder=" "
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <label
                        className={
                          confirmPassword ? "floating active lbl" : "floating lbl"}
                      >
                        Confirm Password
                      </label>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input className="inp2"
                        type="checkbox"
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                      />
                      <label className="lbl2">
                        I agree to the Terms of Service and Privacy Policy
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="submit-btn"
                    text="SIGN UP"
                    variant="primary"
                  >
                    SIGN UP
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
