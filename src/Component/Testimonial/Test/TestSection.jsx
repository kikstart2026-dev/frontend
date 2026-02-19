import React from 'react'
import Testimonial from '../Testimonial'
import CmnHeading from '../../CmnHeading/CmnHeading'
import testimonialData from '../../../data/testimonialData'
import './TestSection.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'

export default function TestSection() {
  return (
    <div className='all'>
      <div className="relative">

        <CmnHeading
          title="testimonials"
          subtitle="Whats our client say"
        />

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          loop={true}
        >
          {testimonialData.map((item) => (
            <SwiperSlide key={item.id}>
              <Testimonial {...item} />
            </SwiperSlide>
          ))}
        </Swiper>


      </div>
    </div>
  )
}
