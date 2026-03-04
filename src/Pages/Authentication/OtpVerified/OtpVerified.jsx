import React, { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../../../Main.scss";
import styles from "../ResetPass/ResetPass.module.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp, resendOtp } from "../../../apis/api";

export default function OtpVerified() {
  const navigate = useNavigate();
  const email = localStorage.getItem("verifyEmail");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);

  const inputsRef = useRef([]);

  // ================= VERIFY OTP =================
  const { mutate, isPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      if (data?.token) {
        Cookies.set("token", data.token, { expires: 7 });

        localStorage.removeItem("otpExpiryTime");
        localStorage.removeItem("resendEnableTime");

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 100);
      }
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "OTP verification failed ❌");
    },
  });

  // ================= RESEND OTP =================
  const { mutate: resendMutate, isPending: isResendPending } =
    useMutation({
      mutationKey: ["resend-otp"],
      mutationFn: resendOtp,
      onSuccess: (data) => {
        alert(data?.message || "OTP resent successfully ✅");

        setOtp(["", "", "", "", "", ""]);
        if (inputsRef.current[0]) inputsRef.current[0].focus();

        const newExpiry = Date.now() + 90000; // 90 sec
        const newResend = Date.now() + 30000; // 30 sec

        localStorage.setItem("otpExpiryTime", newExpiry);
        localStorage.setItem("resendEnableTime", newResend);

        setOtpTimer(90);
        setResendTimer(30);
      },
      onError: (error) => {
        alert(error?.response?.data?.message || "Resend failed ❌");
      },
    });

  // ================= TIMER LOGIC (FIXED) =================
  useEffect(() => {
  if (!email) return;

  const now = Date.now();

  if (!localStorage.getItem("otpExpiryTime")) {
    localStorage.setItem("otpExpiryTime", now + 90000);
  }

  if (!localStorage.getItem("resendEnableTime")) {
    localStorage.setItem("resendEnableTime", now + 30000);
  }

  const updateTimer = () => {
    const current = Date.now();

    const expiryTime = Number(localStorage.getItem("otpExpiryTime"));
    const resendTime = Number(localStorage.getItem("resendEnableTime"));

    const otpRemaining = Math.max(
      0,
      Math.floor((expiryTime - current) / 1000)
    );

    const resendRemaining = Math.max(
      0,
      Math.floor((resendTime - current) / 1000)
    );

    setOtpTimer(otpRemaining);
    setResendTimer(resendRemaining);
  };

  updateTimer();

  const interval = setInterval(updateTimer, 1000);

  return () => clearInterval(interval);
  }, [email]);

  // ================= OTP INPUT =================
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

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Enter complete OTP ❌");
      return;
    }

    mutate({ email, otp: finalOtp });
  };

  // ================= RESEND =================
  const handleResendOtp = () => {
    resendMutate({ email });
  };

  // ================= EMAIL CHECK =================
  useEffect(() => {
    if (!email) {
      navigate("/signin");
    }
  }, [email, navigate]);

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
                      onKeyDown={(e) => handleKeyDown(e, index)}
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
                  <p style={{ color: "#494949", fontSize: "14px" }}>
                    OTP expires in <strong>{otpTimer}s</strong>
                  </p>

                  {resendTimer > 0 ? (
                    <p style={{ color: "#494949", fontSize: "14px" }}>
                      Resend available in{" "}
                      <strong>{resendTimer}s</strong>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isResendPending}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ff2d2d",
                        fontWeight: "600",
                        cursor: isResendPending
                          ? "not-allowed"
                          : "pointer",
                        fontSize: "14px",
                      }}
                    >
                      {isResendPending
                        ? "Sending..."
                        : "Resend OTP"}
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