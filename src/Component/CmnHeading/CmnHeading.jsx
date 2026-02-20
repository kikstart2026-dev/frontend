import React from 'react';
import styles from "./CmnHeading.module.scss";
import "../../Main.scss";

export default function CmnHeading({ title, subtitle, details, align = "center"
}) {
  return (
    <div className={`${styles.commonHeading} ${styles[align]}`}>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      {details}
    </div>
  );
}