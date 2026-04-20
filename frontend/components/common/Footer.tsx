"use client";

import Link from "next/link";
import { Mail, ArrowUpRight, X, FileSearch, QrCode } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "/#features" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Explore", href: "/explore" },
    { name: "Pricing", href: "/pricing" },
  ],
  support: [
    { name: "Documentation", href: "/docs" },
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Status", href: "/status" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tighter text-black"
            >
              BRAND<span className="text-gray-400">.</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Building high-performance interfaces with modern technology. The
              ultimate boilerplate for your next big idea.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="#"
                className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
              >
                <FileSearch size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
              >
                <X size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
              >
                <QrCode size={18} />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-black transition-colors flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={12}
                      className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-medium">
            &copy; {currentYear} Brand Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="mailto:hello@brand.com"
              className="text-xs text-gray-400 hover:text-black flex items-center gap-1.5 transition-colors"
            >
              <Mail size={14} />
              hello@brand.com
            </Link>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-400 font-medium">
                Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
