import React, { useEffect, useState } from "react";

import styles from "./DashboardHeader.module.scss";

export default function DashboardHeader({
  title = "Dashboard",
}) {
  const [user, setuser] = useState(null);

  useEffect(() => {
    const storeduser =
      localStorage.getItem("user");

    if (storeduser) {
      setuser(JSON.parse(storeduser));
    }
  }, []);



  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storeduser = localStorage.getItem("user");

    if (storeduser) {
      setuser(JSON.parse(storeduser));
    }
  }, []);

  // ================= SCROLL LOCK ADD HERE =================
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

   
  }, [open]);

  return (
    <div className={styles.topbar}>
      <h2>{title}</h2>

      <div
        className="d-flex align-items-center ms-3"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(true)}
      >

        <div className={styles.userBox}>
          {user?.image ? (
            <img
              src={user.image}
              alt="user"
              className={styles.avatar}
            />
          ) : (
            <div className={styles.fallbackAvatar}>
              {user?.fullname?.charAt(0) || "U"}
            </div>
          )}

          <span>
            Welcome,{" "}
            {user?.fullname || "User"}
          </span>
        </div>
      </div>


      {open && (
        <div className={styles.modalOverlay} onClick={() => setOpen(false)}>
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.modalTitle}>User Details</h3>

            {user?.image ? (
              <img
                src={user.image}
                alt="user"
                className={styles.modalImage}
              />
            ) : (
              <div className={styles.modalFallback}>
                {user?.fullname?.charAt(0) || "A"}
              </div>
            )}

            <div className={styles.modalInfo}>
              <p><b>Name:</b> {user?.fullname}</p>
              <p><b>Email:</b> {user?.email}</p>
              <p><b>Phone:</b> {user?.phone || "N/A"}</p>
              <p><b>Location:</b> {user?.location || "N/A"}</p>
              <p><b>Passcode:</b> {user?.passcode || "N/A"}</p>
            </div>

            <button
              className={styles.modalCloseBtn}
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}