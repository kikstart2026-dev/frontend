import React from 'react'
import TwoSide from '../../Components/TwoSide/TwoSide'
import kid from '../../assets/images/kid.png'
import "./Home.scss";
export default function Home() {

    return (
        <div className='container'>
            <TwoSide img={kid}
                smallheading={'about us'}
                mainheading={'Who we are'}
                paraone={'Lorem ipsum dolor sit amet consectetur. Vitae elit quam volutpat id. Quisque orci lacinia sit non. Diam et adipiscing proin orci. Eget lorem sit etiam molestie rhoncus non. Ut tincidunt tristique suspendisse arcu ac.Curabitur suspendisse tellus placerat libero ut. Enim auctor velit massa integer. Amet interdum at vivamus aliquet mattis integer magna aliquam.Nulla urna aliquam sit eget ac dolor aliquam tincidunt.'}
                paratwo={'Ut fermentum elementum amet elementum arcu suspendisse. Vitae lectus penatibus est sit iaculis quis. Auctor eu vitae imperdiet dignissim hendrerit. A elementum turpis sem quis.'} />

        </div>
    )
}
