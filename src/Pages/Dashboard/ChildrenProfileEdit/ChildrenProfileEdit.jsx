import React, { useEffect, useState, useRef } from "react";
import styles from "./ChildrenProfileEdit.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { getChildById, updateChild } from "../../../apis/api";

const ChildrenEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const IMAGE_BASE_URL = "http://localhost:8008";

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const fileRef = useRef();

    // ================= FETCH =================
    const fetchChild = async () => {
        try {
            const res = await getChildById(id);
            if (res.success) setData(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChild();
    }, [id]);

    // ================= HANDLE INPUT =================
    const handleChange = (field, value) => {
        setData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    // ================= IMAGE CHANGE =================
   const handleImageChange = (file) => {
    if (!file) return;

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
};

    // ================= SAVE =================
    const handleSave = async () => {
        try {
            const formData = new FormData();

            formData.append("fullName", data.fullName);
            formData.append("age", data.age);
            formData.append("location", data.location);
            formData.append("foodHabit", data.foodHabit);
            formData.append("allergy", data.allergy);
            formData.append("allergyDetails", data.allergyDetails);
            formData.append("prolongDisease", data.prolongDisease);

            if (imageFile) {
                formData.append("profileImage", imageFile);
            }

            const res = await updateChild(id, formData);

            if (res.success) {
                alert("Updated Successfully");

                setData(res.data); // immediate UI update

                setTimeout(() => {
                    navigate(`/dashboard/children-profile/${id}`);
                }, 300);
            }

        } catch (err) {
            console.log(err);
        }
    };

    if (loading || !data) return <h2>Loading...</h2>;

    return (
        <div className={styles.childrenProfileEdit}>

            <div className={styles.content}>

                {/* ================= LEFT SIDE ================= */}
                <div className={styles.leftSection}>

                    <h2>Edit Children Profile</h2>

                    <div className={styles.card}>
                        <label>Full Name</label>
                        <input
                            value={data.fullName || ""}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                        />
                    </div>

                    <div className={styles.card}>
                        <label>Age</label>
                        <input
                            type="number"
                            value={data.age ?? ""}
                            onChange={(e) => handleChange("age", e.target.value)}
                        />
                    </div>

                    <div className={styles.card}>
                        <label>Location</label>
                        <input
                            value={data.location || ""}
                            onChange={(e) => handleChange("location", e.target.value)}
                        />
                    </div>

                    <div className={styles.card}>
                        <label>Food Habit</label>
                        <input
                            value={data.foodHabit || ""}
                            onChange={(e) => handleChange("foodHabit", e.target.value)}
                        />
                    </div>

                    <div className={styles.card}>
                        <label>Allergy</label>
                        <input
                            value={
                                data.allergy === true
                                    ? "Yes"
                                    : data.allergy === false
                                        ? "No"
                                        : ""
                            }
                            onChange={(e) =>
                                handleChange(
                                    "allergy",
                                    e.target.value.toLowerCase() === "yes"
                                )
                            }
                        />
                    </div>

                    <div className={styles.card}>
                        <label>Allergy Details</label>
                        <input
                            value={
                                data.allergy
                                    ? data.allergyDetails || ""
                                    : "N/A"
                            }
                            disabled={!data.allergy}
                            onChange={(e) =>
                                handleChange("allergyDetails", e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.card}>
                        <label>Prolong Disease</label>
                        <input
                            value={data.prolongDisease || ""}
                            onChange={(e) => handleChange("prolongDisease", e.target.value)}
                        />
                    </div>

                    <button className={styles.saveBtn} onClick={handleSave}>
                        SAVE CHANGES
                    </button>

                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className={styles.rightSection}>

                    <div className={styles.profileCard}>

                       <img
    src={
        previewImage
            ? previewImage
            : data.profileImage
                ? `${IMAGE_BASE_URL}${data.profileImage}`
                : "https://placehold.co/300x300"
    }
    alt="child"
/>

                        <h3>{data.fullName}</h3>
                        <span>{data.age} years old</span>

                        <button onClick={() => fileRef.current.click()}>
                            Change Image
                        </button>

                        <input
                            type="file"
                            ref={fileRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={(e) => handleImageChange(e.target.files[0])}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ChildrenEdit;