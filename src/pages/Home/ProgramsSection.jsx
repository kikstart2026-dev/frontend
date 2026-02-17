import React from "react";
import ProgramCard from "../../Component/ProgramCard/ProgramCard";
import { programsData } from "../../data/programData";
import "./ProgramsSection.scss";


export default function ProgramsSection() {
  return (
    <div className="container">
        <div className="programs-section">

      {programsData.map((item, index) => (
        <ProgramCard
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
        />
      ))}

    </div>
    </div>
    
  );
}
