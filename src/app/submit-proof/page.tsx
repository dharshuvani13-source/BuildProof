'use client';

import { useUser, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const ProofSchema = z.object({
  skillName: z.string().min(2, { message: 'Skill name is required.' }),
  projectTitle: z.string().min(2, { message: 'Project title is required.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  githubRepoLink: z.string().url({ message: 'Please enter a valid URL.' }),
});

type ProofFormData = z.infer<typeof ProofSchema>;

export default function SubmitProofPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm<ProofFormData>({
        resolver: zodResolver(ProofSchema),
        defaultValues: {
            skillName: '',
            projectTitle: '',
            description: '',
            githubRepoLink: '',
        },
    });

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [user, isUserLoading, router]);

    const onSubmit = (values: ProofFormData) => {
        if (!user || !firestore) return;
        
        startTransition(() => {
            const screenshotUrls = ['https://picsum.photos/seed/screenshot/800/600'];

            const dataToSave = {
                ...values,
                userId: user.uid,
                peerValidationCount: 0,
                screenshotUrls: screenshotUrls,
                createdAt: serverTimestamp(),
            };

            const skillProofsCollection = collection(firestore, `users/${user.uid}/skillProofs`);
            
            addDoc(skillProofsCollection, dataToSave)
                .then(() => {
                    toast({ title: 'Success!', description: 'Your skill proof has been submitted.' });
                    router.push('/dashboard');
                })
                .catch((error) => {
                    console.error('Error submitting proof:', error);
                    const permissionError = new FirestorePermissionError({
                        path: skillProofsCollection.path,
                        operation: 'create',
                        requestResourceData: dataToSave,
                    });
                    errorEmitter.emit('permission-error', permissionError);
                    toast({ title: 'Error', description: 'There was a problem submitting your proof.', variant: 'destructive' });
                });
        });
    }

    if (isUserLoading || !user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }
    
    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <Card className="max-w-2xl mx-auto bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Submit Skill Proof</CardTitle>
                    <CardDescription>Provide evidence for a skill you want to validate.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="skillName"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Skill Name</Label>
                                        <FormControl><Input placeholder="e.g., React.js, Python, UI Design" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="projectTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Project Title</Label>
                                        <FormControl><Input placeholder="e.g., E-commerce Website" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Short Description</Label>
                                        <FormControl><Textarea placeholder="Describe the project and your role." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="githubRepoLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>GitHub Repository Link</Label>
                                        <FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-2">
                                <Label htmlFor="screenshots">Upload Screenshots (Demo)</Label>
                                <Input id="screenshots" type="file" multiple disabled/>
                                <p className="text-xs text-muted-foreground">File upload is not implemented in this demo.</p>
                            </div>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Submitting...' : 'Submit for Validation'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}