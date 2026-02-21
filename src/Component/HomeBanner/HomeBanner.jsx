import React from 'react';
import { useNavigate } from "react-router-dom";
import CmnHeading from '../../Component/CmnHeading/CmnHeading';
import Button from '../../Component/Buttons/Button';
import mask from "../../assets/images/Mask group.png";
import "../../Main.scss";
import styles from "./HomeBanner.module.scss";

export default function HomeBanner() {
  const navigate = useNavigate();

  return (
    <div className={styles.homeBanner}>
      <div className="container">
        {/* <div className="banner-wrap"> */}
          <div className="row bannerWrap" style={{ alignItems: "center" }}>
            <div className="col-5">
              <div className={styles.leftContent}>
                <CmnHeading title="PLAY LIKE A PRO" align="left" />

                <h1 className={styles.bannerSubtitle}>
                  <span className={styles.blackText}> Never Miss a </span>
                  <br />
                  <span className={styles.redText}>Chance to Play</span>
                </h1>

                <p className={styles.text}>
                  Lorem ipsum dolor sit amet consectetur. Nisl malesuada eu <br/> aenean adipiscing augue arcu facilisis. Nulla dui <br/> ullamcorper maecenas non nunc nam.
                </p>

                <div className={styles.bannerBtn}>
                  <Button
                    text="SIGN UP NOW"
                    variant="primary"
                    onClick={() => navigate("/signup")}
                  />
                </div>

              </div>
            </div>

            <div className="col-7">
              <div className={styles.rightImage}>
                <figure>
                  <img src={mask} alt="Banner" />
                </figure>
              </div>
            </div>

          </div>
        {/* </div> */}
      </div>
    </div>
  );
}