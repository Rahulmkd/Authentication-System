"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default Layout;
