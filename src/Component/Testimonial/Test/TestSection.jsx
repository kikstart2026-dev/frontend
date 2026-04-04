import React from 'react'
import Testimonial from '../Testimonial'
import CmnHeading from '../../CmnHeading/CmnHeading'
import styles from './TestSection.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import noImage from "../../../assets/images/no-img.png";
import { useQuery } from '@tanstack/react-query'
import { getAllTest } from '../../../apis/api'

export default function TestSection() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getAllTest
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading testimonials</p>

  const apiHeading = data?.data?.heading

  const apiCards = data?.data?.cards || []

  // Dummy Heading
  const displayedHeading = apiHeading || {
    tagline: "Not Found",
    heading: "No Heading",
    description: "Description not available"
  }

  // Dummy testimonials
  const dummyCards = [
    {
      _id: "1",
      image: noImage,
      description: "This platform helped me grow my skills and confidence. Highly recommended!",
      name: "Person 1",
      designation: "Designation"
    },
    {
      _id: "2",
      image: noImage,
      description: "Amazing experience! The mentors were very supportive.",
      name: "Person 2",
      designation: "Designation"
    },
    {
      _id: "3",
      image: noImage,
      description: "A great place to learn and build real world projects.",
      name: "Person 3",
      designation: "Designation"
    }
  ]

  // if api empty -> use dummy
  const cards = apiCards.length > 0 ? apiCards : dummyCards

  return (
    <div className={styles.all}>
      <div className={styles.relative}>

        <CmnHeading
          title={displayedHeading.tagline}
          subtitle={displayedHeading.heading}
          details={displayedHeading.description}
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
                para={item.description || ""}
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