import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import sms from "../../assets/images/sms.png";
import arrow from "../../assets/images/arrow.png";
import styles from "./Footer.module.scss";   // 👈 change here

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
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.total}>

            <div className={styles.first}>
              <Link to="/"> <img src={logo} alt="Logo" /> </Link>
              <p>Lorem ipsum dolor sit amet consectetur. Nunc id adipiscing at interdum eu viverra. </p>
              <div className={styles.sms}>
                <img src={sms} alt="Email Icon" />
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=kikstart2026@gmail.com&su=Contacting KikStart Support&body=Hello KikStart Team,%0D%0A%0D%0AI would like to contact you regarding..."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  kikstart2026@gmail.com
                </a>
              </div>
            </div>

            <div className={styles.second}>
              <h5>Quick links</h5>
              <ul>
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.third}>
              <h5>Legal</h5>
              <ul>
                {legalLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.fourth}>
              <h5>Newsletter</h5>
              <p>Enter the email to subscribe our newsletter</p>
              <div className={styles.search}>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className={styles.searchInput}
                />
                <button className={styles.submitBtn} type="submit">
                  <span><img src={arrow} alt="arrow"/>
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </footer>

      <div className="container">
        <div className={styles.footerLower}>
          <p>© Copyright 2024 kikstart - All Rights Reserved</p>
          <p className={styles.right}>Website Design by Webskitters</p>
        </div>
      </div>
    </div>
  );
}

