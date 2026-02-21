import React, { useState } from "react";
import sms from "../../assets/images/sms.png";
import styles from "./ContactSection.module.scss"; // module import
import Button from "../Buttons/Button";
import CmnHeading from "../CmnHeading/CmnHeading";
import { Link } from "react-router-dom";

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
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {/* Full Name */}
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                                <span className={styles.fieldName}>Full Name</span>
                                {!formData.fullName && (
                                    <span className={styles.fieldExample}>Jane Cooper</span>
                                )}
                            </div>

                            {/* Email */}
                            <div className={styles.formGroup}>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <span className={styles.fieldName}>Email</span>
                                {!formData.email && (
                                    <span className={styles.fieldExample}>janecooper@example.com</span>
                                )}
                            </div>

                            {/* Subject */}
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                                <span className={styles.fieldName}>Query Subject</span>
                                {!formData.subject && (
                                    <span className={styles.fieldExample}>Enter query subject</span>
                                )}
                            </div>

                            {/* Message */}
                            <div className={`${styles.formGroup} ${styles.textareaGroup}`}>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                                <span className={styles.fieldName}>Query Details</span>
                                {!formData.message && (
                                    <span className={styles.fieldExample}>Type here...</span>
                                )}
                            </div>

                            <div className={styles.btnWrap}>
                                <Button text="SEND" variant="primary" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}