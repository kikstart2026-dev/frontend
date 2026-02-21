import React, { useState } from "react";
import "../../../Main.scss";
import styles from "./SignIn.module.scss";
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
      loginType === "email"
        ? { email, password }
        : { phone, password };

    console.log(formData);
  };

  return (
    <div className={styles.signin}>
      <div className={styles.signinWrap}>
        <div className="row">

          <div className="col-6">
            <AuthLeft comment="Don’t have an account?" linkName="SignUp" />
          </div>

          <div className={`col-6 ${styles.right}`}>
            <div className={styles.formBox}>
              <div className={styles.head}>
                <figure className={styles.fig}>
                  <img src={logo} alt="logo" />
                </figure>
                <h2 className={styles.head2}>Login</h2>
                <p className={styles.para}>
                  Please fill this form to login your account
                </p>
              </div>

              <div className={styles.loginToggle}>
                <button
                  className={`${styles.btn} ${loginType === "email" ? styles.active : ""
                    }`}
                  onClick={() => setLoginType("email")}
                  type="button"
                >
                  Login with Email
                </button>

                <button
                  className={`${styles.btn} ${loginType === "phone" ? styles.active : ""
                    }`}
                  onClick={() => setLoginType("phone")}
                  type="button"
                >
                  Login with Phone
                </button>
              </div>

              <form className={styles.authForm} onSubmit={handleSubmit}>
                {loginType === "email" ? (
                  <div className={styles.inputWrapper}>
                    <input
                      className={styles.inp}
                      type="email"
                      placeholder=" "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label className={styles.lbl}>Email</label>
                  </div>
                ) : (
                  <div className={styles.inputWrapper}>
                    <input
                      className={styles.inp}
                      type="tel"
                      placeholder=" "
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <label className={styles.lbl}>Phone Number</label>
                  </div>
                )}

                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inp}
                    type="password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className={styles.lbl}>Password</label>
                </div>

                <div className={styles.forgotPassword}>
                  <Link to="/forget-pass" className={styles.a}>
                    Forget password?
                  </Link>
                </div>

                <Button className={styles.submitBtn}
                  type="submit"
                  text="LOGIN"
                  variant="primary"
                >
                </Button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}