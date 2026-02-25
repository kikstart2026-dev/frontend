import React, { useRef, useState, useEffect } from "react";
import "../../../Main.scss";
import styles from "../ResetPass/ResetPass.module.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../../../apis/api";

export default function OtpVerified() {
  const navigate = useNavigate();
  const email = localStorage.getItem("verifyEmail");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputsRef = useRef([]);

  // 🔥 VERIFY MUTATION
  const { mutate, isPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      alert(data?.message || "Account verified ✅");
      localStorage.removeItem("verifyEmail");
      navigate("/");
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "OTP verification failed ❌");
    },
  });

  useEffect(() => {
    let interval = null;

    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, isResendDisabled]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Enter complete OTP ❌");
      return;
    }

    mutate({
      email,
      otp: finalOtp,
    });
  };

  const handleResendOtp = () => {
    console.log("Resend OTP API Call for:", email);

    setTimer(30);
    setIsResendDisabled(true);
  };

  return (
    <div className={styles.resetpass}>
      <div className={styles.resetpassWrap}>
        <div className="row">

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

          <div className={`col-6 ${styles.right}`}>
            <div className={styles.formBox}>
              <div className={styles.head}>
                <figure className={styles.fig}>
                  <img src={logo} alt="logo" />
                </figure>
                <h2 className={styles.head2}>OTP Verification</h2>
                <p className={styles.para}>
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <form className={styles.authForm} onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    gap: "15px",
                  }}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      ref={(el) => (inputsRef.current[index] = el)}
                      onChange={(e) =>
                        handleChange(e.target.value, index)
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(e, index)
                      }
                      style={{
                        width: "70px",
                        height: "70px",
                        textAlign: "center",
                        fontSize: "24px",
                        borderRadius: "15px",
                        border: "1px solid #B3B3B3",
                        outline: "none",
                      }}
                    />
                  ))}
                </div>

                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                  {isResendDisabled ? (
                    <p style={{ color: "#494949", fontSize: "14px" }}>
                      Resend OTP in <strong>{timer}s</strong>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ff2d2d",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <Button
                  className={styles.submitBtn}
                  type="submit"
                  text={isPending ? "VERIFYING..." : "VERIFY"}
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