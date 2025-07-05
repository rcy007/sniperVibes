"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabaseBrowser } from "@/lib/supabase-browser";

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
            className="w-full px-3 py-2 border rounded-md bg-transparent"
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
            className="w-full px-3 py-2 border rounded-md bg-transparent"
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
          className="w-full py-2 rounded-md bg-foreground text-background disabled:opacity-60"
        >
          {isSubmitting ? "Please wait…" : variant === "signin" ? "Sign in" : "Sign up"}
        </button>
      </form>
      <p className="text-xs text-center mt-4">
        {variant === "signin" ? "Don't have an account?" : "Already have an account?"} {" "}
        <button
          className="underline"
          onClick={() => setVariant(variant === "signin" ? "signup" : "signin")}
        >
          {variant === "signin" ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
} 