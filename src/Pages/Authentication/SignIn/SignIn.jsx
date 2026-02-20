import React, { useState } from "react";
import "../../../Main.scss";
import "./SignIn.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [loginType, setLoginType] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData =
      loginType === "email" ? { email, password } : { phone, password };

    console.log(formData);
  };

  return (
    <div className="signin">
        <div className="signin-wrap">
          <div className="row">
            {/* Left */}
            <div className="col-6 left">
              <AuthLeft comment="Don’t have an account?" linkName="SignUp" />
            </div>

            {/* Right */}
            <div className="col-6 right">
              <div className="form-box">
                <div className="head">
                  <figure className="fig">
                    <img src={logo} alt="logo" />
                  </figure>
                  <h2 className="head2">Login</h2>
                  <p className="para">
                    Please fill this form to login your account
                  </p>
                </div>

                {/* 🔹 TOGGLE BUTTONS */}
                <div className="login-toggle">
                  <button
                    className={loginType === "email" ? "active btn" : "btn"}
                    onClick={() => setLoginType("email")}
                    type="button"
                  >
                    Login with Email
                  </button>

                  <button
                    className={loginType === "phone" ? "active btn" : "btn"}
                    onClick={() => setLoginType("phone")}
                    type="button"
                  >
                    Login with Phone
                  </button>
                </div>

                {/* FORM */}
                <form className="auth-form" onSubmit={handleSubmit}>
                  {/* Email / Phone */}
                  {loginType === "email" ? (
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
                  ) : (
                    <div className="form-group">
                      <div className="input-wrapper">
                        <input
                          className="inp"
                          type="tel"
                          placeholder=" "
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                        <label
                          className={
                            phone ? "floating active lbl" : "floating lbl"
                          }
                        >
                          Phone Number
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Password */}
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input
                        className="inp"
                        type="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label
                        className={
                          password ? "floating active lbl" : "floating lbl"
                        }
                      >
                        Password
                      </label>
                    </div>
                  </div>

                  {/* 🔹 FORGOT PASSWORD */}
                  <div className="forgot-password">
                    <Link to="/forget-pass" className="a">Forget password?</Link>
                  </div>

                  {/* Button */}
                  <Button
                    type="submit"
                    className="submit-btn"
                    text="LOGIN"
                    variant="primary"
                  >
                    LOGIN
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
