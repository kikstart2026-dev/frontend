import React from 'react'
import Testimonial from '../Testimonial'
import CmnHeading from '../../CmnHeading/CmnHeading'
import testimonialData from '../../../data/testimonialData'
import styles from './TestSection.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export default function TestSection() {
  return (
    <div className={styles.all}>
      <div className={styles.relative}>

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