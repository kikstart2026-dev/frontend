import React from 'react'
import { Link } from 'react-router-dom'
import kikstart from '../../assets/images/KIKSTART_logo.png';
import "./Header.scss";
import Button from '../../Component/Buttons/Button';
export default function Header() {
    return (
        <div className="container-fluid">
            <div className="nav-bar">
                <Link to="/">
                    <img src={kikstart} alt="photo" />
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
                        <Link to="/about">Interested Schools</Link>
                    </li>
                    <li>
                        <Link to="/about">Become A Coach</Link>
                    </li>
                    <li>
                        <Link to="/about">Coach's Login</Link>
                    </li>
                </ul>
                <div className="header-right">

                    <Link to="/login" className='btn-login'>
                        <Button text="Login" variant="dark"/>
                    </Link>

                    <Link to="/demo" >
                        <Button text="REQUEST A FREE DEMO" variant="primary" />
                    </Link>

                </div>
            </div>
        </div>
    )
}
