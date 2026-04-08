import React from 'react'
import styles from './AboutUsValue.module.scss'
import MainTwoSide from '../SectionTwoSIde/MainTwoSide'
import CmnHeading from '../CmnHeading/CmnHeading'

export default function AboutUsValue({ aboutData }) {

  const desc = aboutData?.headingData?.description || "";
  const parts = desc.split("|");

  return (
    <div className={`container ${styles.aboutUsValue}`}>
      <div className="row align-items-center">

        <div className="col-lg-6 col-md-6 col-12">
          <MainTwoSide img={aboutData?.image} />
        </div>

        <div className="col-lg-6 col-md-6 col-12">

          <CmnHeading
            title={aboutData?.headingData?.tagline || "About Us"}
            subtitle={aboutData?.headingData?.heading || "Who we are"}
            details={
              <>
                <p
                  className={styles.firstPara}
                  dangerouslySetInnerHTML={{
                    __html: parts[0] || "",
                  }}
                />

                <p
                  className={styles.secondPara}
                  dangerouslySetInnerHTML={{
                    __html: parts[1] || "",
                  }}
                />
              </>
            }
            align="left"
          />

        </div>

      </div>
    </div>
  )
}