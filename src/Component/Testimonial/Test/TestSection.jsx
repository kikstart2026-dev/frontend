import React from 'react'
import Testimonial from '../Testimonial'
import CmnHeading from '../../CmnHeading/CmnHeading'
import styles from './TestSection.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import { useQuery } from '@tanstack/react-query'
import { getAllTest } from '../../../apis/api'

export default function TestSection() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getAllTest
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading testimonials</p>

  const heading = data?.data?.heading?.heading
  const cards = data?.data?.cards || []

  return (
    <div className={styles.all}>
      <div className={styles.relative}>

        <CmnHeading
          title="testimonials"
          subtitle={heading}
        />

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          loop={true}
        >
          {cards.map((item) => (
            <SwiperSlide key={item._id}>
              <Testimonial
                img={item.image}
                para={item.description}
                miniheading={item.name}
                coach={item.designation}
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  )
}