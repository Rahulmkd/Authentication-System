"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  Activity,
  CreditCard,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  // Mock data for the dashboard stats
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      icon: LayoutDashboard,
      description: "+2 from last month",
    },
    {
      title: "Active Sessions",
      value: "4",
      icon: Activity,
      description: "Across 2 devices",
    },
    {
      title: "Balance",
      value: "$1,280.00",
      icon: CreditCard,
      description: "Next payout in 4 days",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome back, {user?.name?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Here is what happening with your account today.
            </p>
          </div>
          <Button className="bg-black text-white hover:bg-gray-800 rounded-xl px-5 h-11 shadow-lg shadow-black/5 transition-all active:scale-95">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-gray-100 shadow-sm rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <stat.icon className="w-4 h-4 text-black" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity (Takes 2 columns) */}
          <Card className="lg:col-span-2 border-gray-100 shadow-sm rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Project Updated
                        </p>
                        <p className="text-xs text-gray-500">
                          You modified the "Marketing Site" project
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                      2h ago
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-6 text-gray-500 hover:text-black"
              >
                View all activity
              </Button>
            </CardContent>
          </Card>

          {/* Account Summary (Takes 1 column) */}
          <Card className="border-gray-100 shadow-sm rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Account Quick-Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-black text-white space-y-2">
                <p className="text-xs opacity-70">Plan Status</p>
                <p className="text-lg font-bold">Pro Member</p>
                <Button
                  variant="secondary"
                  className="w-full bg-white/10 hover:bg-white/20 border-none text-white text-xs h-8"
                >
                  Upgrade Plan
                </Button>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Storage</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-black h-1.5 rounded-full w-[75%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
