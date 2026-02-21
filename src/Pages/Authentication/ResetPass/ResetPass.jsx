import React, { useState } from "react";
import "../../../Main.scss";
import styles from "./ResetPass.module.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = { newPassword, confirmPassword };
    console.log(formData);
  };

  return (
    <div className={styles.resetpass}>
      <div className={styles.resetpassWrap}>
        <div className="row">

          {/* Left */}
          <div
            className={`col-6 ${styles.left}`}
            onClick={(e) => {
              // 🔥 If SignIn text clicked → go to /signin
              if (e.target.innerText === "SignIn") {
                e.preventDefault();
                navigate("/signin");
              }
            }}
          >
            <AuthLeft comment="Have an account?" linkName="SignIn" />
          </div>

          {/* Right */}
          <div className={`col-6 ${styles.right}`}>
            <div className={styles.formBox}>
              <div className={styles.head}>
                <figure className={styles.fig}>
                  <img src={logo} alt="logo" />
                </figure>
                <h2 className={styles.head2}>Reset Password</h2>
                <p className={styles.para}>
                  Please enter your new password
                </p>
              </div>

              <form className={styles.authForm} onSubmit={handleSubmit}>

                <div className={styles.formGroup}>
                  <div className={styles.inputWrapper}>
                    <input
                      className={styles.inp}
                      type="password"
                      placeholder=" "
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <label className={styles.lbl}>
                      New Password
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <div className={styles.inputWrapper}>
                    <input
                      className={styles.inp}
                      type="password"
                      placeholder=" "
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <label className={styles.lbl}>
                      Confirm Password
                    </label>
                  </div>
                </div>

                <Button
                  className={styles.submitBtn}
                  type="submit"
                  text="UPDATE"
                  variant="primary"
                />

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}