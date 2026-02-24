import React, { useRef } from "react";
import "../../../Main.scss";
import styles from "./SignUp.module.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../../apis/api";
import { useNavigate } from "react-router-dom";   // ✅ added

export default function SignUp() {
  const formRef = useRef(null);
  const locationInputRef = useRef(null);
  const navigate = useNavigate();   // ✅ added

  // 📍 Get Location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported ❌");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          if (data.display_name) {
            locationInputRef.current.value = data.display_name;
          } else {
            locationInputRef.current.value = `${latitude}, ${longitude}`;
          }
        } catch {
          locationInputRef.current.value = `${latitude}, ${longitude}`;
        }
      },
      () => {
        alert("Unable to retrieve location ❌");
      }
    );
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: signUp,

    onSuccess: () => {
      alert("Account created successfully ✅");
      formRef.current?.reset();

      navigate("/Otp");   // ✅ redirect added
    },

    onError: (error) => {
      console.error("Signup Error:", error?.response);
      alert(
        error?.response?.data?.message || "Signup failed ❌"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const password = formData.get("password");
    const confirmPass = formData.get("confirmPass");

    if (password !== confirmPass) {
      alert("Passwords do not match ❌");
      return;
    }

    if (!formData.get("terms")) {
      alert("Accept Terms & Conditions ❌");
      return;
    }

    const payload = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      passcode: formData.get("passcode"),
      password: password,
      confirmPass: confirmPass,
    };

    mutate(payload);
  };

  return (
    <div className={styles.signup}>
      <div className={styles.signupWrap}>
        <div className="row">
          <div className="col-6 left">
            <AuthLeft comment="Have an account?" linkName="SignIn" />
          </div>

          <div className={`col-6 ${styles.right}`}>
            <div className={styles.formBox}>
              <div className={styles.head}>
                <figure className={styles.fig}>
                  <img src={logo} alt="logo" />
                </figure>
                <h2 className={styles.head2}>Sign up</h2>
              </div>

              <form
                ref={formRef}
                className={styles.authForm}
                onSubmit={handleSubmit}
              >
                <div className={styles.inputWrapper}>
                  <input name="fullname" className={styles.inp} required />
                  <label className={styles.lbl}>Full Name</label>
                </div>

                <div className={styles.inputWrapper}>
                  <input name="email" type="email" className={styles.inp} required />
                  <label className={styles.lbl}>Email</label>
                </div>

                <div className={styles.inputWrapper}>
                  <input
                    name="phone"
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    className={styles.inp}
                    required
                  />
                  <label className={styles.lbl}>Phone</label>
                </div>

                <div className={`${styles.inputWrapper} ${styles.locationWrapper}`}>
                  <input
                    ref={locationInputRef}
                    name="location"
                    className={`${styles.inp} ${styles.spInp}`}
                    required
                  />
                  <label className={styles.lbl}>Location</label>

                  <button
                    type="button"
                    className={styles.locationBtn}
                    onClick={handleGetLocation}
                  >
                    <i className="fa-solid fa-location-crosshairs"></i>
                  </button>
                </div>

                <div className={styles.inputWrapper}>
                  <input name="passcode" className={styles.inp} required />
                  <label className={styles.lbl}>Pass-Code</label>
                </div>

                <div className={styles.inputWrapper}>
                  <input name="password" type="password" className={styles.inp} required />
                  <label className={styles.lbl}>Desired Password</label>
                </div>

                <div className={styles.inputWrapper}>
                  <input
                    name="confirmPass"
                    type="password"
                    className={styles.inp}
                    required
                  />
                  <label className={styles.lbl}>Confirm Password</label>
                </div>

                <div className={styles.checkboxGroup}>
                  <input type="checkbox" name="terms" />
                  <label className={styles.lbl2}>
                    I agree to the Terms of Service
                  </label>
                </div>

                <Button
                  className={styles.submitBtn}
                  type="submit"
                  text={isPending ? "SIGNING UP..." : "SIGN UP"}
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