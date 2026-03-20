import React, { useRef } from "react";
import "../../Main.scss";
import styles from "./ContactForm.module.scss";
import Button from "../Buttons/Button";
import { useMutation } from "@tanstack/react-query";
import { contactUs } from "../../apis/api";
import { handleError, handleSuccess } from "../../utils";

export default function ContactForm() {
  const formRef = useRef(null);

  const { mutate, isPending } = useMutation({
    mutationKey: ["contact-us"],
    mutationFn: contactUs,

    onSuccess: () => {
      formRef.current?.reset();   // ✅ reset form
      handleSuccess("Message sent successfully ✅");
    },

    onError: (error) => {
      console.error("FULL ERROR:", error?.response);
      handleError(
        error?.response?.data?.message || "Something went wrong ❌"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      details: formData.get("details"),
    };

    mutate(payload);
  };

  return (
    <div className={styles.contact}>
      <div className={styles.contactWrap}>
        <div className={styles.right}>
          <div className={styles.formBox}>
            <form
              ref={formRef}
              className={styles.authForm}
              onSubmit={handleSubmit}
            >
              <div className={styles.inputWrapper}>
                <input
                  className={styles.inp}
                  type="text"
                  name="name"
                  placeholder=" "
                  required
                />
                <label className={styles.lbl}>Full Name</label>
              </div>

              <div className={styles.inputWrapper}>
                <input
                  className={styles.inp}
                  type="email"
                  name="email"
                  placeholder=" "
                  required
                />
                <label className={styles.lbl}>Email</label>
              </div>

              <div className={styles.inputWrapper}>
                <input
                  className={styles.inp}
                  type="text"
                  name="subject"
                  placeholder=" "
                  required
                />
                <label className={styles.lbl}>Query Subject</label>
              </div>

              <div className={styles.inputWrapper}>
                <textarea
                  className={`${styles.inp} ${styles.textarea}`}
                  name="details"
                  placeholder=" "
                  required
                />
                <label className={styles.lbl}>Query Details</label>
              </div>

              <Button
                className={styles.submitBtn}
                type="submit"
                text={isPending ? "SENDING..." : "SEND"}  // ✅ text prop use
                disabled={isPending}
                variant="primary"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}