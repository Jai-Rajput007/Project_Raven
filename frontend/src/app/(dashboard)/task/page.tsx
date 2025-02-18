// src/app/task/page.tsx
import MainLayout from "@/components/layout/MainLayout";
import styles from "@/components/styles/task.module.css";

export default function TaskPage() {
  const tasks = [
    { title: "UI Design", progress: 75, status: "In Progress" },
    { title: "API Integration", progress: 50, status: "In Progress" },
    { title: "Bug Fixing", progress: 100, status: "Completed" },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1>Task Overview</h1>
        <div className={styles.tasksList}>
          {tasks.map((task, index) => (
            <div key={index} className={styles.taskCard}>
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
