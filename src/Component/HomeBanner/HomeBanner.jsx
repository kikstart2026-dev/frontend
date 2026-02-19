import React from 'react';
import CmnHeading from '../../Component/CmnHeading/CmnHeading';
import Button from '../../Component/Buttons/Button';
import mask from "../../assets/images/Mask group.png";
import "../../Main.scss"
import "./HomeBanner.scss"; 

export default function HomeBanner() {
  return (
    <div className='home-banner'>
      <div className='container'>
        <div className="banner-wrap">
          <div className="row">
            <div className="col-5">
          <div className="left-content">
            <CmnHeading 
              title="PLAY LIKE A PRO" 
              subtitle={<>Never Miss a <br /> <span className="red-text">Chance to Play</span></>} 
                details={
                        <>
                            <p>Lorem ipsum dolor sit amet consectetur. Nisl malesuada eu aenean adipiscing augue arcu facilisis. Nulla dui ullamcorper maecenas non nunc nam.</p>  </>}
              align="left"
            />
            <div className="banner-btn">
              <Button text="SIGN UP NOW" variant="primary" onClick={() => console.log('Clicked!')} />
            </div>
          </div>
          </div>
          <div className="col-7">
          <div className="right-image">
            <figure><img src={mask} alt="" /></figure>
            
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
