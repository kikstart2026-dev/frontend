import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import sms from "../../assets/images/sms.png";
import "./Footer.scss";

const quickLinks = [
  { label: "About Us", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Contact Us", path: "/contact" },
  { label: "Faqs", path: "/faqs" },
];

const legalLinks = [
  { label: "Terms and Condition", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
];

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="total">
            {/* First */}
            <div className="first">
              <Link to="/"> <img src={logo} alt="Logo" /> </Link>
              <p>Lorem ipsum dolor sit amet consectetur. Nunc id adipiscing at interdum eu viverra.</p>
              <div className="sms">
                <img src={sms} alt="Email Icon" />
                <p>info@KikStartKids.com</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="second">
              <h5>Quick links</h5>
              <ul>
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="third">
              <h5>Legal</h5>
              <ul>
                {legalLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="fourth">
              <h5>Newsletter</h5>
              <p>Enter the email to subscribe our newsletter</p>
              <div className="search">
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="search-input"
                />
                <button className="submit-btn" type="submit">
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
          <p className="right">Website Design by Webskitters</p>
        </div>
      </div>
    </div>
  );
}

