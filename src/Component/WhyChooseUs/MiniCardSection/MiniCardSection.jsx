import React from "react";
import { useQuery } from "@tanstack/react-query";
import CmnHeading from "../../CmnHeading/CmnHeading";
import MiniCard from "../MiniCard";
import styles from "./MiniCardSection.module.scss";
import "../../../Main.scss";
import { getAllWhyChooseUs } from "../../../apis/api";
import noImg from "../../../assets/images/no-img.png"; // fallback image

export default function MiniCardSection({ limit, showHeading = true }) {

  const { data, isLoading, error } = useQuery({
    queryKey: ["whyChooseUs", limit], // 🔥 important
    queryFn: async () => {
      const res = await getAllWhyChooseUs({
        page: 1,
        limit: limit || 4,
      });
      return res?.data || null;
    },
  });

  const heading = data?.heading || null;
  const cards = data?.cards || [];

  const displayData = limit ? cards.slice(0, limit) : cards;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load data</p>;

  // Dummy fallback heading
  const displayedHeading = heading || {
    tagline: "Not found",
    heading: "No Heading",
    description: "Description not available",
  };

  // Dummy fallback card
  const displayedCards =
    displayData.length > 0
      ? displayData
      : [
        {
          _id: "dummy-card",
          icon: noImg,
          title: "No text",
          description: "",
          color: "#ccc",
        },
        {
          _id: "dummy-card",
          icon: noImg,
          title: "No text",
          description: "",
          color: "#ccc",
        },
        {
          _id: "dummy-card",
          icon: noImg,
          title: "No text",
          description: "",
          color: "#ccc",
        },
        {
          _id: "dummy-card",
          icon: noImg,
          title: "No text",
          description: "",
          color: "#ccc",
        },
      ];

  return (
    <section className={styles["mini-section"]}>
      <div className="container">

        {showHeading && (
          <div className={styles["why-choose-us"]}>
            <CmnHeading
              title={displayedHeading.tagline}
              subtitle={displayedHeading.heading}
              details={displayedHeading.description}
              align="center"
            />
          </div>
        )}

        <div className={`row g-4 ${styles["cards-section"]}`}>
          {displayedCards.map((item) => (
            <div
              key={item._id}
              className="col-lg-3 col-md-6 col-12"
            >
              <MiniCard
                icon={item.icon || noImg}
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