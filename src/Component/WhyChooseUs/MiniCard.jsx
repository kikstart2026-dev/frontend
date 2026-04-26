import React from "react";
import styles from "./MiniCard.module.scss";
import DOMPurify from "dompurify";
import "../../Main.scss";

export default function MiniCard({ icon, title, description, color }) {


const cleanHtml = description
  .replace(/style="[^"]*"/g, "")   // remove inline styles
  .replace(/&nbsp;/g, " ");        // fix spacing

  return (
    <div className={styles["mini-card"]}>
      <figure
        className={styles["icon-box"]}
        style={{ backgroundColor: color }}
      >
        <img src={icon} alt={title} />
      </figure>

      <h3>{title}</h3>

    <div
  dangerouslySetInnerHTML={{
    __html: cleanHtml,
  }}
/>
    </div>
  );
}