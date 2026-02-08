'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, UploadCloud, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
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
    
    const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-linkedin');
    const teamMembers = PlaceHolderImages.filter((img) => img.id.startsWith('team-'));

    return (
        <div className="flex flex-col items-center">
      <section className="w-full py-20 md:py-32 lg:py-40">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Show, Don't Just Tell.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  SkillProof revolutionizes skill validation. Move beyond paper certificates and prove your abilities with real-world project evidence.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-2xl">
                <div className="absolute -top-10 -left-10 h-40 w-40 animate-blob rounded-full bg-primary/20 opacity-70 filter blur-2xl"></div>
                <div className="animation-delay-2000 absolute -bottom-10 -right-10 h-40 w-40 animate-blob rounded-full bg-accent/20 opacity-70 filter blur-2xl"></div>
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={1200}
                    height={800}
                    className="relative rounded-2xl border border-white/20 shadow-lg"
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A New Standard for Skill Validation</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides a simple, three-step process to showcase your tangible skills and gain recognition from peers and mentors.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <UploadCloud className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">1. Submit Your Project</h3>
              <p className="text-sm text-muted-foreground">
                Upload your project details, including title, description, GitHub link, and screenshots as concrete evidence of your skill.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <Share2 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold">2. Get a Shareable Proof</h3>
              <p className="text-sm text-muted-foreground">
                We generate a unique, public page for your skill proof, which you can share with employers, clients, or your network.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold">3. Receive Validations</h3>
              <p className="text-sm text-muted-foreground">
                Peers and mentors can view your work and validate your skill, adding weight and credibility to your proof.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Team</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Meet the Creators</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The passionate individuals who brought SkillProof to life.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
            {teamMembers.map((member) => {
              const [name, role] = member.description.replace('Portrait of ', '').split(', ');
              return (
                <Card key={member.id} className="overflow-hidden text-center bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={member.imageUrl}
                        alt={member.description}
                        fill
                        className="object-cover"
                        data-ai-hint={member.imageHint}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold">{name}</h3>
                      <p className="text-sm text-muted-foreground">{role}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
    );
}
