"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import "@/components/styles/mylayout.module.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme and update localStorage
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="layoutContainer">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="mainContentWrapper">
        {/* Navbar Component */}
        <Navbar />

        {/* Main Content */}
        <main className="mainContent p-4 pt-20">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
