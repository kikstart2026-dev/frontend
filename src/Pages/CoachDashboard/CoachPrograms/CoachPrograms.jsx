import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getCoachProfile } from "../../../apis/api";

import styles from "./CoachPrograms.module.scss";

const CoachPrograms = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["coach-profile"],
    queryFn: getCoachProfile,
  });

  const programs = [...(data?.data?.programs || [])].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );

  if (isLoading) {
    return (
      <div className={styles.loading}>
        Loading Programs...
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>My Programs</h2>

        <p>
          These programs have been assigned to you by the administrator.
        </p>
      </div>

      {programs.length === 0 ? (
        <div className={styles.emptyCard}>
          <i className="bi bi-journal-x"></i>

          <h3>No Programs Assigned</h3>

          <p>
            The administrator hasn't assigned any programs yet.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {programs.map((program) => (
            <div
              key={program._id}
              className={styles.card}
            >
              <div className={styles.iconBox}>
                <i className="bi bi-grid-1x2-fill"></i>
              </div>

              <div className={styles.content}>
                <div className={styles.topRow}>
                  <h3>{program.title}</h3>

                  
                </div>

                <div className={styles.footer}>
                  <button
                    className={styles.detailsBtn}
                    onClick={() =>
                      navigate(`/coach-dashboard/programs/${program._id}`)
                    }
                  >
                    
                    View Details
                  </button>

                  <span className={styles.status}>
                    <i className="bi bi-check-circle-fill"></i>
                    Active Program
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoachPrograms;