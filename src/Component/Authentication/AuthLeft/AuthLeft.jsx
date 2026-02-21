import React, { useState, useEffect } from "react";
import face from "../../../assets/images/face.png";
import { Link, useLocation } from "react-router-dom";
import styles from "./AuthLeft.module.scss";

export default function AuthLeft({ comment, linkName }) {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [activeSocial, setActiveSocial] = useState(null); // NEW

  const oppositePath =
    location.pathname === "/signup" ? "/signin" : "/signup";

  const hasContent = comment && linkName;

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkTheme");
    } else {
      document.body.classList.remove("darkTheme");
    }
  }, [darkMode]);

  return (
    <div className={`${styles.left} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.leftDiv}>

        {/* Toggle Button */}
        <div className={styles.toggleWrap}>
          <button
            className={styles.toggleBtn}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <i className="bi bi-sun-fill"></i>
            ) : (
              <i className="bi bi-moon-fill"></i>
            )}
          </button>
        </div>

        <figure className={styles.figu}>
          <img src={face} alt="face" className={styles.ima} />
        </figure>

        {hasContent && (
          <div className={styles.paragraph}>
            <p className={styles.com}>{comment}</p>
            <Link to={oppositePath} className={styles.redL}>
              {linkName}
            </Link>
          </div>
        )}

        {/* Social Buttons */}
        <div className={styles.socialLogin}>
          <button
            onClick={() => setActiveSocial("google")}
            className={`${styles.googleBtn} ${
              activeSocial === "google" ? styles.activeGoogle : ""
            }`}
          >
            <i className="bi bi-google"></i>
            Continue with Google
          </button>

          <button
            onClick={() => setActiveSocial("facebook")}
            className={`${styles.facebookBtn} ${
              activeSocial === "facebook" ? styles.activeFacebook : ""
            }`}
          >
            <i className="bi bi-facebook"></i>
            Continue with Facebook
          </button>
        </div>

      </div>
    </div>
  );
}