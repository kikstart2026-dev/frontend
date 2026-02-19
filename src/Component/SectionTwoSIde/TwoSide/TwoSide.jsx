import React from 'react'
import kid from '../../../assets/images/kid.png'
import MainTwoSide from '../MainTwoSide'
import Button from '../../Buttons/Button'
import CmnHeading from '../../CmnHeading/CmnHeading'
import './TwoSide.scss'

export default function TwoSide() {
  return (
    <div className='all-flex'>
      <div className="left side">
        <MainTwoSide
        img={kid}/>
      </div>
      <div className="right side">
        <CmnHeading
          title="about us"
          subtitle="Who we are"
          details={
            <>
              <p>Lorem ipsum dolor sit amet consectetur. Vitae elit quam volutpat id. Quisque orci lacinia sit non. Diam et adipiscing proin orci. Eget lorem sit etiam molestie rhoncus non. Ut tincidunt tristique suspendisse arcu ac.Curabitur suspendisse tellus placerat libero ut. Enim auctor velit massa integer. Amet interdum at vivamus aliquet mattis integer magna aliquam.Nulla urna aliquam sit eget ac dolor aliquam tincidunt.</p>
              <p>Ut fermentum elementum amet elementum arcu suspendisse. Vitae lectus penatibus est sit iaculis quis. Auctor eu vitae imperdiet dignissim hendrerit. A elementum turpis sem quis.</p>
            </>
          } align="left"
        />
        <div className="bt">
          <Button    text="know more"  variant="primary"  />
        </div>
      </div>

    </div>
  )
}
