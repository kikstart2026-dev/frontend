import React from "react";
import CmnHeading from "../../CmnHeading/CmnHeading";
import MiniCard from "../MiniCard";

import "./MiniCardSection.scss";
import "../../../Main.scss";

export default function MiniCardSection({ 
  data = [], 
  limit,
  showHeading = true 
}) {

  const displayData = limit ? data.slice(0, limit) : data;

  return (
    <section className="mini-section">
      <div className="container">

        {showHeading && (
          <div className="why-choose-us">
            <CmnHeading
              title="Why Choose Us"
              subtitle="Give the Gift of Gym"
              details="Lorem ipsum dolor sit amet consectetur. Vitae elit quam volutpat id. Quisque orci lacinia sit non."
              align="center"
            />
          </div>
        )}

        <div className="row cards-section g-4">
          {displayData.map((item, index) => (
            <div
              key={index}
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
