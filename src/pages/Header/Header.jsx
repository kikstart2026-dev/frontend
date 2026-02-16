import React from 'react'
import { Link } from 'react-router-dom'
import kikstart from '../../assets/images/KIKSTART_logo.png'
import "./Header.scss";
export default function Header() {
    return (
        <div className="container-fluid">
            <div className="nav-bar">
                <Link to="/">
                    <img src={kikstart} alt="photo"/>
                </Link>
                <ul class="nav">
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/about">Programs</Link>
                    </li>
                    <li>
                        <Link to="/about">Why Us</Link>
                    </li>
                    <li>
                        <Link to="/about">Contact Us</Link>
                    </li>
                    <li>
                        <Link to="/about">Interrested Schools</Link>
                    </li>
                    <li>
                        <Link to="/about">Become A Coach</Link>
                    </li>
                    <li>
                        <Link to="/about">Coach's Login</Link>
                    </li>
                </ul>
                <div class="header-right">
                    <Link to="/about">login</Link>
                    <Link to="/about">REQUEST A FREE DEMO</Link>
                </div>
            </div>
        </div>
    )
}
