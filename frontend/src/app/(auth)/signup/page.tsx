"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/components/styles/signup.module.css";
import Starfield from "@/components/Starfield";

const Signup = () => {
  const [userType, setUserType] = useState("junior");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, user_type: userType }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className={styles.page}>
      <Starfield /> {/* Starfield background */}
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Signup as {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </h1>
        <p className={styles.subtext}>Please fill in the details to get started.</p>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Your Good Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className={styles.label}>E-mail</label>
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.button}>
            Sign Up &gt;&gt;
          </button>
        </form>

        <div className={styles.links}>
          {userType !== "junior" && (
            <p onClick={() => setUserType("junior")} className={styles.link}>
              Junior?
            </p>
          )}
          {userType !== "senior" && (
            <p onClick={() => setUserType("senior")} className={styles.link}>
              Senior?
            </p>
          )}
          {userType !== "validator" && (
            <p onClick={() => setUserType("validator")} className={styles.link}>
              Validator?
            </p>
          )}
          <p onClick={() => router.push("/login")} className={styles.link}>
            Already have an account? Log in
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
