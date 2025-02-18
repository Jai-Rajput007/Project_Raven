"use client";

import { useState } from "react";
import axios from "axios";
import styles from "@/components/styles/aiTaskDelegation.module.css";

const AI_TaskDelegation = () => {
  const [taskDescription, setTaskDescription] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [error, setError] = useState("");

  const API_URL = "http://127.0.0.1:5000/api"; // Flask backend URL

  const handleDelegateTask = async () => {
    setError("");
    setSubtasks([]);

    try {
      const response = await axios.post(`${API_URL}/ai-task-delegation`, {
        description: taskDescription,
      });

      if (response.status === 200) {
        setSubtasks(response.data.subtasks || []);
      } else {
        setError("❌ Failed to delegate task.");
      }
    } catch (err) {
      console.error("API error:", err);
      setError("🚨 Error connecting to API.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>AI Task Delegation</h1>
        <textarea
          className={styles.textarea}
          rows={4}
          placeholder="Enter project description..."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
        <button onClick={handleDelegateTask} className={styles.button}>
          Delegate Task
        </button>

        {error && <p className={styles.error}>{error}</p>}

        {subtasks.length > 0 && (
          <div className={styles.subtaskContainer}>
            <h2 className={styles.subtitle}>Subtasks</h2>
            <ul className={styles.subtaskList}>
              {subtasks.map((subtask) => (
                <li key={subtask.id} className={styles.subtaskItem}>
                  {subtask.task}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AI_TaskDelegation;
