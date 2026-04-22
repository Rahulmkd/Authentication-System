"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Lock,
  Bell,
  Shield,
  Trash2,
  ChevronRight,
  Globe,
  Monitor,
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("account");

  const sidebarItems = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account preferences and security.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-black text-white shadow-lg shadow-black/5"
                    : "text-gray-500 hover:bg-white hover:text-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
                {activeTab !== item.id && (
                  <ChevronRight className="w-4 h-4 opacity-30" />
                )}
              </button>
            ))}
          </aside>

          {/* Settings Content Area */}
          <div className="flex-1 space-y-6">
            {/* General Account Section */}
            {activeTab === "account" && (
              <>
                <Card className="border-gray-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg">Public Profile</CardTitle>
                    <CardDescription>
                      Update your personal information visible to others.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase">
                          Full Name
                        </label>
                        <input
                          disabled
                          value={user?.name}
                          className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase">
                          Email Address
                        </label>
                        <input
                          disabled
                          value={user?.email}
                          className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <Button className="bg-black text-white hover:bg-gray-800 rounded-lg">
                      Request Change
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-gray-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg">Regional Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-50">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-semibold">Language</p>
                          <p className="text-xs text-gray-500">
                            English (United States)
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-100 shadow-sm rounded-2xl overflow-hidden bg-red-50/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600">
                      Danger Zone
                    </CardTitle>
                    <CardDescription>
                      Irreversible actions for your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-red-100">
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          Delete Account
                        </p>
                        <p className="text-xs text-gray-500">
                          Permanently remove all your data.
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        className="bg-red-600 text-white hover:text-red-600 rounded-lg flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Security Tab Placeholder */}
            {activeTab === "security" && (
              <Card className="border-gray-100 shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-black" />
                    Security Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">
                        Two-Factor Authentication
                      </p>
                      <p className="text-xs text-gray-500">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <div className="h-6 w-11 bg-gray-200 rounded-full relative">
                      <div className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full rounded-xl py-6">
                    Change Password
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
