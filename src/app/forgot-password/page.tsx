
'use client';

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTransition } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export default function ForgotPasswordPage() {
    const { toast } = useToast();
    const auth = useAuth();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
      resolver: zodResolver(ForgotPasswordSchema),
      defaultValues: { email: "" },
    });

    const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
        startTransition(async () => {
            if (!auth) return;
            try {
                await sendPasswordResetEmail(auth, values.email);
                toast({
                    title: "Password Reset Email Sent",
                    description: "Check your inbox for a link to reset your password.",
                });
            } catch (error: any) {
                 toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
            }
        });
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl><Input placeholder="name@example.com" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Sending..." : "Send reset link"}
                </Button>
            </form>
        </Form>
         <div className="text-center text-sm">
            <Link href="/login" className="font-medium text-primary hover:underline">
                Back to login
            </Link>
        </div>
      </div>
    </div>
  );
}
