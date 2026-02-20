import React from "react";
import face from "../../../assets/images/face.png";
import { Link, useLocation } from "react-router-dom";
import "./AuthLeft.scss";

export default function AuthLeft({ comment, linkName }) {

  const location = useLocation();
  
  const oppositePath = location.pathname === "/signup" 
    ? "/signin" 
    : "/signup";

  const hasContent = comment && linkName;

  return (
    <div className="left">
      <div className="left-div">
        <figure className={`figu ${hasContent ? "exspace" : "exspace2"}`}>
          <img src={face} alt="face" className="ima" />
        </figure>

        {hasContent && (
          <div className="paragraph">
            <p className="com">{comment}</p>

            <Link to={oppositePath} className="redL">
              {linkName}
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}