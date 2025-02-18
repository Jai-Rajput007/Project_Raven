"use client";

import { useState } from "react";
import styles from "@/components/styles/task-history.module.css"; // Ensure correct path and name

const TaskHistory = () => {
  const [tasks] = useState([
    { id: 1, title: "Build Authentication System", status: "ongoing", progress: 70 },
    { id: 2, title: "Integrate Payment Gateway", status: "completed", progress: 100 },
    { id: 3, title: "Optimize API Performance", status: "ongoing", progress: 40 },
    { id: 4, title: "Develop AI-based Code Review", status: "completed", progress: 100 },
  ]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Task History</h1>

      {/* Ongoing Tasks Section */}
      <div className={styles.section}>
        <h2>🚀 Ongoing Tasks</h2>
        <ul className={styles.taskList}>
          {tasks
            .filter((task) => task.status === "ongoing")
            .map((task) => (
              <li key={task.id} className={styles.taskItem}>
                <span>{task.title}</span>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: `${task.progress}%` }}>
                    {task.progress}%
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Completed Tasks Section */}
      <div className={styles.section}>
        <h2>✅ Completed Tasks</h2>
        <ul className={styles.taskList}>
          {tasks
            .filter((task) => task.status === "completed")
            .map((task) => (
              <li key={task.id} className={`${styles.taskItem} ${styles.completed}`}>
                <span>{task.title}</span> <span className={styles.checkmark}>✔</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskHistory;
