'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifyOtp } from "@/app/actions/auth.actions";
import { useAuth } from "@/hooks/useAuth";

const OTPSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits." }),
});

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { toast } = useToast();
  const { login } = useAuth();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: { otp: "" },
  });

  if (!email) {
    router.push('/signup');
    return null;
  }

  const onSubmit = (values: z.infer<typeof OTPSchema>) => {
    startTransition(async () => {
      const result = await verifyOtp(email, values.otp);
      if (result.success && result.user) {
        toast({ title: "Success!", description: "Your email has been verified." });
        login(result.user);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/20 bg-white/30 p-8 shadow-lg backdrop-blur-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Verify your email</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We've sent an OTP to {email}. Check your console for the code.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
