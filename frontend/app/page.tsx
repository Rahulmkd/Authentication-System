"use client";

import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Globe,
  Layers,
} from "lucide-react";

export default function HomePage() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Abstract Background Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gray-100 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-gray-50 rounded-full blur-[100px] opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs font-bold text-gray-500 mb-6 animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-3 h-3 text-black" />
            <span>NEW: Version 2.0 is now live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6">
            Building the future <br className="hidden md:block" />
            of modern interfaces.
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-500 mb-10 leading-relaxed">
            A high-performance boilerplate built with Next.js, Redux Toolkit,
            and Tailwind CSS. Designed for developers who value speed,
            type-safety, and aesthetics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button className="h-12 px-8 bg-black text-white hover:bg-gray-800 rounded-xl text-md font-semibold transition-all active:scale-95 shadow-xl shadow-black/10">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/register">
                  <Button className="h-12 px-8 bg-black text-white hover:bg-gray-800 rounded-xl text-md font-semibold transition-all active:scale-95 shadow-xl shadow-black/10">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button
                    variant="ghost"
                    className="h-12 px-8 rounded-xl text-md font-semibold hover:bg-gray-50"
                  >
                    Live Demo
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 2. Features Bento Grid */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Engineered for Excellence
            </h2>
            <p className="text-gray-500 mt-2">
              Everything you need to ship products faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Feature Card */}
            <div className="md:col-span-2 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black">
                Lightning Fast Performance
              </h3>
              <p className="text-gray-500 leading-relaxed max-w-md">
                Optimized with Next.js App Router and Server Components to
                ensure your Core Web Vitals stay green across all devices.
              </p>
            </div>

            {/* Square Feature Card */}
            <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 border border-gray-100">
                <ShieldCheck className="text-black w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">
                Secure by Default
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                JWT-based authentication with protected routes and persistent
                sessions.
              </p>
            </div>

            {/* Bottom Row Feature Cards */}
            {[
              {
                title: "Global Reach",
                desc: "Edge deployment ready.",
                icon: Globe,
              },
              {
                title: "Scalable State",
                desc: "Redux Toolkit integration.",
                icon: Layers,
              },
              {
                title: "Smart Logic",
                desc: "Type-safe form handling.",
                icon: ShieldCheck,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
              >
                <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4 border border-gray-100">
                  <feature.icon className="text-gray-400 w-5 h-5" />
                </div>
                <h4 className="font-bold text-black">{feature.title}</h4>
                <p className="text-gray-500 text-xs mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Personalized CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-black rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-20" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {isAuthenticated
                ? `Ready to continue, ${user?.name?.split(" ")[0]}?`
                : "Ready to start your journey?"}
            </h2>
            <p className="text-gray-400 mb-10 max-w-lg mx-auto">
              Join thousands of users building amazing projects with our
              platform. Get started in less than 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={isAuthenticated ? "/dashboard" : "/auth/register"}>
                <Button className="bg-white text-black hover:bg-gray-100 rounded-xl px-10 h-12 font-bold transition-all">
                  {isAuthenticated ? "Go to Dashboard" : "Create My Account"}
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 rounded-xl px-10 h-12"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
