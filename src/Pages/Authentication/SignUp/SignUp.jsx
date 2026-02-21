import React, { useState } from "react";
import "../../../Main.scss";
import styles from "./SignUp.module.scss";
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

  // 🔥 LOCATION FUNCTION
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
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

          if (data.display_name) {
            setLocation(data.display_name);
          } else {
            setLocation(`${latitude}, ${longitude}`);
          }
        } catch (error) {
          setLocation(`${latitude}, ${longitude}`);
        }
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

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
    <div className={styles.signup}>
      <div className={styles.signupWrap}>
        <div className="row">
          {/* Left */}
          <div className="col-6 left">
            <AuthLeft comment="Have an account?" linkName="SignIn" />
          </div>

          {/* Right */}
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

              <form className={styles.authForm} onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inp}
                    type="text"
                    placeholder=" "
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <label className={styles.lbl}>Full Name</label>
                </div>

                {/* ✅ Email (Proper Email Only) */}
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inp}
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    required
                  />
                  <label className={styles.lbl}>Email</label>
                </div>

                {/* ✅ Phone (Only 10 Digit Number) */}
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inp}
                    type="tel"
                    placeholder=" "
                    value={phone}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      if (onlyNums.length <= 10) {
                        setPhone(onlyNums);
                      }
                    }}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                  />
                  <label className={styles.lbl}>Phone</label>
                </div>

                {/* Location */}
                <div className={`${styles.inputWrapper} ${styles.locationWrapper}`}>
                  <input
                    className={`${styles.inp} ${styles.spInp}`}
                    type="text"
                    placeholder=" "
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <label className={styles.lbl}>Location</label>

                  <button
                    type="button"
                    className={styles.locationBtn}
                    onClick={handleGetLocation}
                  >
                    <i className="bi bi-geo-alt-fill"></i>
                  </button>
                </div>

                {/* Passcode */}
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inp}
                    type="text"
                    placeholder=" "
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    required
                  />
                  <label className={styles.lbl}>Pass-Code</label>
                </div>

                {/* Password */}
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inp}
                    type="password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className={styles.lbl}>Desired Password</label>
                </div>

                {/* Confirm Password */}
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inp}
                    type="password"
                    placeholder=" "
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label className={styles.lbl}>Confirm Password</label>
                </div>

                {/* Terms */}
                <div className={styles.checkboxGroup}>
                  <input
                    className={styles.inp2}
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                  <label className={styles.lbl2}>
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                <Button
                  className={styles.submitBtn}
                  type="submit"
                  text=" SIGN UP"
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