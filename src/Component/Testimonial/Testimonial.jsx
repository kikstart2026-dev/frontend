import React from 'react'
import CmnHeading from '../CmnHeading/CmnHeading'

export default function Testimonial({ img, para, miniheading, coach }) {
    return (
        <div>
            
            <figure><img src={img} /></figure>
            <p>{para}</p>
            <h3>{miniheading}</h3>
            <h4>{coach}</h4>
        </div>
    )
}
