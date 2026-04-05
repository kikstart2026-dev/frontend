import React, { useState } from "react";
import styles from "./OthersProgram.module.scss";
import { getAllService } from "../../apis/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function OthersProgram() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services-all"],
    queryFn: async () => {
      const res = await getAllService(1, 1000); // 🔥 all data
      return res.data;
    },
  });

  // 🔥 Pagination logic (4 items per slide)
  const itemsPerPage = 4;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < services.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleImages = services.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  return (
    <section className={styles.othersProgram}>
      <div className="container">
        <h3 className={styles.programTitle}>Program Images</h3>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.wrapper}>
            {/* ⬅️ LEFT ARROW */}
            <button
              className={styles.arrow}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {/* 🔥 IMAGES */}
            <div className={styles.programImages}>
              {visibleImages.map((item, index) => (
                <Link
                  key={index}
                  to="/ProgramDeatailsPage"
                  onClick={() => {
                    setTimeout(() => window.scrollTo(0, 0), 100);
                  }}
                  state={{
                    image: item.image,
                    title: item.title,
                    description: item.details,
                    details2: item.details2,
                    video: item.video,
                  }}
                  style={{ display: "block" }} // 🔥 ADD THIS
                >
                  <div className={styles.imageCard}>
                    <img src={item.image} alt="program" />
                  </div>
                </Link>
              ))}
            </div>

            {/* ➡️ RIGHT ARROW */}
            <button
              className={styles.arrow}
              onClick={handleNext}
              disabled={currentIndex + itemsPerPage >= services.length}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default OthersProgram;
