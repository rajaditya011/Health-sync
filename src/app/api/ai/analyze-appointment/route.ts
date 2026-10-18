import { NextRequest, NextResponse } from 'next/server';

const GROQ_KEYS = [
    process.env.GROQ_API_KEY_1 || '',
    process.env.GROQ_API_KEY_2 || '',
].filter(Boolean);

const GROQ_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];

export async function POST(request: NextRequest) {
    try {
        const { transcript, patientContext } = await request.json();

        const systemPrompt = `You are a medical AI assistant for doctors. 
Your task is to analyze the raw transcript of an appointment conversation between a doctor and a patient.
${patientContext ? `\nPatient Context:\n${patientContext}\n` : ''}
Extract and perfectly summarize the following from the transcript:
1. Patient's Symptoms
2. Doctor's Observations/Notes
3. Prescribed Treatments or Medications
4. Follow-up Actions

Format the response cleanly in markdown. Use clear headings. Keep it professional and concise.`;

        let summary = '';
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
                                { role: 'user', content: `Analyze this appointment transcript:\n\n${transcript}` },
                            ],
                            temperature: 0.3,
                            max_completion_tokens: 1024,
                        }),
                    });

                    const data = await response.json();
                    if (!data.error && data.choices?.[0]?.message?.content) {
                        summary = data.choices[0].message.content;
                        break;
                    }
                    lastError = data.error;
                } catch (err) {
                    lastError = err;
                }
            }
            if (summary) break;
        }

        if (!summary) {
            return NextResponse.json({ error: lastError?.message || 'Failed to analyze appointment' }, { status: 500 });
        }

        return NextResponse.json({ summary });
    } catch (error) {
        console.error('Appointment Analysis Error:', error);
        return NextResponse.json({ error: 'Failed to analyze appointment' }, { status: 500 });
    }
}
