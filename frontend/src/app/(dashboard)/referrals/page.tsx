"use client"; // This enables client-side rendering

import React, { useState } from "react";
import styles from "@/components/styles/referrals.module.css";

const referralLink = "https://example.com/referral?code=ABC123";

const ReferralsPage = () => {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
  };

  return (
    <div className={styles.mainContent}>
      <h1 className={styles.heading}>Referral Program</h1>
      <p className={styles.subHeading}>
        Share your referral link and earn rewards!
      </p>

      <div className={styles.referralContainer}>
        <input
          type="text"
          value={referralLink}
          readOnly
          className={styles.referralInput}
        />
        <button className={styles.copyButton} onClick={copyToClipboard}>
          Copy Link
        </button>
      </div>

      {copySuccess && <span className={styles.copyMessage}>{copySuccess}</span>}

      <div className={styles.statsContainer}>
        <h2 className={styles.statsHeading}>Your Referral Stats</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Referrals</h3>
            <p>25</p>
          </div>
          <div className={styles.statCard}>
            <h3>Rewards Earned</h3>
            <p>$150</p>
          </div>
          <div className={styles.statCard}>
            <h3>Pending Rewards</h3>
            <p>$50</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;
