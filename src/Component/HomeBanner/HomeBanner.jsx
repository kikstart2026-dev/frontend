import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CmnHeading from "../../Component/CmnHeading/CmnHeading";
import Button from "../../Component/Buttons/Button";
import { getAllHomeBanner } from "../../apis/api";
import Cookies from "js-cookie";
// import mask from "../../assets/images/Mask group.png";
import "../../Main.scss";
import styles from "./HomeBanner.module.scss";

export default function HomeBanner() {
  const navigate = useNavigate();

  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:8008";

useEffect(() => {
  const fetchBanner = async () => {
    try {
      const res = await getAllHomeBanner();

      const banners = res?.data?.data || res?.data || [];

      const sorted = [...banners].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      if (sorted.length > 0) {
        setBanner(sorted[0]); // latest banner
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchBanner();
}, []);

  if (loading) return <p>Loading...</p>;
  // ✅ Check token
  const token = Cookies.get("token");

  return (
    <div className={styles.homeBanner}>
      <div className="container">
        <div className="row bannerWrap" style={{ alignItems: "center" }}>

          {/* LEFT SIDE */}
          <div className="col-5">
            <div className={styles.leftContent}>

              <CmnHeading
                title={banner?.headingData?.subheading}
                align="left"
              />
              <h1 className={styles.bannerSubtitle}>
                {banner?.headingData?.heading?.split("|")[0]}
                <span className={styles.redText}>
                  {banner?.headingData?.heading?.split("|")[1]}
                </span>
              </h1>

              <p className={styles.text}>
                {banner?.headingData?.description}
              </p>

              {/* ✅ Show button only if NOT logged in */}
              {!token && (
                <div className={styles.bannerBtn}>
                  <Button
                    className={styles.editbtn}
                    text="SIGN UP NOW"
                    variant="primary"
                    onClick={() => navigate("/signup")}
                  />
                </div>
              )}

            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="col-7">
            <div className={styles.rightImage}>
              <figure>
                {banner?.image && (
                  <img
                    src={`${banner.image}`}
                    alt="Banner"
                  />
                )}
              </figure>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}