"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Book,
  CreditCard,
  List,
  Users,
  Gift,
  LifeBuoy,
  Settings,
  Layout,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Resources", href: "/resources", icon: Book },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Task History", href: "/task-history", icon: List },
  { name: "Mentors", href: "/mentors", icon: Users },
  { name: "Referrals", href: "/referrals", icon: Gift },
  { name: "Help Desk", href: "/help-desk", icon: LifeBuoy },
];

const bottomItems = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Layout", href: "/layout", icon: Layout },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login"); // Redirect to the login page
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-background border-r border-border flex flex-col z-50">
      {/* Logo at the top */}
      <div className="flex items-center justify-center p-4 border-b">
        <Image src="/logo.svg" alt="Logo" width={80} height={80} />
      </div>

      {/* Main menu items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2 py-4">
          {menuItems.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition duration-300",
                  pathname.startsWith(href)
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom menu items */}
      <nav className="border-t p-2">
        <ul className="space-y-1">
          {bottomItems.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition duration-300",
                  pathname.startsWith(href)
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {name}
              </Link>
            </li>
          ))}

          {/* Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition duration-300 text-red-600 hover:bg-red-100"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
