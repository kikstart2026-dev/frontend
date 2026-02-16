import React from 'react'
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import sms from "../../images/sms.png";
import "./Footer.scss";

export default function () {
  return (
    <div>
      <footer>
        <div className="container">
    <div className="row ">
    <div className=" col-1">
      <img src={logo} alt="" />
      <p>Lorem ipsum dolor sit amet consectetur. Nunc id adipiscing at interdum eu viverra. </p>
      <div className="sms">
        <img src={sms} alt="" />
        <p> info@KikStartKids.com</p>
      </div>
    </div>
    <div className=" col-2">
      <h5>Quick links</h5>
      <ul>
        <li><Link className="#" to="">About Us</Link></li>
        <li><Link className="#" to="">Programs</Link></li>
        <li><Link className="#" to="">Contact Us</Link></li>
         <li><Link className="#" to="">Faqs</Link></li>
      </ul>
    </div>
    <div className="col-3">
      <h5>Legal</h5>
      <ul>
      <li><Link className="#" to="">Terms and Condition</Link></li>
      <li><Link className="#" to="">Privacy Policy</Link></li>
      </ul>
    </div>
    <div className="col-4">
      <h5>Newsletter</h5>
      <p>Enter the email to subscribe our newsletter</p>
      <div className="newsletter">
  <input type="email" placeholder="Enter Email" />
  <button>
    <span>→</span>
  </button>
</div>

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
