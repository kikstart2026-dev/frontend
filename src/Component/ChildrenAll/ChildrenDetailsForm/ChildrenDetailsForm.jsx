import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ChildrenDetailsForm.module.scss";
import styles2 from "../SchoolDetailsForm/SchoolDetailsForm.module.scss";

import Button from "../../Buttons/Button";
import { handleError, handleSuccess } from "../../../utils";

export default function ChildrenDetailsForm() {
  const navigate = useNavigate();

  const [allergy, setAllergy] = useState("");
  const [allergyDetails, setAllergyDetails] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null); // ✅ FIX

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    age: "",
    foodHabit: "",
    prolongDisease: "",
    passCode: "",
  });

  const locationRef = useRef(null);
  const fileRef = useRef(null);
  const dropdownRef = useRef(null);

  /* ---------------- Location ---------------- */

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      handleError("Geolocation is not supported");
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

          setFormData((prev) => ({
            ...prev,
            location:
              data.display_name || `${latitude}, ${longitude}`,
          }));
        } catch {
          setFormData((prev) => ({
            ...prev,
            location: `${latitude}, ${longitude}`,
          }));
        }
      },
      () => handleError("Unable to retrieve location")
    );
  };

  /* ---------------- Upload ---------------- */

  const handleUpload = () => {
    fileRef.current.click();
  };

  /* ---------------- Outside click ---------------- */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // load the data from localstorage
  useEffect(() => {
    const savedData = localStorage.getItem("childFormData");
    const savedImage = localStorage.getItem("childImage");

    if (savedData) {
      const data = JSON.parse(savedData);

      setFormData({
        fullName: data.fullName || "",
        email: data.email || "",
        location: data.location || "",
        age: data.age || "",
        foodHabit: data.foodHabit || "",
        prolongDisease: data.prolongDisease || "",
        passCode: data.passCode || "",
      });

      setAllergy(data.allergy);
      setAllergyDetails(data.allergyDetails || "");
    }

    if (savedImage) {
      setPreview(savedImage);
    }
  }, []);

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const childData = {
      fullName: formData.fullName,
      email: formData.email,
      location: formData.location,
      age: formData.age,
      foodHabit: formData.foodHabit,
      allergy,
      allergyDetails,
      prolongDisease: formData.prolongDisease,
      passCode: formData.passCode,
    };

    localStorage.setItem(
      "childFormData",
      JSON.stringify(childData)
    );

    if (fileRef.current.files[0]) {
      const reader = new FileReader();

      reader.onloadend = () => {
        localStorage.setItem(
          "childImage",
          reader.result
        );

        navigate("/dashboard/Schooldetails");
      };

      reader.readAsDataURL(
        fileRef.current.files[0]
      );

    } else {

      navigate("/dashboard/Schooldetails");

    }
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
            <input name="name" className={styles.inp} type="text" placeholder=" " value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                })
              }
              required
            />
            <label className={styles.lbl}>Full Name</label>
          </div>

          {/* Email */}
          <div className={styles.inputWrapper}>
            <input name="email" className={styles.inp} type="text" placeholder=" " value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              required
            />
            <label className={styles.lbl}>Email Id</label>
          </div>

          {/* Location */}
          <div className={`${styles.inputWrapper} ${styles.locationWrapper}`}>
            <input ref={locationRef} name="location" className={`${styles.inp} ${styles.spInp}`} type="text"
              placeholder=" "
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              required
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
            <input name="age" className={styles.inp} type="number" placeholder=" " value={formData.age}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  age: e.target.value,
                })
              }
              required
            />
            <label className={styles.lbl}>Age</label>
          </div>

          {/* PASSCODE (FIX ADDED) */}
          {/* PASSCODE */}
          <div className={`${styles.inputWrapper} ${styles.passWrapper}`}>
            <input name="passCode" className={styles.inp} type={showPasscode ? "text" : "password"} placeholder=" " value={formData.passCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passCode: e.target.value,
                })
              }
              required
            />

            <label className={styles.lbl}>Pass Code</label>

            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPasscode(!showPasscode)}
            >
              <i
                className={`fa-solid ${showPasscode ? "fa-eye-slash" : "fa-eye"
                  }`}
              ></i>
            </button>
          </div>

          {/* Food Habit */}
          <div className={styles.inputWrapper}>
            <input name="foodHabit" className={styles.inp} type="text" placeholder=" " value={formData.foodHabit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  foodHabit: e.target.value,
                })
              }
            />
            <label className={styles.lbl}>Food Habit</label>
          </div>

          {/* Allergy */}
          <div className={styles.inputWrapper} ref={dropdownRef}>
            <div className={`dropdown ${styles.customDropdown}`}>
              <button
                className={`${styles.dropdownBtn} ${allergy ? styles.active : ""}`}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
              >
                {allergy === true ? "Yes" : allergy === false ? "No" : ""}
              </button>

              <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setAllergy(true);
                      setAllergyDetails("");
                      setIsOpen(false);
                    }}
                  >
                    Yes
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setAllergy(false);
                      setIsOpen(false);
                    }}
                  >
                    No
                  </button>
                </li>
              </ul>
            </div>

            <label className={`${styles.lbl} ${allergy !== "" ? styles.lblActive : ""}`}>
              Have Any Type Of Allergy?
            </label>
          </div>

          {/* Allergy Details */}
          {/* Allergy Details */}
          {/* Allergy Details */}
          <div className={styles.inputWrapper}>
            <input
              name="allergyDetails"
              className={styles.inp}
              type="text"
              placeholder=" "
              value={
                allergy === false
                  ? "N/A"
                  : allergyDetails
              }
              disabled={allergy === false}
              onChange={(e) =>
                setAllergyDetails(e.target.value)
              }
            />

            <label className={styles.lbl}>
              Allergy Details
            </label>
          </div>

          {/* Disease */}
          <div className={styles.inputWrapper}>
            <input name="disease" className={styles.inp} type="text" placeholder=" " value={formData.prolongDisease}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  prolongDisease: e.target.value,
                })
              }
            />
            <label className={styles.lbl}>Any Prolong Disease</label>
          </div>

          {/* Upload */}
          <div className={styles.uploadWrapper}>
            <span className={styles.uploadText}>
              Upload image Within size of 5MB
            </span>

            {/* UPLOAD BUTTON (unchanged UI) */}
            {!file && (
              <button
                type="button"
                className={styles.uploadBtn}
                onClick={handleUpload}
              >
                UPLOAD
              </button>
            )}

            <input
              type="file"
              name="image"
              ref={fileRef}
              hidden
              onChange={(e) => {
                const selected = e.target.files[0];

                console.log("SELECTED FILE =>", selected);

                if (selected) {
                  setFile(selected);
                  setPreview(URL.createObjectURL(selected));
                }
              }}
            />

            {/* Preview */}
            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "80px",
                  height: "80px",
                  marginTop: "10px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            )}
          </div>

          {/* Button */}
          <div className={styles2.btns}>
            <Button
              className={styles.nextBtn}
              type="submit"
              text={loading ? "LOADING..." : "NEXT"}
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}