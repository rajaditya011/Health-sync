'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Mic, ArrowRight, Activity, Leaf, ShieldAlert, CheckCircle2, ChevronLeft, Send, PhoneCall } from 'lucide-react';
import { getCurrentUser, getActiveJourney, saveJourney, JourneyStep, type PatientJourney } from '@/lib/store';

type Message = {
    role: 'ai' | 'user' | 'system';
    text: string;
    options?: string[];
};

export default function IntakePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [journey, setJourney] = useState<PatientJourney | null>(null);
    const [consultationType, setConsultationType] = useState<'Allopathic' | 'AYUSH' | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [stage, setStage] = useState<'type_selection' | 'interview' | 'done'>('type_selection');
    const [redFlag, setRedFlag] = useState(false);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [questionIndex, setQuestionIndex] = useState(0);

    const allopathicQuestions = [
        { key: 'symptoms', text: 'Please describe your symptoms in detail.', options: ['Headache', 'Chest Pain', 'Fever', 'Stomach ache', 'Cough'] },
        { key: 'duration', text: 'When did this start and how severe is it?', options: ['Started today', '2-3 days ago', 'More than a week', 'Very severe'] },
        { key: 'pastHistory', text: 'Do you have any past medical history? (e.g., Diabetes, Hypertension)', options: ['None', 'Diabetes', 'Hypertension', 'Asthma'] },
        { key: 'medications', text: 'Are you currently taking any medications or have any allergies?', options: ['No allergies/meds', 'Allergic to Penicillin', 'Taking blood pressure meds'] },
        { key: 'lifestyle', text: 'Any other relevant lifestyle information? (Smoking, alcohol, diet)?', options: ['None', 'Smoker', 'Occasional alcohol'] }
    ];

    const ayushQuestions = [
        { key: 'symptoms', text: 'Please describe your symptoms in detail.', options: ['Joint Pain', 'Digestive Issues', 'Skin rash', 'Fatigue', 'Sleep issues'] },
        { key: 'prakriti', text: 'How would you describe your natural body constitution (Prakriti)?', options: ['Vata (Thin, active, dry)', 'Pitta (Medium build, warm, intense)', 'Kapha (Solid build, cool, calm)'] },
        { key: 'vikriti', text: 'What imbalances are you feeling right now (Vikriti)?', options: ['Excess heat/acidity', 'Dryness/Anxiety', 'Heaviness/Lethargy'] },
        { key: 'agni', text: 'How is your digestion (Agni)?', options: ['Strong and regular', 'Variable (sometimes gas/bloating)', 'Slow and sluggish'] },
        { key: 'aharaVihara', text: 'Describe your recent diet and lifestyle (Ahara-Vihara).', options: ['Eating healthy, active', 'Skipping meals, stressed', 'Eating heavy foods, sedentary'] },
    ];

    useEffect(() => {
        const u = getCurrentUser();
        if (!u) {
            router.push('/auth');
            return;
        }
        setUser(u);
        const j = getActiveJourney(u.id);
        if (!j) {
            router.push('/auth');
            return;
        }
        setJourney(j);
        
        // If reason for visit implies uncertainty, we could recommend Digital Twin here
        // If known issue, MediKiosk
    }, [router]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSelectType = (type: 'Allopathic' | 'AYUSH') => {
        setConsultationType(type);
        setStage('interview');
        
        const firstQ = type === 'Allopathic' ? allopathicQuestions[0] : ayushQuestions[0];
        let introText = `Hello ${user?.name}. `;
        if (journey?.reasonForVisit) {
            introText += `I see you are here for: ${journey.reasonForVisit}. `;
        }
        setMessages([{ role: 'ai', text: introText + firstQ.text, options: firstQ.options }]);
    };

    const handleSend = (text: string) => {
        if (!text.trim()) return;
        
        // Check for Red Flags
        const lowerText = text.toLowerCase();
        if (lowerText.includes('chest pain') || lowerText.includes('severe bleeding') || lowerText.includes('breathing') || lowerText.includes('stroke') || lowerText.includes('heart attack') || lowerText.includes('unconscious')) {
            setRedFlag(true);
            if (journey) {
                const updatedJourney = { ...journey, redFlagDetected: true, currentStep: JourneyStep.EMERGENCY };
                saveJourney(updatedJourney);
            }
            return;
        }

        setMessages(prev => [...prev, { role: 'user', text }]);
        setInput('');

        const questions = consultationType === 'Allopathic' ? allopathicQuestions : ayushQuestions;
        const currentQ = questions[questionIndex];
        
        setAnswers(prev => ({ ...prev, [currentQ.key]: text }));

        setTimeout(() => {
            if (questionIndex + 1 < questions.length) {
                const nextQ = questions[questionIndex + 1];
                setQuestionIndex(questionIndex + 1);
                setMessages(prev => [...prev, { role: 'ai', text: nextQ.text, options: nextQ.options }]);
            } else {
                setMessages(prev => [...prev, { role: 'system', text: 'Intake complete. Saving information...' }]);
                setTimeout(() => setStage('done'), 1500);
            }
        }, 800);
    };

    const handleEmergencyExit = () => {
        router.push('/emergency');
    };

    const finishIntake = () => {
        if (!journey) return;
        const updatedJourney = { 
            ...journey, 
            pathway: consultationType || undefined,
            intakeAnswers: answers,
            currentStep: JourneyStep.REPORTS,
            updatedAt: new Date().toISOString()
        };
        saveJourney(updatedJourney);
        router.push('/journey/reports');
    };

    if (!user || !journey) return null;

    if (redFlag) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#FEF2F2' }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ maxWidth: 500, background: 'white', padding: 40, borderRadius: 24, textAlign: 'center', boxShadow: '0 20px 40px rgba(220, 38, 38, 0.15)', border: '2px solid #DC2626' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <ShieldAlert size={40} />
                    </div>
                    <h1 style={{ fontSize: 28, fontWeight: 800, color: '#991B1B', marginBottom: 16 }}>Emergency Detected</h1>
                    <p style={{ fontSize: 16, color: '#7F1D1D', marginBottom: 32, lineHeight: 1.6 }}>
                        Based on your responses, you may need urgent medical attention. Normal consultation flow has been suspended. Please seek immediate help.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <button className="btn-primary" style={{ background: '#DC2626', fontSize: 18, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                            <PhoneCall size={24} /> Call Emergency (112)
                        </button>
                        <button onClick={handleEmergencyExit} style={{ background: 'transparent', border: '1px solid #DC2626', color: '#DC2626', fontSize: 16, padding: 16, borderRadius: 12, cursor: 'pointer', fontWeight: 600 }}>
                            Exit Consultation
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>Medical History Intake</h1>
            </div>

            <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                
                {stage === 'type_selection' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Select Pathway</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 32, textAlign: 'center' }}>Choose the medical approach you prefer.</p>
                        
                        <div style={{ display: 'flex', gap: 20, width: '100%', maxWidth: 500 }}>
                            <button onClick={() => handleSelectType('Allopathic')} style={{ flex: 1, background: 'var(--bg-card)', border: '2px solid var(--border-color)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.2s' }}>
                                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', color: '#0EA5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Activity size={32} />
                                </div>
                                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>Allopathic</span>
                            </button>
                            
                            <button onClick={() => handleSelectType('AYUSH')} style={{ flex: 1, background: 'var(--bg-card)', border: '2px solid var(--border-color)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.2s' }}>
                                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Leaf size={32} />
                                </div>
                                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>AYUSH</span>
                            </button>
                        </div>
                        
                        {/* Optional entry point for Digital Twin or MediKiosk */}
                        <div style={{ marginTop: 40, borderTop: '1px solid var(--border-color)', paddingTop: 24, width: '100%', maxWidth: 500, textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Unsure about your symptoms or know your issue already?</p>
                            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                                <button onClick={() => router.push('/journey/digital-twin')} className="btn-secondary" style={{ fontSize: 14, padding: '10px 16px' }}>Try Digital Twin</button>
                                <button onClick={() => router.push('/journey/medikiosk')} className="btn-secondary" style={{ fontSize: 14, padding: '10px 16px' }}>Use MediKiosk</button>
                            </div>
                        </div>
                    </div>
                )}

                {stage === 'interview' && (
                    <>
                        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <AnimatePresence>
                                {messages.map((m, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : m.role === 'system' ? 'center' : 'flex-start' }}>
                                        
                                        {m.role === 'system' ? (
                                            <div style={{ background: 'var(--bg-body)', padding: '6px 12px', borderRadius: 12, fontSize: 12, color: 'var(--text-muted)' }}>
                                                {m.text}
                                            </div>
                                        ) : (
                                            <div style={{ 
                                                background: m.role === 'user' ? 'var(--color-primary)' : 'var(--bg-body)',
                                                color: m.role === 'user' ? 'white' : 'var(--text-primary)',
                                                padding: '12px 16px', borderRadius: 16, maxWidth: '80%',
                                                borderBottomRightRadius: m.role === 'user' ? 4 : 16,
                                                borderBottomLeftRadius: m.role === 'ai' ? 4 : 16,
                                                fontSize: 15, lineHeight: 1.4
                                            }}>
                                                {m.text}
                                            </div>
                                        )}

                                        {m.options && m.role === 'ai' && (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12, maxWidth: '90%' }}>
                                                {m.options.map((opt, j) => (
                                                    <button key={j} onClick={() => handleSend(opt)} style={{
                                                        background: 'var(--bg-card)', border: '1px solid var(--color-primary)', color: 'var(--color-primary)',
                                                        padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer'
                                                    }}>
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        <div style={{ padding: 16, borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <input 
                                value={input} onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                                placeholder="Type your answer..."
                                style={{ flex: 1, background: 'var(--bg-body)', border: '1px solid var(--border-color)', borderRadius: 24, padding: '12px 20px', fontSize: 15, color: 'var(--text-primary)', outline: 'none' }}
                            />
                            <button onClick={() => handleSend(input)} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <Send size={18} />
                            </button>
                        </div>
                    </>
                )}

                {stage === 'done' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>History Saved</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 400 }}>Your history has been securely saved to your active journey.</p>
                        <button onClick={finishIntake} className="btn-primary" style={{ padding: '12px 32px', fontSize: 16 }}>
                            Continue to Reports <ArrowRight size={18} style={{ marginLeft: 8 }} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
