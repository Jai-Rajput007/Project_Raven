import React from "react";
import styles from "@/components/styles/mentors.module.css";

const mentorsData = [
  {
    id: 1,
    name: "John Doe",
    specialization: "Full Stack Developer",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    specialization: "Machine Learning Engineer",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Michael Johnson",
    specialization: "Cybersecurity Expert",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Emily Davis",
    specialization: "Blockchain Developer",
    image: "https://via.placeholder.com/150",
  },
];

const MentorsPage = () => {
  return (
    <div className={styles.mainContent}>
      <h1 className={styles.heading}>Mentors</h1>
      <div className={styles.mentorGrid}>
        {mentorsData.map((mentor) => (
          <div className={styles.mentorCard} key={mentor.id}>
            <img
              src={mentor.image}
              alt={mentor.name}
              className={styles.mentorImage}
            />
            <h2 className={styles.mentorName}>{mentor.name}</h2>
            <p className={styles.mentorSpecialization}>
              {mentor.specialization}
            </p>
            <button className={styles.contactButton}>Contact</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorsPage;
