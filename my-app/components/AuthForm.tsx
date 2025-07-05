"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { LogIn, UserPlus, ArrowRight, Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Min 6 characters" }),
});

type FormData = z.infer<typeof schema>;

export default function AuthForm() {
  const [variant, setVariant] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const router = useRouter();
  const supabase = supabaseBrowser();

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      if (variant === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) return setError(error.message);
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        if (error) return setError(error.message);
      }
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white/60 dark:bg-black/40 backdrop-blur-xs rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-center">
        {variant === "signin" ? "Sign in" : "Create an account"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-out disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none overflow-hidden cursor-pointer"
        >
          <div className="flex items-center justify-center space-x-2">
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : variant === "signin" ? (
              <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            ) : (
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            )}
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              {isSubmitting ? "Please wait…" : variant === "signin" ? "Sign in" : "Sign up"}
            </span>
            {!isSubmitting && (
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
        </button>
      </form>
      <p className="text-xs text-center mt-4">
        {variant === "signin" ? "Don't have an account?" : "Already have an account?"} {" "}
        <button
          className="group relative text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 cursor-pointer"
          onClick={() => setVariant(variant === "signin" ? "signup" : "signin")}
        >
          <span className="relative z-10">
            {variant === "signin" ? "Sign up" : "Sign in"}
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out"></span>
        </button>
      </p>
    </div>
  );
} 