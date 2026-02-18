import React from "react";
import ProgramCard from "../ProgramCard";
import { programsData } from "../../../Data/programData";
import "./ProgramsSection.scss";
import Button from "../../Buttons/Button";
import { Link } from "react-router-dom";
import CmnHeading from "../../CmnHeading/CmnHeading";


export default function ProgramsSection() {
  return (
    <>
      <section className="back-color">
        <div className="container">
          <div className="why-choose-us">
            <CmnHeading
              title="SERVICES"
              subtitle="Children’s Fitness Programs"
              align="center"
            />
          </div>

          <div className="programs-section curve-part">
            {programsData.map((item, index) => (
              <ProgramCard
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
          
          <div className="view-btn">
            <Link to="/demo" >
              <Button text="View all" variant="primary" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
