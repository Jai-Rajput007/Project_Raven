import React from "react";
import styles from "@/components/styles/resources.module.css";

const ResourcesPage = () => {
  return (
    <div className={styles.mainContent}>
      <h1 className={styles.heading}>Resources</h1>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h2>📄 Documentation</h2>
          <p>Access API docs, setup guides, and more.</p>
          <ul>
            <li><a href="#">API Documentation</a></li>
            <li><a href="#">Setup Guide</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>🎵 Tutorials</h2>
          <p>Learn through interactive tutorials and guides.</p>
          <ul>
            <li><a href="#">React Tutorial</a></li>
            <li><a href="#">Next.js Tutorial</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>🛠 Tools</h2>
          <p>Explore useful development tools and resources.</p>
          <ul>
            <li><a href="#">CodePen</a></li>
            <li><a href="#">JSFiddle</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>❓ FAQs</h2>
          <p>Find answers to frequently asked questions.</p>
          <ul>
            <li><a href="#">Frequently Asked Questions</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
