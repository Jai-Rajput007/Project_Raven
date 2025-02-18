"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/styles/jobs.module.css";
import { Briefcase, Calendar, DollarSign, Code } from "lucide-react";

interface Job {
  id: number;
  projectName: string;
  description: string;
  skills: string;
  salary: string;
  experience: string;
  deadline: string;
}

const JobPage = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Load jobs from localStorage when the page loads
    const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJobs(storedJobs);
  }, []);

  // Navigate to the create job page
  const handleCreateJob = () => {
    router.push("/createjob");
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>🚀 Explore Exciting Job Opportunities</h1>

      <div className={styles.jobList}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.header}>
                <Briefcase size={20} color="#007bff" />
                <h2 className={styles.jobTitle}>{job.projectName}</h2>
              </div>
              <p className={styles.description}>{job.description}</p>
              <div className={styles.details}>
                <p className={styles.detailText}>
                  <Code size={18} color="#333" /> <strong>Skills:</strong>{" "}
                  {job.skills}
                </p>
                <p className={styles.detailText}>
                  <DollarSign size={18} color="green" /> <strong>Salary:</strong>{" "}
                  {job.salary}
                </p>
                <p className={styles.detailText}>
                  <strong>Experience:</strong> {job.experience}
                </p>
                <p className={styles.detailText}>
                  <Calendar size={18} color="red" /> <strong>Deadline:</strong>{" "}
                  {job.deadline}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noJobs}>No jobs available.</p>
        )}
      </div>

      <button className={styles.createJobButton} onClick={handleCreateJob}>
        + Post a New Job
      </button>
    </div>
  );
};

export default JobPage;
