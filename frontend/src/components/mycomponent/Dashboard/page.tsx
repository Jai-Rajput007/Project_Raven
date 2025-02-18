// src/components/Dashboard.tsx
"use client";

import React, { useState } from "react";
import styles from "@/components/styles/Dashboard.module.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// TypeScript Interfaces
interface Project {
  id: number;
  name: string;
  task: string;
  status: "completed" | "ongoing";
}

interface Client {
  id: number;
  name: string;
  image: string;
}

interface Bid {
  id: number;
  projectName: string;
  status: "Accepted" | "Pending";
}

interface EarningsData {
  name: string;
  value: number;
}

// Static Data for Projects
const staticProjects: Project[] = [
  { id: 1, name: "Project Alpha", task: "Web Dev Project", status: "ongoing" },
  { id: 2, name: "Project Beta", task: "Mobile App Project", status: "completed" },
  { id: 3, name: "Project Gamma", task: "Testing Project", status: "ongoing" },
  { id: 4, name: "Project Delta", task: "API Integration", status: "completed" }
];

// Static Data for Clients
const staticClients: Client[] = [
  { id: 1, name: "Client A", image: "/clientA.png" },
  { id: 2, name: "Client B", image: "/clientB.png" },
  { id: 3, name: "Client C", image: "/clientC.png" }
];

// Static Data for Bids
const staticBids: Bid[] = [
  { id: 1, projectName: "Bid Alpha", status: "Pending" },
  { id: 2, projectName: "Bid Beta", status: "Accepted" },
  { id: 3, projectName: "Bid Gamma", status: "Pending" },
  { id: 4, projectName: "Bid Delta", status: "Accepted" }
];

// Static Data for Earnings Chart
const earningsData: EarningsData[] = [
  { name: "This Month", value: 4000 },
  { name: "Last Month", value: 3000 },
  { name: "Total", value: 10000 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "ongoing">("all");
  const [clientTab, setClientTab] = useState<"clients" | "bids">("clients");

  // Counting Projects by Status
  const allCount = staticProjects.length;
  const completedCount = staticProjects.filter((proj) => proj.status === "completed").length;
  const ongoingCount = staticProjects.filter((proj) => proj.status === "ongoing").length;

  return (
    <div className={styles.dashboardContainer}>
      {/* Left Section - Projects */}
      <div className={styles.projectsSection}>
        <h2>Projects</h2>
        <div className={styles.projectsTabs}>
          <div
            className={`${styles.projectsTab} ${styles.allTab} ${activeTab === "all" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All <span className={styles.tabNumber}>{allCount}</span>
          </div>
          <div
            className={`${styles.projectsTab} ${styles.completedTab} ${activeTab === "completed" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed <span className={styles.tabNumber}>{completedCount}</span>
          </div>
          <div
            className={`${styles.projectsTab} ${styles.ongoingTab} ${activeTab === "ongoing" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing <span className={styles.tabNumber}>{ongoingCount}</span>
          </div>
        </div>
        <table className={styles.projectsTable}>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {staticProjects
              .filter((proj) => activeTab === "all" || proj.status === activeTab)
              .map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.task}</td>
                  <td className={project.status === "ongoing" ? styles.statusOngoing : styles.statusCompleted}>
                    {project.status === "ongoing" ? "Ongoing" : "Done"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Middle Section - My Clients and My Bids */}
<div className={styles.middleSection}>
  {/* My Clients Section */}
  <div className={styles.clientsSection}>
    <h2>My Clients</h2>
    <table className={styles.clientsTable}>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {staticClients.map((client) => (
          <tr key={client.id}>
            <td>
              <img
                src={client.image}
                alt={client.name}
                className={styles.clientImage}
              />
            </td>
            <td>{client.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* My Bids Section */}
  <div className={styles.bidsSection}>
    <h2>My Bids</h2>
    <table className={styles.bidsTable}>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {staticBids.map((bid) => (
          <tr key={bid.id}>
            <td>{bid.projectName}</td>
            <td
              className={
                bid.status === "Accepted"
                  ? styles.statusAccepted
                  : styles.statusPending
              }
            >
              {bid.status}
            </td>
          </tr>
        ))}
        {/* Static Bids */}
        <tr>
          <td>Bid Gamma</td>
          <td className={styles.statusPending}>Pending</td>
        </tr>
        <tr>
          <td>Bid Delta</td>
          <td className={styles.statusAccepted}>Accepted</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


      {/* Right Section - Earnings */}
      <div className={styles.earningsSection}>
        <h2>Earnings</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={earningsData} dataKey="value" outerRadius={80} label={(entry) => entry.name}>
              {earningsData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.earningsDetails}>
          <p>Last Month: $3000</p>
          <p>This Month: $4000</p>
          <hr className={styles.divider} />
          <p>Total Earnings: $10000</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;