'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Github, ThumbsUp, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from "firebase/firestore";

interface SkillProof {
    id: string;
    skillName: string;
    projectTitle: string;
    description: string;
    githubRepoLink: string;
    screenshotUrls: string[];
    peerValidationCount: number;
    userId: string;
}

export default function ProofPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const firestore = useFirestore();

    const proofId = params.id as string;
    const userId = searchParams.get('userId');

    const proofDocRef = useMemoFirebase(() => {
        if (!firestore || !userId || !proofId) return null;
        return doc(firestore, `users/${userId}/skillProofs/${proofId}`);
    }, [firestore, userId, proofId]);

    const { data: proof, isLoading, error } = useDoc<SkillProof>(proofDocRef);
    
    if (isLoading) {
        return (
             <div className="flex h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        )
    }

    if (!proof || error) {
        return (
            <div className="text-center py-20">
                <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                <h1 className="mt-4 text-2xl font-bold">Proof not found</h1>
                <p className="text-muted-foreground">This skill proof does not exist or has been removed.</p>
                <p className="mt-4">
                    <Button asChild variant="outline">
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </p>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                        <CheckCircle />
                        <span className="font-semibold">VALIDATED SKILL</span>
                    </div>
                    <CardTitle className="text-4xl font-bold">{proof.skillName}</CardTitle>
                    <CardDescription className="text-lg">
                        Project: {proof.projectTitle}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Project Description</h3>
                        <p className="text-muted-foreground">{proof.description}</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Evidence</h3>
                         {proof.screenshotUrls && proof.screenshotUrls.length > 0 ? (
                            <div className="rounded-lg overflow-hidden border">
                                <Image
                                    src={proof.screenshotUrls[0]}
                                    alt={`Screenshot for ${proof.projectTitle}`}
                                    width={800}
                                    height={600}
                                    className="w-full"
                                    data-ai-hint="website screenshot"
                                />
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No screenshots provided.</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg bg-muted/50 p-4">
                        <Button asChild variant="outline">
                            <a href={proof.githubRepoLink} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> View on GitHub
                            </a>
                        </Button>
                        <div className="flex items-center gap-4">
                             <Button>
                                <ThumbsUp className="mr-2 h-4 w-4" />
                                Validate Skill
                            </Button>
                            <div className="text-center">
                                <p className="text-2xl font-bold">{proof.peerValidationCount}</p>
                                <p className="text-xs text-muted-foreground">Validations</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
