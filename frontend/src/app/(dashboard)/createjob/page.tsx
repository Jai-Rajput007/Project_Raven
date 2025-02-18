"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/createjob.module.css";

interface FormData {
  projectName: string;
  description: string;
  skills: string;
  salary: string;
  experience: string;
  deadline: string;
}

const CreateJob = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    description: "",
    skills: "",
    salary: "",
    experience: "",
    deadline: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Retrieve existing jobs from localStorage
    const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");

    // Add new job to the list
    const updatedJobs = [...existingJobs, { id: Date.now(), ...formData }];

    // Save updated jobs list to localStorage
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    // Redirect to the jobs page
    router.push("/jobs");
  };

  return (
    <div className={styles.createJobContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>🚀 Create a New Job Opportunity</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Project Name</label>
            <input
              type="text"
              name="projectName"
              className={styles.input}
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter project name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              className={styles.textarea}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Skills Required</label>
            <input
              type="text"
              name="skills"
              className={styles.input}
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., React, Node.js, MongoDB"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Salary Range</label>
            <input
              type="text"
              name="salary"
              className={styles.input}
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., $3000 - $5000"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Experience Level</label>
            <input
              type="text"
              name="experience"
              className={styles.input}
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 2+ years"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Application Deadline</label>
            <input
              type="date"
              name="deadline"
              className={styles.input}
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            ✅ Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
