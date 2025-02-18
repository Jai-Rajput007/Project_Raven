"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    }
  }, [user, pathname, router]);

  // Show nothing while redirecting to avoid flash of protected content
  if (!user && pathname !== "/login" && pathname !== "/signup") {
    return null;
  }

  return <>{children}</>;
}