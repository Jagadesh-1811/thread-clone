"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg"
    >
      <Card className="glass border-white/10 text-white shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
        
        <CardHeader className="space-y-1 text-center pb-4">
          <motion.div variants={itemVariants}>
            <CardTitle className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/60">
              Welcome Back
            </CardTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardDescription className="text-neutral-400 text-base">
              Sign in to your account to continue
            </CardDescription>
          </motion.div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-red-400 text-sm text-center py-3 rounded-lg bg-red-500/10 border border-red-500/20 font-medium"
              >
                {error}
              </motion.div>
            )}
            
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="email" className="text-neutral-300 ml-1 font-medium">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="bg-white/5 border-white/10 text-white h-12 focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all placeholder:text-neutral-600 rounded-xl" 
                placeholder="name@example.com" 
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2 relative">
              <div className="flex justify-between items-center ml-1">
                <Label htmlFor="password" className="text-neutral-300 font-medium">Password</Label>
                <Link href="#" className="text-xs text-neutral-500 hover:text-white transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  className="bg-white/5 border-white/10 text-white h-12 pr-12 focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all rounded-xl" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-4 pb-8">
            <motion.div variants={itemVariants} className="w-full">
              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-neutral-200 font-bold py-7 rounded-xl transition-all active:scale-[0.98] text-lg shadow-xl shadow-white/5" 
                disabled={loading}
              >
                {loading ? "Verifying..." : "Sign In"}
              </Button>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-sm text-center text-neutral-400">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-white hover:underline font-semibold decoration-white/30 underline-offset-4">
                Create one now
              </Link>
            </motion.div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
