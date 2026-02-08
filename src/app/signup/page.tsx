'use client';

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useTransition } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

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

const SignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export default function SignupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof SignupSchema>) {
        startTransition(async () => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
                await updateProfile(userCredential.user, { displayName: values.name });

                toast({
                    title: "Account Created!",
                    description: `Welcome, ${values.name}!`,
                });
                router.push('/dashboard');
            } catch (error: any) {
                let errorMessage = "An unexpected error occurred.";
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = "This email is already registered. Please login.";
                } else {
                    errorMessage = error.message;
                }
                toast({
                    title: "Error",
                    description: errorMessage,
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <div className="flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/20 bg-white/30 p-8 shadow-lg backdrop-blur-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                              <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
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
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Creating account..." : "Create Account"}
                    </Button>
                </form>
                </Form>
            </div>
        </div>
    );
}
