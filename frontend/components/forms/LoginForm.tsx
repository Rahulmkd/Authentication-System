"use client";

import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <form className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-5 border border-gray-100">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
            required
          />
        </div>

        {/* Forgot password */}
        <div className="text-right">
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-black transition"
          >
            Forgot password?
          </a>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 active:scale-[0.99] transition font-medium"
        >
          Login
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-black font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
