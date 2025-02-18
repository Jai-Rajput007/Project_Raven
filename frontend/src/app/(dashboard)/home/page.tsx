"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Home/Navbar";
import Dashboard from "@/components/mycomponent/Dashboard/page";
import styles from "@/components/styles/home.module.css";
import dashboardStyles from "@/components/styles/Dashboard.module.css";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <div className={styles.content}>
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
