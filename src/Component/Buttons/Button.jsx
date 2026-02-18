import React from "react";
import "./Button.scss";
import "../../Main.scss";

export default function Button({ text, onClick, variant = "primary" }) {
  return (
    <button className={`custom-btn ${variant}`} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}