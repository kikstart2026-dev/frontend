import React, { useState } from "react";
import logo from "../../../assets/images/authLogo.png"
import "../../../Main.scss"
import "./AuthForm.scss";
import Button from '../../Buttons/Button'

export default function AuthForm({ fields, buttonText, title, subtitle}) {

  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
        <div className="head">
            <figure>
                <img src={logo} alt="###logo" />
            </figure>
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>

        {fields.map((field, index) => (
            <div className="form-group" key={index}>

            {field.type !== "checkbox" ? (
                <div className="input-wrapper">

                <input
                    type={field.type}
                    name={field.name}
                    placeholder=" "
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                />

                <label
                    className={
                    formData[field.name] ? "floating active" : "floating"
                    }
                >
                    {field.label}
                </label>

                </div>
            ) : (
                <div className="checkbox-group">
                <input
                    type="checkbox"
                    name={field.name}
                    checked={formData[field.name]}
                    onChange={handleChange}
                />
                <label>{field.label}</label>
                </div>
            )}

            </div>
        ))}

        <Button type="submit" className="submit-btn" text={buttonText} variant="primary" >
            {buttonText}
        </Button>

        </form>
    </>
  );
}