'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { collection } from 'firebase/firestore';
import { PlusCircle, ThumbsUp, ArrowRight } from 'lucide-react';

interface SkillProof {
  id: string;
  skillName: string;
  projectTitle: string;
  peerValidationCount: number;
}

export default function DashboardPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();

    const skillProofsQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return collection(firestore, `users/${user.uid}/skillProofs`);
    }, [firestore, user]);

    const { data: skillProofs, isLoading: areProofsLoading } = useCollection<SkillProof>(skillProofsQuery);

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [user, isUserLoading, router]);

    const isLoading = isUserLoading || areProofsLoading;

    if (isLoading || !user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }
    
    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
                <Button asChild>
                    <Link href="/submit-proof">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Submit New Proof
                    </Link>
                </Button>
            </div>
            
            {skillProofs && skillProofs.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {skillProofs.map((proof) => (
                        <Card key={proof.id} className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg flex flex-col">
                            <CardHeader>
                                <CardTitle>{proof.skillName}</CardTitle>
                                <CardDescription>{proof.projectTitle}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span>{proof.peerValidationCount} Validations</span>
                                </div>
                                <Button asChild variant="outline" className="mt-auto w-full">
                                    <Link href={`/proof/${proof.id}?userId=${user.uid}`}>
                                        View Proof <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-white/20">
                    <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-archive text-muted-foreground/50">
                            <rect width="20" height="5" x="2" y="3" rx="1" />
                            <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
                            <path d="M10 12h4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">No SkillProofs Yet!</h2>
                    <p className="mt-2 text-muted-foreground">
                        You haven't submitted any skill proofs. It's time to show what you can do!
                    </p>
                    <Button asChild className="mt-6">
                        <Link href="/submit-proof">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Submit Your First Proof
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
