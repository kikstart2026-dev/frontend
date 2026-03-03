import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CmnHeading from "../../Component/CmnHeading/CmnHeading";
import Button from "../../Component/Buttons/Button";
import { getAllHomeBanner } from "../../apis/api";
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

        if (res?.data?.length > 0) {
          setBanner(res.data[0]);
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

              <div className={styles.bannerBtn}>
                <Button
                  className={styles.editbtn}
                  text="SIGN UP NOW"
                  variant="primary"
                  onClick={() => navigate("/signup")}
                />
              </div>

            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="col-7">
            <div className={styles.rightImage}>
              <figure>
                {banner?.image && (
                  <img
                    src={`${BASE_URL}${banner.image}`}
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