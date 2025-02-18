"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navbarItems = [
  { name: "Community", href: "/community" },
  { name: "AI task delegation", href: "/AI-task-delegation" },
  { name: "Jobs", href: "/jobs" },
  { name: "Workspace", href: "/workspace" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-primary text-primary-foreground py-4 px-6 shadow-md fixed top-0 left-64 z-50">
      <div className="flex items-center justify-between">
        <ul className="flex gap-6">
          {navbarItems.map(({ name, href }) => (
            <li key={name}>
              <Link
                href={href}
                className={cn(
                  "text-sm font-medium transition duration-300",
                  pathname.startsWith(href)
                    ? "text-accent-foreground border-b-2 border-accent-foreground"
                    : "hover:text-accent-foreground hover:border-b-2 hover:border-accent-foreground"
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
