import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MiniCard from "../../Component/WhyChooseUs/MiniCard";
import styles from "./WhyUss.module.scss";
import { getAllWhyChooseUs } from "../../apis/api";

export default function WhyUs() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["whyChooseUs", page],
    queryFn: () =>
      getAllWhyChooseUs({
        page,
        limit: 8,
      }),
  });

  const cards = data?.data?.cards || [];
  const totalPages = data?.totalPages || 1;

  const heading = data?.data?.heading || null;
  const description =
    heading?.description || "Description not available";

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load data</p>;

  return (
    <section className="common-space1">
      <div className="container">

        {/* DESCRIPTION FROM API */}
        <div className={styles["WhyUs-para"]}>
          <p>{description}</p>
        </div>

        {/* CARDS */}
        <div className={`row g-4 ${styles["cards-section"]}`}>
          {cards.map((item) => (
            <div
              key={item._id}
              className="col-lg-3 col-md-6 col-12"
            >
              <MiniCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                color={item.color}
              />
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <nav className="mt-4">
          <ul className={`pagination justify-content-center ${styles.customPagination}`}>

            {/* LEFT ARROW */}
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link arrow"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                &lt;
              </button>
            </li>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <li
                key={num}
                className={`page-item ${page === num ? "active" : ""}`}
              >
                <button
                  className={`page-link ${page === num ? "num" : ""}`}
                  onClick={() => setPage(num)}
                >
                  {num}
                </button>
              </li>
            ))}

            {/* RIGHT ARROW */}
            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link arrow"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
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