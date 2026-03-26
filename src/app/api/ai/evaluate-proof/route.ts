import { NextResponse } from 'next/server';
import { evaluateSkillProof } from '@/ai/flows';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        if (!data.skillName || !data.projectTitle || !data.description || !data.githubRepoLink) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const evaluation = await evaluateSkillProof({
            skillName: data.skillName,
            projectTitle: data.projectTitle,
            description: data.description,
            githubRepoLink: data.githubRepoLink,
        });

        return NextResponse.json(evaluation, { status: 200 });
    } catch (error) {
        console.error('Evaluation error:', error);
        return NextResponse.json({ error: 'Failed to evaluate proof', score: 70, reasoning: 'Proof submitted for manual review due to evaluation error.', recommendation: 'PENDING_REVIEW' }, { status: 500 });
    }
}