import React from 'react'
import Testimonial from '../Testimonial'
import girl from '../../../assets/images/girl.png'
import CmnHeading from '../../CmnHeading/CmnHeading'

export default function TestSection() {
  return (
    <div>
        <CmnHeading
                title="testimonials"
                subtitle="Whats our client say" />
                <Testimonial
                img= {girl}
                para="Lorem ipsum dolor sit amet consectetur. Tortor sed ipsum tortor in et. Arcu tortor phasellus elementum sed natoque pellentesque in elit imperdiet. Sit nisi turpis arcu malesuada purus semper. Bibendum urna dolor at ut tincidunt. Scelerisque dictumst sed."
                miniheading="Cameron Williamson"
                coach="Coach"/>
    </div>
  )
}
