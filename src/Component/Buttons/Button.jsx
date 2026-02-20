import React from "react";
import styles from "./Button.module.scss";
import "../../Main.scss";

export default function Button({ text, onClick, variant = "primary" }) {
  return (
    <button
      className={`${styles.customBtn} ${styles[variant]}`}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
}