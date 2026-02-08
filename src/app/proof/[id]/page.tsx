import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Github, ThumbsUp, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

// This is a placeholder function to get proof data. In a real app, this would fetch from Firestore.
async function getProofData(id: string) {
    if (id === 'example') {
        return {
            id: 'example',
            skillName: 'Next.js Development',
            projectTitle: 'Portfolio Website',
            description: 'Developed a personal portfolio website using Next.js, TypeScript, and Tailwind CSS. Features include server-side rendering, dynamic routing, and a blog section with Markdown support.',
            githubLink: 'https://github.com/example/portfolio',
            screenshots: ['https://picsum.photos/seed/proof-1/800/600'],
            validationCount: 27,
            authorEmail: 'developer@example.com'
        };
    }
    return null;
}


export default async function ProofPage({ params }: { params: { id: string } }) {
    const proof = await getProofData(params.id);

    if (!proof) {
        // In a real app, you would fetch and if not found, call notFound().
        // For this demo, we'll show a message for non-example IDs.
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Proof not found</h1>
                <p className="text-muted-foreground">This skill proof does not exist or has been removed.</p>
                <p className="mt-4">Try the <Link href="/proof/example" className="text-primary underline">example proof</Link>.</p>
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
                        <div className="rounded-lg overflow-hidden border">
                            <Image
                                src={proof.screenshots[0]}
                                alt={`Screenshot for ${proof.projectTitle}`}
                                width={800}
                                height={600}
                                className="w-full"
                                data-ai-hint="website screenshot"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg bg-muted/50 p-4">
                        <Button asChild variant="outline">
                            <a href={proof.githubLink} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> View on GitHub
                            </a>
                        </Button>
                        <div className="flex items-center gap-4">
                             <Button>
                                <ThumbsUp className="mr-2 h-4 w-4" />
                                Validate Skill
                            </Button>
                            <div className="text-center">
                                <p className="text-2xl font-bold">{proof.validationCount}</p>
                                <p className="text-xs text-muted-foreground">Validations</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
