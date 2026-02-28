import React, { useEffect, useState } from "react";
import "../../../Main.scss";
import styles from "./ResetPass.module.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { reetPass } from "../../../apis/api";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // ✅ localStorage theke email ana (structure untouched)
  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyEmail");

    if (!storedEmail) {
      navigate("/forget-pass");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["reset-pass"],
    mutationFn: reetPass,

    onSuccess: (data) => {
      console.log("Reset Response:", data);

      alert("Password updated successfully ✅");

      localStorage.removeItem("verifyEmail");

      navigate("/signin");
    },

    onError: (error) => {
      alert(error?.response?.data?.message || "Reset failed ❌");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("verifyEmail");

    if (!storedEmail) {
      alert("Email not found. Please try again.");
      navigate("/forget-pass");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      email: storedEmail,
      otp: otp,
      password: newPassword,
      confirmpass: confirmPassword,
    };

    console.log("Sending Payload:", payload);

    mutate(payload);
  };

  return (
    <div className={styles.resetpass}>
      <div className={styles.resetpassWrap}>
        <div className="row">

          {/* Left */}
          <div
            className={`col-6 ${styles.left}`}
            onClick={(e) => {
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
                  Please enter your details below
                </p>
              </div>

              <form className={styles.authForm} onSubmit={handleSubmit}>

                {/* ❌ Email Field Removed */}

                {/* OTP Field */}
                <div className={styles.formGroup}>
                  <div className={styles.inputWrapper}>
                    <input
                      className={styles.inp}
                      type="text"
                      placeholder=" "
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <label className={styles.lbl}>
                      OTP
                    </label>
                  </div>
                </div>

                {/* New Password */}
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

                {/* Confirm Password */}
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
                  text={isPending ? "UPDATING..." : "UPDATE"}
                  disabled={isPending}
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