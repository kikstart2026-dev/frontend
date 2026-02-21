import React, { useState } from "react";
import styles from "./ProgramDeatails.module.scss";
import baccha from "../../assets/images/baccha.png";

export default function ProgramDeatails() {
  const [play, setPlay] = useState(false);

  return (
    <section className={styles.programDetails}>
      <div className="container">

        <h1 className="fw-bold mb-4">Program Name 1</h1>

        <div className={`${styles.videoWrapper} position-relative mb-4`}>

          {!play ? (
            <>
              <img
                src={baccha}
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
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="video"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        <p className="text-muted">
          Lorem ipsum dolor sit amet consectetur. Maecenas lectus odio ut ut neque egestas luctus. Facilisis id pellentesque ultrices massa pellentesque ut. Sed sit suspendisse quam diam tellus sodales consequat amet ac. Sed eget varius luctus risus mauris ut ultricies.
        </p>

        <h3 className="fw-bold">Program Details</h3>

        <p className="text-muted">
          Quam in non velit malesuada arcu eget id. Id ut turpis tempor semper et in nunc aliquet. Orci cras faucibus aliquam eget orci egestas. Ut congue ut amet commodo eget. Nam eu duis imperdiet morbi orci ac tellus aenean. A pharetra at sodales praesent commodo nibh. At ac lacus morbi consectetur nisi. Vel pharetra viverra hendrerit odio eu amet elementum quam dui. Tincidunt sit ac ac interdum.
        </p>

        <p className="text-muted">
          Velit auctor eros egestas nunc suspendisse amet fermentum lectus. Sed tellus nulla elit proin. Sit nibh urna elit amet netus nam convallis. Diam id auctor fermentum aliquam aliquet elit in suspendisse pellentesque. Quam fusce nec enim turpis nisl. Ac nec dictumst aliquet vivamus vel orci. Iaculis aenean accumsan tortor in et id ullamcorper aenean enim. At gravida nibh ornare commodo luctus gravida pretium fermentum volutpat. Eget integer sed nunc sit.
          Lorem faucibus egestas tortor id nibh hendrerit massa tortor mi. Scelerisque nunc quis risus nunc in. Vitae at purus sit nec suspendisse donec enim senectus scelerisque. In sed risus nisl posuere molestie. Vel massa augue in fermentum.
        </p>

      </div>
    </section>
  );
}