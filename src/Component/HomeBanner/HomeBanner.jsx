import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CmnHeading from "../../Component/CmnHeading/CmnHeading";
import Button from "../../Component/Buttons/Button";
import { getAllHomeBanner } from "../../apis/api";
import Cookies from "js-cookie";
import "../../Main.scss";
import styles from "./HomeBanner.module.scss";
import noImg from "../../assets/images/no-img.png"; // local fallback image

export default function HomeBanner() {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const { data: banner, isLoading, error } = useQuery({
    queryKey: ["homeBanner"],
    queryFn: async () => {
      const res = await getAllHomeBanner();
      const banners = res?.data?.data || res?.data || [];

      const activeBanner = banners.find((b) => b.isActive);

      return activeBanner || banners[0] || null;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load banner</p>;

  // Dummy fallback if no banner
  const displayedBanner = banner || {
    headingData: {
      tagline: "Welcome to Our Website",
      heading: "Dummy| Banner",
      description: "This is banner description.",
    },
    image: noImg,
  };

  // Safely split heading
  const headingParts = displayedBanner.headingData?.heading?.split("|") || ["", ""];

  return (
    <div className={styles.homeBanner}>
      <div className="container">
        <div className="row bannerWrap" style={{ alignItems: "center" }}>
          {/* LEFT SIDE */}
          <div className="col-5">
            <div className={styles.leftContent}>
              <CmnHeading
                title={displayedBanner.headingData?.tagline}
                align="left"
              />

              <h1 className={styles.bannerSubtitle}>
                {headingParts[0]}
                <span className={styles.redText}>{headingParts[1]}</span>
              </h1>

              <p className={styles.text}>
                {displayedBanner.headingData?.description}
              </p>

              {/* Show button only if NOT logged in */}
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
                <img
                  src={displayedBanner.image || noImg} // fallback if image is missing
                  alt="Banner"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}