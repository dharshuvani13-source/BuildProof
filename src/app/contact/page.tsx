'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendContactMessage } from "@/app/actions/contact.actions";
import { Mail, MessageSquare, User } from "lucide-react";

const ContactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: z.infer<typeof ContactSchema>) => {
    startTransition(async () => {
      const result = await sendContactMessage(values);
      if (result.success) {
        toast({ title: "Message Sent!", description: "Thank you for contacting us. We'll get back to you shortly." });
        form.reset();
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    });
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
        <div className="w-full space-y-8 rounded-2xl border border-white/20 bg-white/30 p-8 shadow-lg backdrop-blur-lg">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Have a question or feedback? Drop us a message.
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex items-center"><User className="mr-2 h-4 w-4" /> Name</FormLabel>
                        <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex items-center"><Mail className="mr-2 h-4 w-4" /> Email</FormLabel>
                        <FormControl><Input placeholder="your@email.com" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex items-center"><MessageSquare className="mr-2 h-4 w-4" /> Message</FormLabel>
                        <FormControl><Textarea placeholder="Your message..." {...field} rows={5} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </Form>
        </div>
    </div>
  );
}
