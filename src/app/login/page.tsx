'use client';

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/app/actions/auth.actions";
import { useAuth } from "@/hooks/useAuth";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export default function LoginPage() {
  const { toast } = useToast();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
        const result = await loginUser(values);
        if(result.success && result.user) {
            toast({ title: "Login successful!" });
            login(result.user);
        } else {
            toast({
                title: "Error",
                description: result.message,
                variant: "destructive",
            });
        }
    });
  }

  return (
    <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/20 bg-white/30 p-8 shadow-lg backdrop-blur-lg">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">Sign in to your account</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Or{" "}
                    <Link href="/signup" className="font-medium text-primary hover:underline">
                        create a new account
                    </Link>
                </p>
            </div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <Link href="/forgot-password"className="font-medium text-primary hover:underline">
                            Forgot your password?
                        </Link>
                    </div>
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Signing in..." : "Sign in"}
                </Button>
            </form>
            </Form>
        </div>
    </div>
  );
}
