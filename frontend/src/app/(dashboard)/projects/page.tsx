// src/app/projects/page.tsx
import MainLayout from "@/components/layout/MainLayout";
import styles from "@/components/styles/projects.module.css";

export default function ProjectsPage() {
  const projects = [
    {
      title: "E-commerce Website",
      description: "Developing a fully-functional online store.",
      image: "/ecommerce.jpg",
    },
    {
      title: "Social Media App",
      description: "A mobile app for social networking.",
      image: "/social.jpg",
    },
    {
      title: "AI Chatbot",
      description: "AI-powered chatbot for customer support.",
      image: "/chatbot.jpg",
    },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1>Projects Overview</h1>
        <div className={styles.projectsList}>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.projectImage}
              />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
