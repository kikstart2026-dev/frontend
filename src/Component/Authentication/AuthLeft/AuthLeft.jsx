import React from "react";
import face from "../../../assets/images/face.png";
import { Link, useLocation } from "react-router-dom";
import styles from "./AuthLeft.module.scss";

export default function AuthLeft({ comment, linkName }) {

  const location = useLocation();
  
  const oppositePath =
    location.pathname === "/signup" ? "/signin" : "/signup";

  const hasContent = comment && linkName;

  return (
    <div className={styles.left}>
      <div className={styles.leftDiv}>
        
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

      </div>
    </div>
  );
}