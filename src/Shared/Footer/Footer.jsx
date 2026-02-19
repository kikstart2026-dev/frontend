import React from 'react'
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import sms from "../../assets/images/sms.png"
import "./Footer.scss";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="total">

            <div className="first">
              <img src={logo} alt="" />
              <p>Lorem ipsum dolor sit amet consectetur. Nunc id adipiscing at interdum eu viverra. </p>
              <div className="sms">
                <img src={sms} alt=""/>
                <p>info@KikStartKids.com</p>
              </div>
            </div>

            <div className="second">
              <h5>Quick links</h5>
              <ul>
                <li>
                  <NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>
                    About Us
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/programs" className={({isActive}) => isActive ? "active" : ""}>
                    Programs
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>
                    Contact Us
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/faqs" className={({isActive}) => isActive ? "active" : ""}>
                    Faqs
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="third">
              <h5>Legal</h5>
              <ul>
                <li>
                  <NavLink to="/terms" className={({isActive}) => isActive ? "active" : ""}>
                    Terms and Condition
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/privacy" className={({isActive}) => isActive ? "active" : ""}>
                    Privacy Policy
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="fourth">
              <h5>Newsletter</h5>
              <p>Enter the email to subscribe our newsletter</p>

              <div className="search">
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="search-input"
                />
                <button className="submit-btn" type="submit" >
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
