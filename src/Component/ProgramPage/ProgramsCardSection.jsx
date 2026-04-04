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