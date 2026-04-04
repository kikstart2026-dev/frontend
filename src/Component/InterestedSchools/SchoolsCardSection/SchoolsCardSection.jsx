import React, { useEffect, useState } from "react";
import styles from "./SchoolsCardSection.module.scss";
import SchoolsCard from "../SchoolsCard";
import { getAllSchools } from "../../../apis/api";

export default function SchoolsCardSection() {
  const [schools, setSchools] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSchools = async (pageNum) => {
    try {
      console.log("Fetching page:", pageNum); // 👈 Check if this changes in console
      const data = await getAllSchools(pageNum);

      // Reset schools to empty first to ensure the UI updates
      setSchools(data.data || []); 
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  // This runs every time the 'page' state changes
  useEffect(() => {
    fetchSchools(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <section className={styles.schoolsCardSection}>
      <div className="container">
        <div className="row g-4">
          {schools.length > 0 ? (
            schools.map((card) => (
              <div key={card._id} className="col-lg-4 col-md-6 col-sm-12">
                <SchoolsCard
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  coach={card.coach}
                  author={card.author}
                  authorImg={card.authorImg}
                />
              </div>
            ))
          ) : (
            <p className="text-center">No schools found for this page.</p>
          )}
        </div>

        {totalPages > 1 && (
          <nav className="mt-5">
            <ul className={`pagination justify-content-center ${styles.customPagination}`}>
              {/* Prev */}
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  &lt;
                </button>
              </li>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => (
                <li key={i + 1} className="page-item">
                  <button
                    className={`page-link ${page === i + 1 ? styles.active : ""}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              {/* Next */}
              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  &gt;
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}