"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  // const onSubmit = async (data: ForgotFormData) => {
  //   setIsLoading(true);
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay

  //     setIsSent(true);
  //     toast.success("Reset link sent successfully!");
  //   } catch (error: any) {
  //     toast.error(error || "Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-gray-100 shadow-xl rounded-3xl overflow-hidden bg-white">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg shadow-black/10">
                <div className="w-3 h-3 bg-white rotate-45" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center tracking-tight">
              Forgot password?
            </CardTitle>
            <CardDescription className="text-center">
              {isSent
                ? "Check your inbox for a reset link"
                : "No worries, we'll send you reset instructions."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  // onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...register("email")}
                        placeholder="name@example.com"
                        type="email"
                        className="pl-10 h-11 rounded-xl border-gray-100 focus:ring-black"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs font-medium text-red-500 ml-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-xl bg-black hover:bg-gray-800 text-white font-bold transition-all"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4 space-y-4"
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed px-4">
                    We've sent a password reset link to your email. Please check
                    your spam folder if you don't see it.
                  </p>
                  <Button
                    onClick={() => setIsSent(false)}
                    variant="outline"
                    className="rounded-xl"
                  >
                    Didn't receive email? Try again
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
