import React from 'react';
import "./CmnHeading.scss";

export default function CmnHeading({ title, subtitle, details, align = "center" }) {
  return (
    <div className={`common-heading text-${align}`}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>{details}</p>
    </div>
  )
}
