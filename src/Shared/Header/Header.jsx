import React from 'react'
// import { Link } from 'react-router-dom'
import kikstart from '../../assets/images/KIKSTART_logo.png';
import { NavLink, Link } from 'react-router-dom'
// import kikstart from '../../assets/images/KIKSTART_logo.png'
import "./Header.scss";
import "../../Main.scss";
import Button from '../../Component/Buttons/Button';

export default function Header() {
    return (
        <header className="container-fluid">
            <div className="nav-bar">

                {/* Logo */}
                <Link to="/" className="logo">
                    <img src={kikstart} alt="Kikstart Logo" />
                </Link>

                {/* Navigation */}
                <ul className="nav">
                    <li>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
                            About Us
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/programs" className={({ isActive }) => isActive ? "active" : ""}>
                            Programs
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/why-us" className={({ isActive }) => isActive ? "active" : ""}>
                            Why Us
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
                            Contact Us
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/schools" className={({ isActive }) => isActive ? "active" : ""}>
                            Interested Schools
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/coach" className={({ isActive }) => isActive ? "active" : ""}>
                            Become A Coach
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/coach-login" className={({ isActive }) => isActive ? "active" : ""}>
                            Coach's Login
                        </NavLink>
                    </li>
                </ul>

                {/* Right Buttons */}
                <div className="header-right">
                    <Link to="/login" className="btn-login">
                        <Button text="Login" variant="dark" />
                    </Link>

                    <Link to="/demo">
                        <Button text="REQUEST A FREE DEMO" variant="primary" />
                    </Link>
                </div>

            </div>
        </header>
    )
}
