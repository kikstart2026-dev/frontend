import React, { useState } from "react";
import sms from "../../assets/images/sms.png";
import styles from "./ContactSection.module.scss"; // module import
import Button from "../Buttons/Button";
import CmnHeading from "../CmnHeading/CmnHeading";
import { Link } from "react-router-dom";
import ContactForm from "../ContactForm/ContactForm";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <section className={styles.contactSection}>
            <div className="container">
                <div className="row">

                    {/* LEFT SIDE */}
                    <div className={`col-lg-6 col-12 ${styles.contactLeft}`}>
                        <CmnHeading
                            subtitle="Get In Touch"
                            details="Lorem ipsum dolor sit amet consectetur. Vitae elit quam volutpat id. Quisque orci lacinia sit non. Diam et adipiscing proin orci. Eget lorem sit etiam molestie rhoncus non."
                            align="left"
                        />

                        <div className={styles.contactEmailBox}>
                            <div className={styles.icon}>
                                <img src={sms} alt="sms" />
                            </div>
                            <Link to="/email" className={styles.emailLink}>
                                info@KikStartKids.com
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className={`col-lg-6 col-12 ${styles.contactRight}`}>
                        <ContactForm/>
                    </div>

                </div>
            </div>
        </section>
    );
}