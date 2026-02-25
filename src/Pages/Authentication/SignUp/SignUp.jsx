import React, { useRef } from "react";
import "../../../Main.scss";
import styles from "./SignUp.module.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../../apis/api";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const locationRef = useRef(null);

  // 📍 Location Function
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          locationRef.current.value =
            data.display_name || `${latitude}, ${longitude}`;
        } catch {
          locationRef.current.value = `${latitude}, ${longitude}`;
        }
      },
      () => alert("Unable to retrieve location")
    );
  };

  // 🔥 Mutation
  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: signUp,
    onSuccess: (_, variables) => {
      localStorage.setItem("verifyEmail", variables.email);
      alert("Account created successfully ✅");
      formRef.current.reset();
      navigate("/Otp");
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "Signup failed ❌");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const terms = formData.get("terms");

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    if (!terms) {
      alert("Accept Terms & Conditions ❌");
      return;
    }

    const payload = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      passcode: formData.get("passcode"),
      password,
      confirmPass: confirmPassword,
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
                <p className={styles.para}>
                  Please fill this form to create your account.
                </p>
              </div>

              <form
                ref={formRef}
                className={styles.authForm}
                onSubmit={handleSubmit}
              >
                {/* Full Name */}
                <div className={styles.inputWrapper}>
                  <input
                    name="fullname"
                    className={styles.inp}
                    type="text"
                    placeholder=" "
                    required
                  />
                  <label className={styles.lbl}>Full Name</label>
                </div>

                {/* Email */}
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

                {/* Phone */}
                <div className={styles.inputWrapper}>
                  <input
                    name="phone"
                    className={styles.inp}
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    placeholder=" "
                    required
                  />
                  <label className={styles.lbl}>Phone</label>
                </div>

                {/* Location */}
                <div className={`${styles.inputWrapper} ${styles.locationWrapper}`}>
                  <input
                    ref={locationRef}
                    name="location"
                    className={`${styles.inp} ${styles.spInp}`}
                    type="text"
                    placeholder=" "
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

                {/* Passcode */}
                <div className={styles.inputWrapper}>
                  <input
                    name="passcode"
                    className={styles.inp}
                    type="text"
                    placeholder=" "
                    required
                  />
                  <label className={styles.lbl}>Pass-Code</label>
                </div>

                {/* Password */}
                <div className={styles.inputWrapper}>
                  <input
                    name="password"
                    className={styles.inp}
                    type="password"
                    placeholder=" "
                    required
                  />
                  <label className={styles.lbl}>Desired Password</label>
                </div>

                {/* Confirm Password */}
                <div className={styles.inputWrapper}>
                  <input
                    name="confirmPassword"
                    className={styles.inp}
                    type="password"
                    placeholder=" "
                    required
                  />
                  <label className={styles.lbl}>Confirm Password</label>
                </div>

                {/* Terms */}
                <div className={styles.checkboxGroup}>
                  <input
                    name="terms"
                    className={styles.inp2}
                    type="checkbox"
                  />
                  <label className={styles.lbl2}>
                    I agree to the Terms of Service and Privacy Policy
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