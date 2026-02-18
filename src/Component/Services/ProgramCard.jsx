import React from "react";
import "./ProgramCard.scss";

export default function ProgramCard({ image, title, description }) {
  return (
    <div className="program-card">
      <figure>
        <img src={image} alt={title} />
      </figure>
      
      <div className="overlay">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

    </div>
  );
}
