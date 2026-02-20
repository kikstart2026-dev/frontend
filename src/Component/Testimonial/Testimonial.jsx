import React from 'react'
import './Testimonial.scss'

export default function Testimonial({ img, para, miniheading, coach }) {
    return (
        <div>
            
            <figure className='girl2'><img  src={img} /></figure>
            <p className='paraa same'>{para}</p>
            <h3 className='miniheading same'>{miniheading}</h3>
            <h4 className='coach same'>{coach}</h4>
        </div>
    )
}
