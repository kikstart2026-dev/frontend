import React from "react";
import styles from "./SchoolsCardSection.module.scss";
import SchoolCardData from "../../../data/SchoolCardData";
import SchoolsCard from "../SchoolsCard";

export default function SchoolsCardSection() {
  return (
    <section className={styles.schoolsCardSection}>
      <div className="container">
        <div className="row g-4">
          {SchoolCardData.map((card) => (
            <div
              key={card.id}
              className="col-lg-4 col-md-6 col-sm-12"
            >
              <SchoolsCard
                image={card.image}
                title={card.title}
                description={card.description}
                coach={card.coach}
                author={card.author}
                authorImg={card.authorImg}
              />
            </div>
          ))}
        </div>
        <nav className="mt-4">
          <ul className={`pagination justify-content-center ${styles.customPagination}`}>

            <li className="page-item arrow">
              <button className="page-link arrow">&lt;</button>
            </li>

            <li className="page-item ">
              <button className="page-link num">1</button>
            </li>

            <li className="page-item">
              <button className="page-link num">2</button>
            </li>

            <li className="page-item arrow">
              <button className="page-link arrow">&gt;</button>
            </li>

          </ul>
        </nav>
      </div>
    </section>
  );
}
