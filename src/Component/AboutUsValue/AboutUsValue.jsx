import React from 'react'
import kid2 from '../../assets/images/kid2.png'

import './AboutUsValue.scss'
import MainTwoSide from '../SectionTwoSIde/MainTwoSide'
import CmnHeading from '../CmnHeading/CmnHeading'

export default function AboutUsValue() {
    return (
        <div className="container">
            <div className="row align-items-center">

                <div className="col-lg-6 col-md-6 col-12">
                    <MainTwoSide img={kid2} />
                </div>

                <div className="col-lg-6 col-md-6 col-12">
                    <CmnHeading
                        title="about us"
                        subtitle="Who we are"
                        details={
                            <>
                                <p className='first-para'>
                                    Lorem ipsum dolor sit amet consectetur. Vitae elit quam volutpat id. Quisque orci lacinia sit non. Diam et adipiscing proin orci. Eget lorem sit etiam molestie rhoncus non. Ut tincidunt tristique suspendisse arcu ac.
                                    Curabitur suspendisse tellus placerat libero ut. Enim auctor velit massa integer. Amet interdum at vivamus aliquet mattis integer magna aliquam.
                                    Nulla urna aliquam sit eget ac dolor aliquam tincidunt. </p>
                                <p className='second-para'>
                                    Ut fermentum elementum amet elementum arcu suspendisse. Vitae lectus penatibus est sit iaculis quis. Auctor eu vitae imperdiet dignissim hendrerit. A elementum turpis sem quis. Ut tincidunt tristique suspendisse arcu ac.
                                    Curabitur suspendisse tellus placerat libero ut.</p>
                            </>
                        }
                        align="left"
                    />

                </div>

            </div>
        </div>
    )
}
