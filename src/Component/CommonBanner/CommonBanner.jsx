import React from "react";
import { Link } from "react-router-dom";
import "../../Main.scss";
import styles from "./CommonBanner.module.scss";
import BannerCurve from "../../assets/images/curve1.png";

export default function CommonBanner({ 
  title, 
  align = "center", 
  pageName 
}) {
  return (
    <div className={styles.commonBanner}>

      <div className={`container ${styles.contentWrapper} ${styles[align]}`}>
        <h1>{title}</h1>

        <div className={styles.breadcrumbCustom}>
          <Link to="/">Home</Link>
          <span> / </span>
          <span className={styles.activePage}>
            {pageName || title}
          </span>
        </div>
      </div>

      <figure className={styles.curve}>
        <img src={BannerCurve} alt="curve" />
      </figure>

    </div>
  );
}