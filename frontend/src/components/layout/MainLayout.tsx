// src/components/layout/MainLayout.tsx
"use client";

import { ReactNode } from "react";
import Navbar from "@/components/Home/Navbar";
import styles from "@/components/styles/MainLayout.module.css";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.layoutContainer}>
      <Navbar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default MainLayout;
