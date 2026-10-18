import { NextRequest, NextResponse } from 'next/server';
import { PLATFORM_DOCTORS } from '@/lib/data';

const GROQ_KEYS = [
    process.env.GROQ_API_KEY_1 || '',
    process.env.GROQ_API_KEY_2 || '',
].filter(Boolean);

const GROQ_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];

async function callGroq(messages: { role: string; content: string }[], systemPrompt: string): Promise<string> {
    let lastError: any = null;

    for (const model of GROQ_MODELS) {
        for (const key of GROQ_KEYS) {
            try {
                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${key}`,
                    },
                    body: JSON.stringify({
                        model,
                        messages: [
                            { role: 'system', content: systemPrompt },
                            ...messages.map(m => ({
                                role: m.role === 'ai' ? 'assistant' : 'user',
                                content: m.content,
                            })),
                        ],
                        temperature: 0.7,
                        max_completion_tokens: 2048,
                    }),
                });

                const data = await response.json();
                if (!data.error && data.choices?.[0]?.message?.content) {
                    return data.choices[0].message.content;
                }
                lastError = data.error || new Error('Empty response');
            } catch (err) {
                lastError = err;
            }
        }
    }

    throw new Error(lastError?.message || 'Failed to call Groq API');
}

export async function POST(request: NextRequest) {
    try {
        const { messages, systemPrompt, userContext } = await request.json();

        let fullPrompt = systemPrompt || getDefaultSystemPrompt();

        const doctorsContext = PLATFORM_DOCTORS.map(d => `${d.name} (${d.specialty} - ${d.type})`).join(', ');
        
        fullPrompt += `\n\nAVAILABLE DOCTORS TO SUGGEST: ${doctorsContext}\nWhen analyzing a disease or symptom, explicitly recommend the BEST doctor from the above list for the user to consult based on the specialty and type of disease.`;

        if (userContext) {
            fullPrompt += `\n\n${userContext}`;
        }

        const text = await callGroq(messages, fullPrompt);

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error('AI Chat Error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}

function getDefaultSystemPrompt() {
    return `You are HealthSync AI, a compassionate and intelligent health assistant. You are part of the HealthSync platform — an AI-Assisted Recovery Journey System.

CRITICAL RULES:
1. You NEVER diagnose diseases. You help users understand symptoms and guide them to appropriate specialists.
2. You NEVER prescribe medications. You only help users understand prescribed medications.
3. You provide clear, structured, empathetic responses.
4. You always suggest consulting a qualified doctor for medical decisions.
5. You explain medical terms in simple, understandable language.
6. You are aware of the Indian healthcare context (ABHA, Jan Aushadhi, common conditions in India).
7. You personalize responses based on user profile when available.
8. You remember previous conversations and reference them when relevant.
9. When recommending doctors, specify the SPECIALIST TYPE needed (e.g., Nephrologist, Cardiologist).
10. For medications, always mention Jan Aushadhi (generic) alternatives if available to save costs.

BEHAVIOR:
- Be warm and reassuring, like a knowledgeable friend
- Use simple language, avoid medical jargon unless explaining it
- Structure responses with clear sections using markdown
- When discussing symptoms, always include urgency guidance (seek immediate care vs. schedule appointment)
- Suggest generic medicine alternatives when relevant to save costs
- Support Hindi and English responses based on user preference`;
}
