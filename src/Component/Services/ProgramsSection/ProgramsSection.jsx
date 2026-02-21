import React from "react";
import ProgramCard from "../ProgramCard";
import { programsData } from "../../../data/programData";
import styles from "./ProgramsSection.module.scss";
import Button from "../../Buttons/Button";
import { Link } from "react-router-dom";
import CmnHeading from "../../CmnHeading/CmnHeading";

export default function ProgramsSection({ limit, showHeading = true }) {

  // 🔥 Slice logic (same as MiniCardSection)
  const displayPrograms = limit 
    ? programsData.slice(0, limit) 
    : programsData;

  return (
    <section className={styles["back-color"]}>
      <div className="container">

        {showHeading && (
          <div className="why-choose-us">
            <CmnHeading
              title="SERVICES"
              subtitle="Children’s Fitness Programs"
              align="center"
            />
          </div>
        )}

        <div className={`row ${styles["programs-section"]}`}>
          {displayPrograms.map((item, index) => (
            <div
              key={index}
              className={`col-lg-4 col-md-6 col-12 mb-4 d-flex ${styles.programCardCol}`}
            >
              <ProgramCard
                image={item.image}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>

        <div className={styles["view-btn"]}>
          <Link to="/demo">
            <Button text="View all" variant="primary" />
          </Link>
        </div>

      </div>
    </section>
  );
}