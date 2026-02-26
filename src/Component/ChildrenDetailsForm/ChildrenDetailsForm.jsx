import React, { useState, useRef } from "react";
import styles from "./ChildrenDetailsForm.module.scss";
import Button from "../Buttons/Button";

export default function ChildrenDetailsForm() {

  const [allergy, setAllergy] = useState("");
  const locationRef = useRef(null);
  const fileRef = useRef(null);

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

  const handleUpload = () => {
    fileRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      location: formData.get("location"),
      age: formData.get("age"),
      foodHabit: formData.get("foodHabit"),
      allergy,
      allergyDetails: formData.get("allergyDetails"),
      disease: formData.get("disease"),
      image: formData.get("image"),
    };

    console.log(data);
  };

  return (
    <div className={styles.childrenForm}>
      <div className={styles.formBox}>

        <div className={styles.head}>
          <h2>Children Details</h2>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>

          {/* Name */}
          <div className={styles.inputWrapper}>
            <input name="name" className={styles.inp} type="text" placeholder=" " required />
            <label className={styles.lbl}>Full Name</label>
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
            <label className={styles.lbl}>Location</label>

            <button
              type="button"
              className={styles.locationBtn}
              onClick={handleGetLocation}
            >
              <i className="fa-solid fa-location-crosshairs"></i>
            </button>
          </div>

          {/* Age */}
          <div className={styles.inputWrapper}>
            <input name="age" className={styles.inp} type="text" placeholder=" " />
            <label className={styles.lbl}>Age</label>
          </div>

          {/* Food Habit */}
          <div className={styles.inputWrapper}>
            <input name="foodHabit" className={styles.inp} type="text" placeholder=" " />
            <label className={styles.lbl}>Food Habit</label>
          </div>

          {/* Allergy Dropdown */}
          <div className={styles.inputWrapper}>

            <div className={`dropdown ${styles.customDropdown}`}>

              <button
                className={`${styles.dropdownBtn} ${allergy ? styles.active : ""}`}
                type="button"
                data-bs-toggle="dropdown"
              >
                {allergy || ""}
              </button>

              <ul className="dropdown-menu">

                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => setAllergy("Yes")}
                  >
                    Yes
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => setAllergy("No")}
                  >
                    No
                  </button>
                </li>

              </ul>

            </div>

            <label className={`${styles.lbl} ${allergy ? styles.lblActive : ""}`}>
              Have Any Type Of Allergy?
            </label>

          </div>

          {/* Allergy Details */}
          <div className={styles.inputWrapper}>
            <input name="allergyDetails" className={styles.inp} type="text" placeholder=" " />
            <label className={styles.lbl}>Allergy Details</label>
          </div>

          {/* Disease */}
          <div className={styles.inputWrapper}>
            <input name="disease" className={styles.inp} type="text" placeholder=" " />
            <label className={styles.lbl}>Any Prolong Disease</label>
          </div>

          {/* Upload */}
          <div className={styles.uploadWrapper}>

            <span className={styles.uploadText}>
              Upload image Within size of 5MB
            </span>

            <button
              type="button"
              className={styles.uploadBtn}
              onClick={handleUpload}
            >
              UPLOAD
            </button>

            <input
              type="file"
              name="image"
              ref={fileRef}
              hidden
            />

          </div>

          <Button
            className={styles.nextBtn}
            type="submit"
            text="NEXT"
            variant="primary"
          />

        </form>

      </div>
    </div>
  );
}