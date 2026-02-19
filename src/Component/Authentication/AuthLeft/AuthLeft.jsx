import React from "react";
import face from "../../../assets/images/face.png";
import { Link, useLocation } from "react-router-dom";
import "./AuthLeft.scss";

export default function AuthLeft({ comment, linkName }) {

  const location = useLocation();
  
  const oppositePath = location.pathname === "/signup" 
    ? "/signin" 
    : "/signup";

  return (
    <div className="left">
      <div className="container">
        <div className="left-box">
          <figure>
            <img src={face} alt="face" className="ima" />
          </figure>

          <div className="para">
            <p>{comment}</p>

            <Link to={oppositePath} className="link">
              {linkName}
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
