"use client";

import { useState } from "react";
import styles from "@/components/styles/payments.module.css";

const Payments = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    amount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment submitted:", paymentData);
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>💳 Make a Payment</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              className={styles.input}
              value={paymentData.cardNumber}
              onChange={handleChange}
              placeholder="Enter card number"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Card Holder's Name</label>
            <input
              type="text"
              name="cardHolder"
              className={styles.input}
              value={paymentData.cardHolder}
              onChange={handleChange}
              placeholder="Enter card holder's name"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              className={styles.input}
              value={paymentData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>CVV</label>
            <input
              type="password"
              name="cvv"
              className={styles.input}
              value={paymentData.cvv}
              onChange={handleChange}
              placeholder="3-digit CVV"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Amount</label>
            <input
              type="text"
              name="amount"
              className={styles.input}
              value={paymentData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payments;
