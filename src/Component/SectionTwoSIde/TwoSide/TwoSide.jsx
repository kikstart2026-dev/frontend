import React from "react";
import { useQuery } from "@tanstack/react-query";
import MainTwoSide from "../MainTwoSide";
import Button from "../../Buttons/Button";
import styles from "./TwoSide.module.scss";
import { getAllAboutUs } from "../../../apis/api";
import noImg from "../../../assets/images/no-img.png";
import CmnHeading from "../../CmnHeading/CmnHeading";

export default function TwoSide() {
  const { data: about, isLoading, error } = useQuery({
    queryKey: ["aboutSection"],
    queryFn: async () => {
      const res = await getAllAboutUs();
      const aboutData = res?.data?.data || res?.data || [];
      const activeAbout = aboutData.find((a) => a.isActive);
      return activeAbout || aboutData[0] || null;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load about section</p>;

  const displayedAbout = about || {
    headingData: {
      tagline: "Not Found",
      heading: "No Heading",
      description: "Description is not available",
    },
    image: noImg,
  };

  // ✅ CLEAN + FIX HTML STRING
  const cleanDescription = (displayedAbout?.headingData?.description || "")
    .replace(/([.!?])([A-Za-z])/g, "$1 $2") // fix: Generator!This → Generator! This
    .replace(/&nbsp;/g, " "); // fix: remove &nbsp;

  return (
    <div className="both-space">
      <div className="container">
        <div className="row align-items-center">
          
          {/* LEFT IMAGE */}
          <div className="col-lg-6 col-md-6 col-12">
            <MainTwoSide img={displayedAbout.image} />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6 col-md-6 col-12">
            
            <CmnHeading
              title={displayedAbout.headingData?.tagline}
              subtitle={displayedAbout.headingData?.heading}
              details={
                <div
                  className={styles.firstPara}
                  dangerouslySetInnerHTML={{ __html: cleanDescription }}
                />
              }
              align="left"
            />

            {about && (
              <div className={styles.buttonWrapper}>
                <Button text="Know More" variant="primary" />
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}