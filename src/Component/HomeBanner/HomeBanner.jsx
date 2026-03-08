import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CmnHeading from "../../Component/CmnHeading/CmnHeading";
import Button from "../../Component/Buttons/Button";
import { getAllHomeBanner } from "../../apis/api";
import Cookies from "js-cookie";
import "../../Main.scss";
import styles from "./HomeBanner.module.scss";

export default function HomeBanner() {

  const navigate = useNavigate();
  const token = Cookies.get("token");

  const { data: banner, isLoading, error } = useQuery({
    queryKey: ["homeBanner"],
    queryFn: async () => {

      const res = await getAllHomeBanner();
      const banners = res?.data?.data || res?.data || [];

      const sorted = [...banners].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return sorted[0]; // latest banner
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load banner</p>;

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
                {banner?.image && (
                  <img
                    src={banner.image}
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