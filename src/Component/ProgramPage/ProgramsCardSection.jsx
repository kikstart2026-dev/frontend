import React, { useState } from "react";
import ProgramCard from "../Services/ProgramCard";
import styles from "./ProgramsCardSection.module.scss";
import "../../Main.scss";

import { getAllService } from "../../apis/api";
import { useQuery } from "@tanstack/react-query";

export default function Programs() {

  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading } = useQuery({
    queryKey: ["services", page],
    queryFn: async () => {
      return await getAllService(page, limit);
    },
    keepPreviousData: true,
  });

  // ✅ IMPORTANT FIX
  const services = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <section className={styles.programSection}>
      <div className="container">

        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className={`row ${styles.cardsRow}`}>
            {services.map((item, index) => (
              <div
                key={index}
                className={`col-lg-4 col-md-6 col-12 ${styles.cardWrapper}`}
              >
                <ProgramCard
                  image={item.image}
                  title={item.title}
                  description={item.details}
                />
              </div>
            ))}
          </div>
        )}

        {/* 🔥 FULL DYNAMIC PAGINATION */}
        <nav className="mt-4">
          <ul className={`pagination justify-content-center ${styles.customPagination}`}>

            {/* PREV */}
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setPage(page - 1)}
              >
                &lt;
              </button>
            </li>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${page === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            {/* NEXT */}
            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setPage(page + 1)}
              >
                &gt;
              </button>
            </li>

          </ul>
        </nav>

      </div>
    </section>
  );
}