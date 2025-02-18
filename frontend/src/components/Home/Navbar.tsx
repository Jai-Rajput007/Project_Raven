// src/components/home/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/components/styles/home.module.css";

const navbarItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Task", href: "/task" },
  { name: "Projects", href: "/projects" },
  { name: "Bids", href: "/bids" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {navbarItems.map(({ name, href }) => (
          <li key={name}>
            <Link
              href={href}
              className={`${styles.navLink} ${
                pathname.startsWith(href) ? styles.activeLink : ""
              }`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
