import React, { useState } from "react";
import "../../../Main.scss";
import styles from "./SignIn.module.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../apis/api";

export default function SignIn() {
  const [loginType, setLoginType] = useState("email"); // toggle রাখলাম
  const navigate = useNavigate();

  // 🔥 Mutation
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login Response:", data);

      if (data?.requiresOtp) {
        // 🔥 Save email for OTP verify page
        localStorage.setItem("verifyEmail", data.email);

        alert("OTP sent to your email 📩");
        navigate("/Otp");
      } else {
        alert("Login successful ✅");
        navigate("/");
      }
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "Login failed ❌");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload =
      loginType === "email"
        ? {
            email: formData.get("email"),
            password: formData.get("password"),
          }
        : {
            phone: formData.get("phone"),
            password: formData.get("password"),
          };

    mutate(payload);
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
                  className={`${styles.btn} ${loginType === "email" ? styles.active : ""}`}
                  onClick={() => setLoginType("email")}
                  type="button"
                >
                  Login with Email
                </button>

                <button
                  className={`${styles.btn} ${loginType === "phone" ? styles.active : ""}`}
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
                      name="email"
                      className={styles.inp}
                      type="email"
                      placeholder=" "
                      required
                    />
                    <label className={styles.lbl}>Email</label>
                  </div>
                ) : (
                  <div className={styles.inputWrapper}>
                    <input
                      name="phone"
                      className={styles.inp}
                      type="tel"
                      placeholder=" "
                      required
                    />
                    <label className={styles.lbl}>Phone Number</label>
                  </div>
                )}

                <div className={styles.inputWrapper}>
                  <input
                    name="password"
                    className={styles.inp}
                    type="password"
                    placeholder=" "
                    required
                  />
                  <label className={styles.lbl}>Password</label>
                </div>

                <div className={styles.forgotPassword}>
                  <Link to="/forget-pass" className={styles.a}>
                    Forget password?
                  </Link>
                </div>

                <Button
                  className={styles.submitBtn}
                  type="submit"
                  text={isPending ? "LOGGING IN..." : "LOGIN"}
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