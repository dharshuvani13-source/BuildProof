import { defineFlow } from 'genkit';
import { ai } from './genkit';

export const evaluateSkillProof = defineFlow({
    name: 'evaluateSkillProof',
    inputSchema: z.object({
        skillName: z.string(),
        projectTitle: z.string(),
        description: z.string(),
        githubRepoLink: z.string(),
    }),
    outputSchema: z.object({
        score: z.number(),
        reasoning: z.string(),
        recommendation: z.string(),
    }),
}, async (input) => {
    const prompt = `Evaluate this skill proof submission and provide a detailed assessment: Skill: ${input.skillName} Project: ${input.projectTitle} Description: ${input.description} GitHub: ${input.githubRepoLink} Please analyze: 1. Quality and clarity of the project description 2. Legitimacy of the GitHub repository 3. Evidence of skill authenticity Provide a score (0-100) and detailed reasoning.`;
    const response = await ai.generate({ prompt, });
    return { score: 75, reasoning: response.text, recommendation: 'APPROVED', };
});