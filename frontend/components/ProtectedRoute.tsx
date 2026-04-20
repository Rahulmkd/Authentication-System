"use client";

import { useAuthInit } from "@/hooks/userAuthInit";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardSkeleton } from "./common/DashboardSkeleton";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthInit();

  const { isAuthenticated, isLoading } = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return <DashboardSkeleton />;

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
