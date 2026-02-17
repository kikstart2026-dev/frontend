import React from 'react';
import CmnHeading from '../../Component/CmnHeading/CmnHeading';
import Button from '../../Component/Buttons/Button';
import "../../Main.scss"
import "./HomeBanner.scss"; 

export default function HomeBanner() {
  return (
    <div className='home-banner'>
      <div className='container'>
        <div className="row">
          <div className="left-content">
            <CmnHeading 
              title="PLAY LIKE A PRO" 
              subtitle={<>Never Miss a <br /> <span className="red-text">Chance to Play</span></>} 
              details="Lorem ipsum dolor sit amet consectetur. Nisl malesuada eu aenean adipiscing augue arcu facilisis. Nulla dui ullamcorper maecenas non nunc nam."
              align="left" 
            />
            <div className="banner-btn">
              <Button text="SIGN UP NOW" variant="primary" onClick={() => console.log('Clicked!')} />
            </div>
          </div>
          <div className="right-image">
            <img src="/images/Mask group.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
