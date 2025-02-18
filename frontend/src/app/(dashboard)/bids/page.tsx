// src/app/bids/page.tsx
import MainLayout from "@/components/layout/MainLayout";
import styles from "@/components/styles/bids.module.css";

export default function BidsPage() {
  const bids = [
    { title: "Website Development", amount: "$500", status: "Pending" },
    { title: "Mobile App Design", amount: "$300", status: "Accepted" },
    { title: "SEO Optimization", amount: "$200", status: "Rejected" },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1>Bids Overview</h1>
        <div className={styles.bidsList}>
          {bids.map((bid, index) => (
            <div key={index} className={styles.bidCard}>
              <h3>{bid.title}</h3>
              <p>Amount: {bid.amount}</p>
              <span className={styles.status}>{bid.status}</span>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
