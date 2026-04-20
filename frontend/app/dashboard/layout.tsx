"use client";
import Navbar from "@/components/common/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        {/* Navbar */}
        <Navbar />

        <div className="flex flex-1 overflow-hidden pt-2 pb-6">
          {/* Main Workspace */}
          <main className="flex-1 pr-6 overflow-hidden">
            <div className="h-full w-full bg-card border border-border rounded-[2.5rem] shadow-sm overflow-y-auto no-scrollbar relative">
              {/* Content */}
              <div className="p-8 max-w-6xl mx-auto min-h-full">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                  {children}
                </div>
              </div>

              {/* Subtle Glow */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
