import { NextRequest, NextResponse } from 'next/server';

const SAMBANOVA_API_KEY = process.env.SAMBANOVA_API_KEY || '';

const GROQ_KEYS = [
    process.env.GROQ_API_KEY_1 || '',
    process.env.GROQ_API_KEY_2 || '',
].filter(Boolean);

const GROQ_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];

export async function POST(request: NextRequest) {
    try {
        const { imageData, prompt, userContext } = await request.json();

        const systemPrompt = `You are HealthSync Vision AI — a medical image analysis assistant. You analyze medical images (reports, prescriptions, test results, skin conditions, X-rays, etc.) and provide:

1. **Description**: What you see in the image
2. **Key Findings**: Important observations and values
3. **Abnormalities**: Any abnormal values or concerning patterns
4. **Recommendations**: Next steps the patient should take
5. **Urgency**: Assessment level (Green = routine / Amber = needs attention / Red = urgent)

CRITICAL RULES:
- NEVER provide a definitive diagnosis. Use "This may indicate..." or "This could suggest..."
- ALWAYS recommend consulting a qualified doctor for confirmation
- Be empathetic and clear in your language
- If the image quality is poor or unclear, say so honestly
- When prescriptions are in the image, extract all medicine names, dosages, and frequencies
- Reference the patient's existing health context when available

${userContext || ''}`;

        // 1. Try SambaNova if API key is provided
        if (SAMBANOVA_API_KEY) {
            try {
                const messages: { role: string; content: string | { type: string; text?: string; image_url?: { url: string } }[] }[] = [
                    { role: 'system', content: systemPrompt },
                ];

                if (imageData) {
                    messages.push({
                        role: 'user',
                        content: [
                            { type: 'text', text: prompt || 'Please analyze this medical image and provide your observations.' },
                            { type: 'image_url', image_url: { url: imageData } },
                        ],
                    });
                } else {
                    messages.push({ role: 'user', content: prompt || 'No image provided.' });
                }

                const response = await fetch('https://api.sambanova.ai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${SAMBANOVA_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: 'Llama-3.2-90B-Vision-Instruct',
                        messages,
                        max_tokens: 2048,
                        temperature: 0.3,
                    }),
                });

                const data = await response.json();
                if (!data.error && data.choices?.[0]?.message?.content) {
                    return NextResponse.json({ response: data.choices[0].message.content });
                }
            } catch (sambanovaErr) {
                console.warn('SambaNova Vision call failed, falling back to OCR + Groq analysis:', sambanovaErr);
            }
        }

        // 2. Clinical Evaluation using Groq AI
        const groqPrompt = `The user submitted a medical image or test for visual clinical evaluation.
User Prompt / Note: "${prompt || 'Medical visual evaluation requested.'}"
${userContext ? `Patient Context: ${userContext}` : ''}

Please provide a structured clinical assessment covering:
1. Potential observations or conditions associated with this type of presentation
2. Critical red flag symptoms that necessitate urgent or immediate medical attention
3. Recommended specialist doctor to consult (e.g. Dermatologist, Radiologist, General Physician)
4. Practical care tips, lifestyle guidance, and questions the patient should ask their doctor during consultation.`;

        for (const model of GROQ_MODELS) {
            for (const key of GROQ_KEYS) {
                try {
                    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${key}`,
                        },
                        body: JSON.stringify({
                            model,
                            messages: [
                                { role: 'system', content: systemPrompt },
                                { role: 'user', content: groqPrompt },
                            ],
                            temperature: 0.3,
                            max_completion_tokens: 2048,
                        }),
                    });

                    const data = await groqRes.json();
                    if (!data.error && data.choices?.[0]?.message?.content) {
                        return NextResponse.json({ response: data.choices[0].message.content });
                    }
                } catch (err) {
                    console.error('Groq vision fallback error:', err);
                }
            }
        }

        return NextResponse.json({ 
            response: '### 🩺 Visual Assessment Summary\n\n- **Status**: The uploaded image was received.\n- **Recommendation**: For clinical verification, please consult a healthcare professional.\n- **Follow-up**: If you are experiencing acute symptoms, please utilize the Emergency SOS feature immediately.' 
        });
    } catch (error) {
        console.error('Vision AI Error:', error);
        return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 });
    }
}
