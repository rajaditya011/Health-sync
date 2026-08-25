import { NextRequest, NextResponse } from 'next/server';

const GROQ_KEYS = [
    process.env.GROQ_API_KEY_1 || '',
    process.env.GROQ_API_KEY_2 || '',
];

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

        let data;
        for (let i = 0; i < GROQ_KEYS.length; i++) {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_KEYS[i]}`,
                },
                body: JSON.stringify({
                    model: 'llama3-8b-8192',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: `Analyze this appointment transcript:\n\n${transcript}` },
                    ],
                    temperature: 0.3,
                    max_tokens: 1024,
                }),
            });

            data = await response.json();
            if (!data.error) break;
        }

        if (data.error) {
            // fallback to openai/gpt-oss-20b
            for (let i = 0; i < GROQ_KEYS.length; i++) {
                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${GROQ_KEYS[i]}`,
                    },
                    body: JSON.stringify({
                        model: 'openai/gpt-oss-20b', 
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: `Analyze this appointment transcript:\n\n${transcript}` },
                        ],
                        temperature: 0.3,
                        max_tokens: 1024,
                    }),
                });
    
                data = await response.json();
                if (!data.error) break;
            }

            if (data.error) {
                return NextResponse.json({ error: data.error.message }, { status: 500 });
            }
        }

        const text = data.choices?.[0]?.message?.content || 'Unable to generate summary.';

        return NextResponse.json({ summary: text });
    } catch (error) {
        console.error('Appointment Analysis Error:', error);
        return NextResponse.json({ error: 'Failed to analyze appointment' }, { status: 500 });
    }
}
