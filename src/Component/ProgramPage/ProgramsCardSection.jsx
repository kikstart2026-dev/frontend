import React from "react";
import ProgramCard from "../Services/ProgramCard";
import styles from "./ProgramsCardSection.module.scss";
import "../../Main.scss";

import { getAllService } from "../../apis/api";
import { useQuery } from "@tanstack/react-query";

export default function Programs() {

  const { data: services = [], isLoading: loading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await getAllService();
      return res.data;
    },
  });

  // ✅ Only first 9 items
  const firstNineServices = services.slice(0, 9);

  return (
    <>
      <section className={styles.programSection}>
        <div className="container">

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className={`row ${styles.cardsRow}`}>
              {firstNineServices.map((item, index) => (
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

          {/* Pagination same */}
          <nav className="mt-4">
            <ul className={`pagination justify-content-center ${styles.customPagination}`}>
              <li className="page-item arrow">
                <button className="page-link arrow">&lt;</button>
              </li>

              <li className="page-item active">
                <button className="page-link num">1</button>
              </li>

              <li className="page-item">
                <button className="page-link num2">2</button>
              </li>

              <li className="page-item arrow">
                <button className="page-link arrow">&gt;</button>
              </li>
            </ul>
          </nav>

        </div>
      </section>
    </>
  );
}