"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Starfield from "@/components/Starfield";
import styles from "@/components/styles/login.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Necessary for sending cookies
      });

      const data = await response.json();

      if (response.ok) {
        // Save user info in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to /dashboard after successful login
        router.push("/home");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.page}>
      <Starfield />
      <div className={styles.container}>
        <h1 className={styles.heading}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className={styles.input}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>

        <p onClick={() => router.push("/signup")} className={styles.link}>
          Don't have an account? Sign up
        </p>
      </div>
    </div>
  );
};

export default Login;
