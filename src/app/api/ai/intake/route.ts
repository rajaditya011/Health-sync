import { NextRequest, NextResponse } from 'next/server';

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
                        temperature: 0.3,
                        max_completion_tokens: 1024,
                        response_format: { type: "json_object" }
                    }),
                });

                const data = await response.json();
                if (!data.error && data.choices?.[0]?.message?.content) {
                    return data.choices[0].message.content;
                }
                lastError = data.error;
            } catch (err) {
                lastError = err;
            }
        }
    }

    throw new Error(lastError?.message || 'Failed to call Groq API');
}

export async function POST(request: NextRequest) {
    try {
        const { messages, consultationType, patientContext } = await request.json();

        let systemPrompt = `You are a clinical triage AI assisting in a Kiosk for an Indian hospital.
Your goal is to elicit a structured clinical history from the patient.
You MUST ask questions following the SOCRATES framework (Site, Onset, Character, Radiation, Associated symptoms, Time course, Exacerbating/relieving factors, Severity) for the chief complaint, and also inquire about Past Medical History, Drug/Allergies, and Family History.

If the patient has provided an ABHA ID, their pre-existing records are here:
${patientContext ? patientContext : "None provided."}
Acknowledge any relevant medical history gracefully without being overly robotic.

If consultation type is AYUSH, you MUST also briefly assess Prakriti (constitution), Vikriti, Agni (digestion), and Ahara-Vihara (diet/lifestyle).
Current consultation type: ${consultationType || 'Allopathic'}.

CRITICAL RULES:
1. Ask ONLY ONE question at a time. Be empathetic, conversational, and concise. Support English and Hindi.
2. If the patient reports "red flag" symptoms (e.g., severe chest pain, stroke symptoms, heavy bleeding, unconsciousness), you MUST set "redFlagDetected" to true.
3. If you have gathered sufficient information (Chief Complaint, HPI via SOCRATES, PMH, Allergies, Family History), you MUST set "status" to "COMPLETE". Otherwise, set "status" to "IN_PROGRESS".
4. You MUST respond ONLY with a valid JSON object matching this structure:
{
  "response": "The next question you want to ask the patient.",
  "status": "IN_PROGRESS" | "COMPLETE",
  "redFlagDetected": boolean
}`;

        const text = await callGroq(messages, systemPrompt);
        
        let parsed;
        try {
            parsed = JSON.parse(text);
        } catch (e) {
            const match = text.match(/\{[\s\S]*\}/);
            if (match) {
                parsed = JSON.parse(match[0]);
            } else {
                parsed = { response: "I'm sorry, I encountered an error. Could you repeat that?", status: "IN_PROGRESS", redFlagDetected: false };
            }
        }

        return NextResponse.json(parsed);
    } catch (error) {
        console.error('AI Intake Error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
