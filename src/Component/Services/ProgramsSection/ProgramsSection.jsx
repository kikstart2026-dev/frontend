import React, { useState } from "react";
import ProgramCard from "../ProgramCard";
import styles from "./ProgramsSection.module.scss";
import Button from "../../Buttons/Button";
import { Link } from "react-router-dom";
import CmnHeading from "../../CmnHeading/CmnHeading";
import { getAllService } from "../../../apis/api";
import { useQuery } from "@tanstack/react-query";

export default function ProgramsSection({ limit, showHeading = true }) {
  const [headingData, setHeadingData] = useState(null);

  const { data: services = [], isLoading: loading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await getAllService();
      const serviceData = res.data;

      // 🔥 Heading backend থেকে নিচ্ছি (first item থেকে)
      if (serviceData.length > 0) {
        setHeadingData(serviceData[0].headingData);
      }

      return serviceData;
    },
  });

  const displayPrograms = limit ? services.slice(0, limit) : services;

  return (
    <section className={styles["back-color"]}>
      <div className="container">
        {/* ✅ Dynamic Heading from Backend */}
        {showHeading && headingData && (
          <div className="why-choose-us">
            <CmnHeading
              title={headingData.tagline}
              subtitle={headingData.heading}
              align="center"
            />
          </div>
        )}

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className={`row ${styles["programs-section"]}`}>
            {displayPrograms.map((item, index) => (
              <div
                key={index}
                className={`col-lg-4 col-md-6 col-12 mb-4 d-flex ${styles.programCardCol}`}
              >
                <ProgramCard
                  image={item.image}
                  title={item.title}
                  description={item.details}
                  details2={item.details2}
                  video={item.video}
                />
              </div>
            ))}
          </div>
        )}

        <div className={styles["view-btn"]}>
          <Link to="/Programs">
            <Button text="View all" variant="primary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
