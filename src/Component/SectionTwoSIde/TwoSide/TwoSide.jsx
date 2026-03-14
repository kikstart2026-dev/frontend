import React, { useEffect, useState } from "react";
import MainTwoSide from "../MainTwoSide";
import Button from "../../Buttons/Button";
import CmnHeading from "../../CmnHeading/CmnHeading";
import styles from "./TwoSide.module.scss";
import { getAllAboutUs } from "../../../apis/api";

export default function TwoSide() {

  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllAboutUs();

        console.log("ABOUT API:", res);

        if (res?.data?.length) {
          setAbout(res.data[0]);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!about) return null;

  return (
    <div className="both-space">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6 col-md-6 col-12">
            <MainTwoSide img={about.image} />
          </div>

          <div className="col-lg-6 col-md-6 col-12">
            <CmnHeading
              title={about.headingData?.tagline}
              subtitle={about.headingData?.heading}
              details={
                <>
                  <p className={styles.firstPara}>
                    {about?.headingData?.description?.split("|")[0]}
                  </p>

                  <p className={styles.secondPara}>
                    {about?.headingData?.description?.split("|")[1]}
                  </p>
                </>
              }
              align="left"
            />

            <div className={styles.buttonWrapper}>
              <Button text="know more" variant="primary" />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}