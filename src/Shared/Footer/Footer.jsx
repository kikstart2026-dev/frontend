import React from 'react'
import { Link } from "react-router-dom";
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
                  <Link to="/about">
                    About Us
                  </Link>
                </li>

                <li>
                  <Link to="/programs">
                    Programs
                  </Link>
                </li>

                <li>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link to="/faqs">
                    Faqs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="third">
              <h5>Legal</h5>
              <ul>
                <li>
                  <Link to="/terms">
                    Terms and Condition
                  </Link>
                </li>

                <li>
                  <Link to="/privacy">
                    Privacy Policy
                  </Link>
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

