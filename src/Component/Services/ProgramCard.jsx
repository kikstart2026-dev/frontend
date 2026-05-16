import React from "react";
import styles from "./ProgramCard.module.scss";
import { Link } from "react-router-dom";

export default function ProgramCard({
  id,
  image,
  title,
  description,
}) {

  const cleanHtml = (description || "")
    // .replace(/style="[^"]*"/g, "")
    .replace(/&nbsp;/g, " ");

  return (
    <Link
      to="/ProgramDeatailsPage"
      state={{ id }}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.card}>

        <img src={image} alt={title} />

        <div className={styles.overlay}>

          <div className={styles.content}>

            <h3>{title}</h3>

            <div
              className={styles.clamp2}
              dangerouslySetInnerHTML={{
                __html: cleanHtml,
              }}
            />

          </div>

        </div>

      </div>
    </Link>
  );
}