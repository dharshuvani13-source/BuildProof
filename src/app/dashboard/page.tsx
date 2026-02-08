'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Github, Target, Users } from 'lucide-react';

const TeamMemberCard = ({ name, role, contributions, imageUrl, imageHint }: { name: string; role: string; contributions: string, imageUrl: string, imageHint: string }) => (
    <div className="text-center">
        <Image
            src={imageUrl}
            alt={`Photo of ${name}`}
            width={128}
            height={128}
            className="rounded-full mx-auto mb-4 border-4 border-white/50 shadow-lg"
            data-ai-hint={imageHint}
        />
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-primary font-medium">{role}</p>
        <p className="text-sm text-muted-foreground mt-2">{contributions}</p>
    </div>
);

export default function DashboardPage() {
    const { user, loading } = useAuth();
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
    
    const teamMembers = PlaceHolderImages.filter(img => img.id.startsWith('team-'));

    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <div className="space-y-4 mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Welcome to your Dashboard</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    This is your central hub for managing, submitting, and tracking your real-world skill proofs.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                 <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">How It Works</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">
                            Submit your project as evidence. We generate a shareable page. Get validated by peers.
                        </p>
                    </CardContent>
                </Card>
                 <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Project Overview</CardTitle>
                         <Github className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         <p className="text-xs text-muted-foreground">
                            Showcase your best work. Link your GitHub repository to provide in-depth proof of your skills.
                        </p>
                    </CardContent>
                </Card>
                 <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Meet the Team</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">
                            Our platform is built by a dedicated team of innovators passionate about fair skill recognition.
                        </p>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="w-full bg-white/30 backdrop-blur-lg border-white/20 shadow-lg mb-16">
                <CardHeader>
                    <CardTitle>Submit Your First Skill Proof</CardTitle>
                    <CardDescription>Ready to prove your skills? Submit your first project and start building your evidence-based portfolio.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/submit-proof">Submit a Project <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </CardContent>
            </Card>

            <section id="team" className="py-16 text-center">
                <h2 className="text-3xl font-bold mb-2 font-headline">Meet Our Team</h2>
                <p className="text-muted-foreground mb-12 max-w-xl mx-auto">The minds behind SkillProof, dedicated to changing how skills are validated globally.</p>
                <div className="grid gap-12 md:grid-cols-3">
                    <TeamMemberCard
                        name="Alex Johnson"
                        role="Lead Developer"
                        contributions="Architected the core platform and leads the backend development."
                        imageUrl={teamMembers.find(m => m.id === 'team-1')?.imageUrl || 'https://picsum.photos/seed/1/128/128'}
                        imageHint={teamMembers.find(m => m.id === 'team-1')?.imageHint || 'man portrait'}
                    />
                    <TeamMemberCard
                        name="Maria Garcia"
                        role="UX/UI Designer"
                        contributions="Designed the glassmorphism interface and user experience flow."
                        imageUrl={teamMembers.find(m => m.id === 'team-2')?.imageUrl || 'https://picsum.photos/seed/2/128/128'}
                        imageHint={teamMembers.find(m => m.id === 'team-2')?.imageHint || 'woman portrait'}
                    />
                    <TeamMemberCard
                        name="Sam Chen"
                        role="Frontend Engineer"
                        contributions="Implemented the responsive frontend and interactive components."
                        imageUrl={teamMembers.find(m => m.id === 'team-3')?.imageUrl || 'https://picsum.photos/seed/3/128/128'}
                        imageHint={teamMembers.find(m => m.id === 'team-3')?.imageHint || 'person portrait'}
                    />
                </div>
            </section>
        </div>
    );
}
