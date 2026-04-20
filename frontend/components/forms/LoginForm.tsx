"use client";

import { useAppDispatch } from "@/redux/hooks";
import { loginUserThunk } from "@/redux/auth/auth.thunks";
import { loginSchema, LoginUserFormData } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginSchema),
    shouldFocusError: true,
  });

  const onSubmit = async (data: LoginUserFormData) => {
    if (isSubmitting) return;

    try {
      await dispatch(loginUserThunk(data)).unwrap();
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error: unknown) {
      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : "Invalid email or password";

      setError("root", { type: "manual", message });
    }
  };

  const inputStyles = (hasError: boolean) => `
    w-full p-3 bg-white border rounded-lg outline-none transition-all duration-200
    disabled:opacity-70 disabled:cursor-not-allowed
    ${
      hasError
        ? "border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-gray-200 focus:border-black focus:ring-2 focus:ring-black/5"
    }
  `;

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 bg-white rounded-2xl shadow-xl shadow-gray-200/50 space-y-6 border border-gray-100"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500">
              Sign in to manage your account
            </p>
          </div>

          {/* Root Error */}
          {errors.root && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{errors.root.message}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="name@example.com"
                disabled={isSubmitting}
                className={inputStyles(!!errors.email)}
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href="/auth/password_reset"
                  className="text-xs text-gray-400 hover:text-black"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  className={inputStyles(!!errors.password)}
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white p-3.5 rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Register */}
          <p className="text-center text-sm text-gray-500 pt-2">
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-black font-semibold hover:underline underline-offset-4"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
