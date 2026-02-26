import React, { useState, useRef } from "react";
import styles2 from "./SchoolDetailsForm.module.scss";
import styles from "../ChildrenDetailsForm/ChildrenDetailsForm.module.scss";
import Button from "../Buttons/Button";

export default function SchoolDetailsForm() {

    const locationRef = useRef(null);

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();

                    locationRef.current.value =
                        data.display_name || `${latitude}, ${longitude}`;
                } catch {
                    locationRef.current.value = `${latitude}, ${longitude}`;
                }
            },
            () => alert("Unable to retrieve location")
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            name: formData.get("name"),
            location: formData.get("location"),
        };

        console.log(data);
    };

    return (
        <div className={styles.childrenForm}>
            <div className={styles.formBox}>

                <div className={styles.head}>
                    <h2>School Details</h2>
                    <p>Lorem ipsum dolor sit amet consectetur</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className={styles.inputWrapper}>
                        <input name="name" className={styles.inp} type="text" placeholder=" " required />
                        <label className={styles.lbl}>School Name</label>
                    </div>

                    {/* Location */}
                    <div className={`${styles.inputWrapper} ${styles.locationWrapper}`}>
                        <input
                            ref={locationRef}
                            name="location"
                            className={`${styles.inp} ${styles.spInp}`}
                            type="text"
                            placeholder=" "
                        />
                        <label className={styles.lbl}>School Location</label>

                        <button
                            type="button"
                            className={styles.locationBtn}
                            onClick={handleGetLocation}
                        >
                            <i className="fa-solid fa-location-crosshairs"></i>
                        </button>
                    </div>
                    <div className={`${styles2.btns}`}>
                        <Button
                            className={`${styles.nextBtn} ${styles2.blackbtn}`}
                            type="submit"
                            text="BACK"
                            variant="dark"
                        />
                        <Button
                            className={styles.nextBtn}
                            type="submit"
                            text="NEXT"
                            variant="primary"
                        />
                    </div>
                </form>

            </div>
        </div>
    );
}