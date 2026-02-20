import React, { useState } from "react";
import "../../../Main.scss";
import styles from "./ForgetPass.module.scss";
import AuthLeft from "../../../Component/Authentication/AuthLeft/AuthLeft";
import logo from "../../../assets/images/authLogo.png";
import Button from "../../../Component/Buttons/Button";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { email };
    console.log(formData);

    navigate("/reset-pass");
  };

  return (
    <div className={styles.forgetpass}>
      <div className={styles.forgetpassWrap}>
        <div className="row ">

          {/* Left */}
          <div className="col-6">
            <AuthLeft />
          </div>

          {/* Right */}
          <div className={`col-6 ${styles.right}`}>
            <div className={styles.formBox}>

              <div className={styles.head}>
                <figure className={styles.fig}>
                  <img src={logo} alt="logo" />
                </figure>

                <h2 className={styles.head2}>Forgot password?</h2>

                <p className={styles.para}>
                  Please enter your email to reset your password
                </p>
              </div>

              <form className={styles.authForm} onSubmit={handleSubmit}>

                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inp}
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className={styles.lbl}>
                    Email
                  </label>
                </div>

                <Button className={styles.submitBtn}
                  type="submit"
                  text="CONTINUE"
                  variant="primary"
                >
                </Button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}