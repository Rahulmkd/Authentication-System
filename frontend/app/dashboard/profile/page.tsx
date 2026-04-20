"use client";

import { useAppSelector } from "@/redux/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Settings,
  Camera,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null; // Or a skeleton loader

  return (
    <div className="min-h-screen bg-gray-50/30 pb-12">
      {/* 1. Profile Header/Cover Area */}
      <div className="h-48 w-full bg-black relative">
        <div className="absolute -bottom-16 left-4 md:left-8 flex items-end gap-6">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl bg-white">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl font-bold bg-gray-100">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-all">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="mb-4 hidden sm:block">
            <h1 className="text-2xl font-bold text-black">{user.name}</h1>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Layout Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Info Card */}
        <div className="space-y-6">
          <Card className="border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Personal Info
              </CardTitle>
              <Link href="/settings/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-black"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Full Name</p>
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Account Status</p>
                  <p className="font-medium text-green-600 flex items-center gap-1">
                    Verified Member
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Joined</p>
                  <p className="font-medium text-gray-900">April 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm rounded-2xl">
            <CardContent className="p-6">
              <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-xl">
                Edit Profile Details
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Content/Bio/Activity */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-100 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm leading-relaxed">
                Welcome to your profile. Here you can manage your personal
                information, view your activity history, and update your
                security settings. Keep your profile updated to get the best
                experience out of our platform.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 bg-gray-50/30">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600 font-medium italic">
                    Location not set
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 bg-gray-50/30">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600 font-medium italic">
                    Website not set
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tab Placeholder or Future Content */}
          <div className="flex items-center gap-4 border-b border-gray-100">
            <button className="px-4 py-2 text-sm font-bold border-b-2 border-black -mb-px">
              Overview
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-black transition-colors">
              Security
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-black transition-colors">
              Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
