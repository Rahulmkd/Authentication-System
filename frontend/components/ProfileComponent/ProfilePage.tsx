"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/auth/auth.slice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, LogOut, Mail, UserPen, Fingerprint } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Using your typed hook to avoid 'any' errors
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  if (loading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50/50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <p className="mt-2 text-sm text-gray-500 font-medium">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-gray-100 overflow-hidden bg-white">
        {/* Simple Modern Header */}
        <div className="h-24 bg-black w-full" />

        <CardContent className="px-6 pb-8 flex flex-col items-center">
          {/* Avatar overlap effect */}
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg -mt-12 bg-white">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gray-100 text-xl font-bold text-gray-600">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          {/* User Profile Header */}
          <div className="text-center mt-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {user?.name}
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-gray-500 mt-1">
              <Mail className="w-3.5 h-3.5" />
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="w-full space-y-3">
            {/* Account Info Section */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                  <Fingerprint className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Account ID
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-gray-400 truncate max-w-[140px]">
                {user?.id}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-3 mt-8">
            <Button
              variant="outline"
              className="w-full rounded-xl py-6 border-gray-200 hover:bg-gray-50 hover:text-black transition-all font-semibold"
              onClick={() => router.push("/edit-profile")}
            >
              <UserPen className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>

            <Button
              variant="destructive"
              className="w-full rounded-xl py-6 text-white bg-red-600 hover:bg-red-700 transition-all shadow-md shadow-red-100 font-semibold"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
