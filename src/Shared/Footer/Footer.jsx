import React from 'react'
import { Link } from "react-router-dom";
import "./Footer.scss";

export default function () {
  return (
    <div>
      <footer>
        <div className="container">
    <div className="total">
    <div className="first">
      <img src="/images/logo.png" alt="" />
      <p>Lorem ipsum dolor sit amet consectetur. Nunc id adipiscing at interdum eu viverra. </p>
      <div className="sms">
        <img src="/images/sms.png" alt="" />
        <p> info@KikStartKids.com</p>
      </div>
    </div>
    <div className="second">
      <h5>Quick links</h5>
      <ul>
        <li><Link className="#" to="">About Us</Link></li>
        <li><Link className="#" to="">Programs</Link></li>
        <li><Link className="#" to="">Contact Us</Link></li>
         <li><Link className="#" to="">Faqs</Link></li>
      </ul>
    </div>
    <div className="third">
      <h5>Legal</h5>
      <ul>
      <li><Link className="#" to="">Terms and Condition</Link></li>
      <li><Link className="#" to="">Privacy Policy</Link></li>
      </ul>
    </div>
    <div className="fourth">
      <h5>Newsletter</h5>
      <p>Enter the email to subscribe our newsletter</p>

     <div className="search">
  <i className="fa-solid fa-magnifying-glass"></i>

  <input
    type="text"
    placeholder="Search for creator or category"
    className="search-input"
  />

  <button className="submit-btn" type="submit">
    <span>→</span>
  </button>
</div>

  {/* <div className="newsletter-box">
  <input 
    type="email" 
    placeholder="Enter Email" 
    className="newsletter-input" 
  />
  <button type="submit" className="newsletter-btn">
    <span>→</span>
  </button>
</div> */}

    </div>
  </div>
</div>
      </footer>

<div className="container">
      <div className="footer-lower">
        
          <p>© Copyright 2024 kikstart - All Rights Reserved</p>
          <p className='right'>Website Design by Webskitters</p>
        
      </div>
      </div>
    </div>
  )
}
