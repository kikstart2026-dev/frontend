import React, { useState } from "react";
import styles from "./SchoolsCard.module.scss";
import "../../Main.scss";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";


import "react-quill-new/dist/quill.snow.css";

export default function SchoolsCard({
  image,
  title,
  description,
  coach,
  author,
  authorImg,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.schoolsCard}>
      <div className={styles.cardImg}>
        <img src={image} alt={title} />
      </div>

      <div className={styles.cardContent}>
        <h3>{title}</h3>

        {/* Quill HTML */}
        <div className="ql-snow">
          <div
            className={`ql-editor ${styles.description} ${expanded ? styles.expanded : styles.collapsed
              }`}
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <button
            type="button"
            className={styles.readMore}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        </div>

        <div className={styles.cardAuthor}>
          <span>
            <img src={authorImg} alt={author} />
          </span>

          <div className={styles.author}>
            <p className={styles.coach}>{coach}</p>
            <p>{author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}