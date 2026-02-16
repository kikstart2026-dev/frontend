import React from 'react';
import "./CmnHeading.scss";

export default function CmnHeading({ title, subtitle }) {
  return (
    <div className='common-heading'>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
    </div>
  )
}