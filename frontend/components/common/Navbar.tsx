"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/auth/auth.slice";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  User,
  LayoutDashboard,
  Settings,
  Menu,
  X,
  Search,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Centralized Navigation Data
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Community", href: "/community" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* --- LEFT SIDE: Logo & Desktop Links --- */}
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="text-xl font-black tracking-tighter text-black flex items-center gap-1"
            >
              <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
                <div className="w-2 h-2 bg-white rotate-45" />
              </div>
              BRAND<span className="text-gray-400">.</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                      isActive
                        ? "text-black"
                        : "text-gray-500 hover:text-black hover:bg-gray-50",
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black mx-4"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* --- RIGHT SIDE: Actions & Profile --- */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon (Desktop) */}
            <button className="hidden sm:flex p-2 text-gray-400 hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0 border border-gray-100 shadow-sm hover:ring-2 hover:ring-black/5 transition-all"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-black text-white text-xs font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-64 mt-2 rounded-2xl p-2 shadow-2xl border-gray-100 animate-in fade-in zoom-in-95 duration-100"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-gray-100 text-black">
                          {user.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-gray-900 leading-none mb-1">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate w-32">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-gray-50" />

                  <div className="p-1">
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/profile")}
                      className="rounded-xl gap-3 py-2.5 cursor-pointer focus:bg-gray-50"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">My Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard")}
                      className="rounded-xl gap-3 py-2.5 cursor-pointer focus:bg-gray-50"
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Dashboard</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/settings")}
                      className="rounded-xl gap-3 py-2.5 cursor-pointer focus:bg-gray-50"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Settings</span>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="bg-gray-50" />

                  <div className="p-1">
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="rounded-xl gap-3 py-2.5 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-bold">Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-semibold hover:bg-gray-100 rounded-xl px-5"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-black text-white hover:bg-gray-800 rounded-xl text-sm font-bold px-6 shadow-xl shadow-black/10 transition-all active:scale-95">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* --- MOBILE MENU TOGGLE --- */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-0 border-l-0">
                  <SheetHeader className="p-6 border-b border-gray-50">
                    <SheetTitle className="text-left text-xl font-black tracking-tighter">
                      BRAND<span className="text-gray-400">.</span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col p-4 gap-2">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl text-lg font-semibold transition-all",
                          pathname === link.href
                            ? "bg-black text-white"
                            : "hover:bg-gray-50",
                        )}
                      >
                        {link.name}
                        <ChevronRight
                          className={cn(
                            "w-5 h-5",
                            pathname === link.href
                              ? "text-white"
                              : "text-gray-300",
                          )}
                        />
                      </Link>
                    ))}
                  </div>

                  {!isAuthenticated && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-50 bg-white space-y-3">
                      <Link
                        href="/auth/login"
                        className="w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full rounded-xl py-6 border-gray-200"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link
                        href="/auth/register"
                        className="w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="w-full bg-black text-white rounded-xl py-6">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
