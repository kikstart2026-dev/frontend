import React from "react";
import "./MiniCard.scss";
import "../../Main.scss";

export default function MiniCard({ icon, title, description, color }) {
  return (
    <div className="mini-card">

      <figure className="icon-box" style={{ backgroundColor: color }}>
        <img src={icon} alt={title} />
      </figure>

      <h3>{title}</h3>
      <p>{description}</p>

    </div>
  );
}
