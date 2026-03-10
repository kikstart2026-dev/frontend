import React, { useEffect, useState } from "react";
import CmnHeading from "../../CmnHeading/CmnHeading";
import MiniCard from "../MiniCard";
import styles from "./MiniCardSection.module.scss";
import "../../../Main.scss";
import {getAllWhyChooseUs} from "../../../apis/api"

export default function MiniCardSection({ limit, showHeading = true }) {

  const [heading, setHeading] = useState(null);
  const [cards, setCards] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllWhyChooseUs();

        console.log("API:", res);

        if (res?.data) {
          setHeading(res.data.heading);
          setCards(res.data.cards);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const displayData = limit ? cards.slice(0, limit) : cards;

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