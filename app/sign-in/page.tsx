"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { authClient } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
 const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    const router=useRouter();
  
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
  
      setError("");
      setLoading(true);
  
      try {
        if ( !email || !password) {
          throw new Error("All fields are required");
        }
  
        const result=await authClient.signIn.email({
        
          email,
          password,
        });
        if(result.error){
          setError(result.error.message ?? "Failed to sign in")
        } else {
  router.push("/dashboard")
        }
  
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
  
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-orange-100 via-pink-100 to-purple-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Sign in to your account to continue tracking your job applications
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
              {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
                </div>
            )}
            {/* Email Field */}
            <div className="flex flex-col">
              <Label htmlFor="email" className="mb-1 font-medium text-gray-700">
                Email
              </Label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="you@example.com"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <Label htmlFor="password" className="mb-1 font-medium text-gray-700">
                Password
              </Label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                 onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter password"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition"
              disabled={loading}
            >
             {loading ? "Signing in....":"Sign In"}
            </button>

            {/* No account? Sign Up link */}
            <p className="text-center text-sm text-gray-600 mt-2">
              Don’t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium hover:underline"
                style={{ color: "#3e2442" }} // primary color
              >
                Sign Up
              </Link>
            </p>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
