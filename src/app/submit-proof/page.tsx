'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function SubmitProofPage() {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Skill proof submission is not fully implemented in this demo.");
    }
    
    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <Card className="max-w-2xl mx-auto bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Submit Skill Proof</CardTitle>
                    <CardDescription>Provide evidence for a skill you want to validate.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="skillName">Skill Name</Label>
                            <Input id="skillName" placeholder="e.g., React.js, Python, UI Design" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="projectTitle">Project Title</Label>
                            <Input id="projectTitle" placeholder="e.g., E-commerce Website" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea id="description" placeholder="Describe the project and your role." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="githubLink">GitHub Repository Link</Label>
                            <Input id="githubLink" placeholder="https://github.com/..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="screenshots">Upload Screenshots</Label>
                            <Input id="screenshots" type="file" multiple />
                        </div>
                        <Button type="submit">Submit for Validation</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
