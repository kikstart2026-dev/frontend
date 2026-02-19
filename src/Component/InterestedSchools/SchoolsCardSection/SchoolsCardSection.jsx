import React from "react";
import "./SchoolsCardSection.scss";
import SchoolCardData from "../../../data/SchoolCardData";
import SchoolsCard from "../SchoolsCard";

export default function SchoolsCardSection() {
  return (
    <section className="schools-card-section">
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
      </div>
    </section>
  );
}
