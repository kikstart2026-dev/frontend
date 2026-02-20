import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../Main.scss";
import styles from "./CommonBanner.module.scss";
import BannerCurve from "../../assets/images/curve1.png";

export default function CommonBanner({ title, align = "center" }) {
  const location = useLocation();

  const currentPath = location.pathname.split("/")[1] || "";
  const pageName =
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <div className={styles.commonBanner}>

      <div className={`container ${styles.contentWrapper} ${styles[align]}`}>
        <h1>{title}</h1>

        <div className={styles.breadcrumbCustom}>
          <Link to="/">Home</Link>
          <span> / </span>
          <span className={`${styles.activePage} ${styles.props}`}>
            {pageName}
          </span>
        </div>
      </div>

      <figure className={styles.curve}>
        <img src={BannerCurve} alt="curve" />
      </figure>

    </div>
  );
}
