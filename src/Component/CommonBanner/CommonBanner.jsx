import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../Main.scss"
import "./CommonBanner.scss";
import BannerCurve from "../../assets/images/curve1.png";

export default function CommonBanner({ title, align = "center" }) {
  const location = useLocation();

  const currentPath = location.pathname.split("/")[1];
  const pageName =
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <div className="common-banner">

      <div className={`container content-wrapper text-${align}`}>
        <h1>{title}</h1>

        <div className="breadcrumb-custom">
          <Link to="/">Home</Link>
          <span> / </span>
          <span className="active-page">{pageName}</span>
        </div>
      </div>

      <figure className="Curve">
        <img src={BannerCurve} alt="curve" />
      </figure>

    </div>
  );
}
