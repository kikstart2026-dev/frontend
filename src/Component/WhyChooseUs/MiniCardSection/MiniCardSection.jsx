import React from "react";
import { useQuery } from "@tanstack/react-query";
import CmnHeading from "../../CmnHeading/CmnHeading";
import MiniCard from "../MiniCard";
import styles from "./MiniCardSection.module.scss";
import "../../../Main.scss";
import { getAllWhyChooseUs } from "../../../apis/api";

export default function MiniCardSection({ limit, showHeading = true }) {

  const { data, isLoading, error } = useQuery({
    queryKey: ["whyChooseUs"],
    queryFn: async () => {
      const res = await getAllWhyChooseUs();
      console.log("API:", res);
      return res?.data || null;
    },
  });

  const heading = data?.heading || null;
  const cards = data?.cards || [];

  const displayData = limit ? cards.slice(0, limit) : cards;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load data</p>;

  return (
    <section className={styles["mini-section"]}>
      <div className="container">

        {showHeading && heading && (
          <div className={styles["why-choose-us"]}>
            <CmnHeading
              title={heading.tagline}
              subtitle={heading.heading}
              details={heading.description}
              align="center"
            />
          </div>
        )}

        <div className={`row g-4 ${styles["cards-section"]}`}>
          {displayData.map((item) => (
            <div
              key={item._id}
              className="col-lg-3 col-md-6 col-12"
            >
              <MiniCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                color={item.color}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}