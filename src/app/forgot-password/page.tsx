'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
    // This is a placeholder for the forgot password functionality.
    // In a real app, this form would trigger an action to send a reset OTP.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Forgot password functionality is not fully implemented in this demo.");
    }
  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/20 bg-white/30 p-8 shadow-lg backdrop-blur-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Forgot Password</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-1">
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
         <div className="text-center text-sm">
            <Link href="/login" className="font-medium text-primary hover:underline">
                Back to login
            </Link>
        </div>
      </div>
    </div>
  );
}
