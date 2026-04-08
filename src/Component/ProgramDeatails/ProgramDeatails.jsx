import React, { useEffect, useState } from "react";
import styles from "./ProgramDeatails.module.scss";
import { useLocation } from "react-router-dom";
import { getServiceById } from "../../apis/api";
import { useQuery } from "@tanstack/react-query";

export default function ProgramDeatails() {

  const { state } = useLocation();
  const id = state?.id; // ✅ ID from state

  const [play, setPlay] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ React Query API Call
  const { data, isLoading, error } = useQuery({
    queryKey: ["service-by-id", id],
    queryFn: () => getServiceById(id),
    enabled: !!id, // ✅ id thakle call hobe
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error loading data</p>;

  // ⚠️ backend structure onujai adjust korte paro
  const serviceData = data?.data; 
  // jodi lage: data?.data?.data

  if (!serviceData) return null;

  const {
    title,
    details,
    details2,
    image,
    video
  } = serviceData;

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/") + "?autoplay=1";
    }
    return url;
  };

  return (
    <section className={styles.programDetails}>
      <div className="container">

        <h1 className="fw-bold mb-4">{title}</h1>

        <div className={`${styles.videoWrapper} position-relative mb-4`}>

          {!play ? (
            <>
              <img
                src={image}
                alt="thumbnail"
                className="img-fluid w-100 rounded-4"
              />

              <div
                className={styles.playBtn}
                onClick={() => setPlay(true)}
              >
                <i className="bi bi-play-fill"></i>
              </div>
            </>
          ) : (
            <div className="ratio ratio-16x9 rounded-4 overflow-hidden">
              <iframe
                src={getEmbedUrl(video)}
                title="video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        <p
          className="text-muted"
          dangerouslySetInnerHTML={{ __html: details }}
        ></p>

        <h3 className="fw-bold">Program Details</h3>

        <p
          className="text-muted"
          dangerouslySetInnerHTML={{ __html: details2 }}
        ></p>

      </div>
    </section>
  );
}