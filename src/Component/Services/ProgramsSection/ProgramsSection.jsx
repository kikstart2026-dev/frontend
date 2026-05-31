import React from "react";
import ProgramCard from "../ProgramCard";
import styles from "./ProgramsSection.module.scss";
import Button from "../../Buttons/Button";
import { Link } from "react-router-dom";
import CmnHeading from "../../CmnHeading/CmnHeading";
import { getAllService } from "../../../apis/api";
import { useQuery } from "@tanstack/react-query";

export default function ProgramsSection({ limit, showHeading = true }) {

  const { data: services = [], isLoading: loading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await getAllService();

      // ✅ IMPORTANT
      return res.data;
    },
  });

  // ✅ First service থেকে heading নিচ্ছি
  const headingData = services?.[0]?.headingData;

  const displayPrograms = limit
    ? services.slice(0, limit)
    : services;

  return (
    <section className={styles["back-color"]}>
      <div className="container">

        {/* ✅ Dynamic Heading */}
        {showHeading && headingData && (
          <div className="why-choose-us">
            <CmnHeading
              title={headingData.tagline}
              subtitle={headingData.heading}
              align="center"
            />
          </div>
        )}

        
          <div className={`row ${styles["programs-section"]}`}>
            {displayPrograms.map((item) => (
              <div
                key={item._id}
                className={`col-lg-4 col-md-6 col-12 mb-4 d-flex ${styles.programCardCol}`}
              >
                <ProgramCard
                  id={item._id}
                  image={item.image}
                  title={item.title}
                  description={item.details}
                  details2={item.details2}
                  video={item.video}
                />
              </div>
            ))}
          </div>
        

        <div className={styles["view-btn"]}>
          <Link
            to="/Programs"
            onClick={() => {
              setTimeout(() => window.scrollTo(0, 0), 100);
            }}
          >
            <Button text="View all" variant="primary" />
          </Link>
        </div>

      </div>
    </section>
  );
}