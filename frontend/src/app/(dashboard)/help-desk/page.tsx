"use client"; // Enable client-side rendering

import React, { useState } from "react";
import styles from "@/components/styles/helpdesk.module.css";

const HelpDeskPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your query has been submitted. Our team will get back to you soon.");
    setFormData({ name: "", email: "", issue: "", message: "" });
  };

  return (
    <div className={styles.mainContent}>
      <h1 className={styles.heading}>Help Desk</h1>
      <p className={styles.subHeading}>
        Need help? Submit your issue, and we'll get back to you as soon as possible.
      </p>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={styles.inputField}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.inputField}
          required
        />

        <input
          type="text"
          name="issue"
          placeholder="Issue Title"
          value={formData.issue}
          onChange={handleChange}
          className={styles.inputField}
          required
        />

        <textarea
          name="message"
          placeholder="Describe your issue"
          value={formData.message}
          onChange={handleChange}
          className={styles.textArea}
          required
        ></textarea>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default HelpDeskPage;
