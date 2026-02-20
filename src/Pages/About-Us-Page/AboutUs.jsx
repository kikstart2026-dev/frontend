import React from 'react'
import AboutUsValue from '../../Component/AboutUsValue/AboutUsValue'
import TestSection from '../../Component/Testimonial/Test/TestSection'
import AboutMid from '../../Component/AboutMid/AboutMid'

export default function AboutUs() {
  return (
    <div>
        <div className='container'>
          <AboutUsValue/>
          <AboutMid/>

        </div>
        <div className='container'>
          <TestSection/>
        </div>

    </div>
    
  )
}
