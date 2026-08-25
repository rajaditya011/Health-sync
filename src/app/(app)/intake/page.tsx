'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Mic, ArrowRight, Activity, Leaf, ShieldAlert, CheckCircle2, ChevronLeft, Send } from 'lucide-react';
import { getCurrentUser, saveIntakeSummary, generateId, type ClinicalIntakeSummary } from '@/lib/store';

type Message = {
    role: 'ai' | 'user' | 'system';
    text: string;
    options?: string[];
};

export default function IntakePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [consultationType, setConsultationType] = useState<'Allopathic' | 'AYUSH' | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [stage, setStage] = useState<'type_selection' | 'interview' | 'done'>('type_selection');
    const [redFlag, setRedFlag] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // State for building the summary
    const [summary, setSummary] = useState<Partial<ClinicalIntakeSummary>>({
        chiefComplaint: '', hpi: '', pastMedicalHistory: '', drugAllergyHistory: '',
        reviewOfSystems: '', prakriti: '', vikriti: '', agni: '', aharaVihara: '', familyHistory: '', redFlags: []
    });

    const [questionIndex, setQuestionIndex] = useState(0);

    const allopathicQuestions = [
        { key: 'chiefComplaint', text: 'What brings you in today? (Chief Complaint)', options: ['Headache', 'Chest Pain', 'Fever', 'Stomach ache', 'Cough'] },
        { key: 'hpi', text: 'When did this start and how severe is it? (Onset & Severity)', options: ['Started today', '2-3 days ago', 'More than a week', 'It is very severe'] },
        { key: 'pastMedicalHistory', text: 'Do you have any past medical history? (e.g., Diabetes, Hypertension)', options: ['None', 'Diabetes', 'Hypertension', 'Asthma'] },
        { key: 'drugAllergyHistory', text: 'Are you currently taking any medications or have any allergies?', options: ['No allergies/meds', 'Allergic to Penicillin', 'Taking blood pressure meds'] },
        { key: 'reviewOfSystems', text: 'Any other symptoms like nausea, dizziness, or fatigue?', options: ['No other symptoms', 'Fatigue', 'Nausea', 'Dizziness'] },
        { key: 'familyHistory', text: 'Any history of major illnesses in your family (e.g., genetic conditions, diabetes, heart disease)? Please also ensure you add your family members in the app so everyone stays updated on shared health risks.', options: ['No significant family history', 'Diabetes', 'Heart Disease', 'I will add my family members'] },
    ];

    const ayushQuestions = [
        { key: 'chiefComplaint', text: 'What brings you in today?', options: ['Joint Pain', 'Digestive Issues', 'Skin rash', 'Fatigue', 'Sleep issues'] },
        { key: 'prakriti', text: 'How would you describe your natural body constitution (Prakriti)?', options: ['Vata (Thin, active, dry)', 'Pitta (Medium build, warm, intense)', 'Kapha (Solid build, cool, calm)'] },
        { key: 'vikriti', text: 'What imbalances are you feeling right now (Vikriti)?', options: ['Excess heat/acidity', 'Dryness/Anxiety', 'Heaviness/Lethargy'] },
        { key: 'agni', text: 'How is your digestion (Agni)?', options: ['Strong and regular', 'Variable (sometimes gas/bloating)', 'Slow and sluggish'] },
        { key: 'aharaVihara', text: 'Describe your recent diet and lifestyle (Ahara-Vihara).', options: ['Eating healthy, active', 'Skipping meals, stressed', 'Eating heavy foods, sedentary'] },
        { key: 'familyHistory', text: 'Any history of major illnesses in your family (e.g., genetic conditions, diabetes, heart disease)? Please also ensure you add your family members in the app so everyone stays updated on shared health risks.', options: ['No significant family history', 'Diabetes', 'Heart Disease', 'I will add my family members'] },
    ];

    useEffect(() => {
        const u = getCurrentUser();
        if (!u) {
            router.push('/auth');
        } else {
            setUser(u);
        }
    }, [router]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSelectType = (type: 'Allopathic' | 'AYUSH') => {
        setConsultationType(type);
        setSummary(prev => ({ ...prev, consultationType: type }));
        setStage('interview');
        
        const firstQ = type === 'Allopathic' ? allopathicQuestions[0] : ayushQuestions[0];
        setMessages([{ role: 'ai', text: `Hello ${user?.name}. Let's get started. ` + firstQ.text, options: firstQ.options }]);
    };

    const handleSend = (text: string) => {
        if (!text.trim()) return;
        
        // Check for Red Flags
        const lowerText = text.toLowerCase();
        if (lowerText.includes('chest pain') || lowerText.includes('severe') || lowerText.includes('breathing')) {
            setRedFlag(true);
            setSummary(prev => ({ ...prev, redFlags: [...(prev.redFlags || []), 'Possible Emergency: ' + text] }));
        }

        setMessages(prev => [...prev, { role: 'user', text }]);
        setInput('');

        // Save answer to summary
        const questions = consultationType === 'Allopathic' ? allopathicQuestions : ayushQuestions;
        const currentQ = questions[questionIndex];
        setSummary(prev => ({ ...prev, [currentQ.key]: text }));

        // Next Question
        setTimeout(() => {
            if (questionIndex + 1 < questions.length) {
                const nextQ = questions[questionIndex + 1];
                setQuestionIndex(questionIndex + 1);
                setMessages(prev => [...prev, { role: 'ai', text: nextQ.text, options: nextQ.options }]);
            } else {
                setMessages(prev => [...prev, { role: 'system', text: 'Interview complete. Generating structured summary...' }]);
                setTimeout(() => setStage('done'), 1500);
            }
        }, 800);
    };

    const finishIntake = () => {
        if (!user) return;
        const finalSummary: ClinicalIntakeSummary = {
            id: generateId(),
            userId: user.id,
            date: new Date().toISOString(),
            consultationType: summary.consultationType || 'Allopathic',
            chiefComplaint: summary.chiefComplaint || '',
            hpi: summary.hpi || '',
            pastMedicalHistory: summary.pastMedicalHistory || 'None',
            drugAllergyHistory: summary.drugAllergyHistory || 'None',
            reviewOfSystems: summary.reviewOfSystems || 'Normal',
            prakriti: summary.prakriti,
            vikriti: summary.vikriti,
            agni: summary.agni,
            aharaVihara: summary.aharaVihara,
            familyHistory: summary.familyHistory,
            redFlags: summary.redFlags || [],
        };
        saveIntakeSummary(finalSummary);
        
        // Dispatch event for instant cross-tab sync if doctor portal is open
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('storage'));
        }
        
        router.push('/dashboard');
    };

    if (!user) return null;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
                    <ChevronLeft size={24} />
                </button>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>AI Clinical Intake</h1>
            </div>

            {redFlag && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} 
                    style={{ background: '#FEF2F2', border: '1px solid #EF4444', borderRadius: 12, padding: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, color: '#DC2626' }}>
                    <ShieldAlert size={24} />
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>Red Flag Detected</div>
                        <div style={{ fontSize: 13, marginTop: 2 }}>Your symptoms suggest a possible emergency. Triage desk has been notified.</div>
                    </div>
                </motion.div>
            )}

            <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                
                {stage === 'type_selection' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Select Consultation Type</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 32, textAlign: 'center' }}>Choose the type of assessment you prefer for today's visit.</p>
                        
                        <div style={{ display: 'flex', gap: 20, width: '100%', maxWidth: 500 }}>
                            <button onClick={() => handleSelectType('Allopathic')} style={{ flex: 1, background: 'var(--bg-card)', border: '2px solid var(--border-color)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.2s' }}>
                                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', color: '#0EA5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Activity size={32} />
                                </div>
                                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>Allopathic (Standard)</span>
                            </button>
                            
                            <button onClick={() => handleSelectType('AYUSH')} style={{ flex: 1, background: 'var(--bg-card)', border: '2px solid var(--border-color)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.2s' }}>
                                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Leaf size={32} />
                                </div>
                                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>AYUSH (Ayurvedic)</span>
                            </button>
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
                            <button 
                                onClick={() => setIsListening(!isListening)}
                                style={{ 
                                    width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer',
                                    background: isListening ? '#EF4444' : 'var(--bg-body)', color: isListening ? 'white' : 'var(--text-secondary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                                    boxShadow: isListening ? '0 0 0 4px rgba(239, 68, 68, 0.2)' : 'none'
                                }}>
                                <Mic size={20} />
                            </button>
                            <input 
                                value={input} onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                                placeholder="Type or speak your answer..."
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
                        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>History Structured & Saved!</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 400 }}>Your clinical history has been digitized, structured, and securely sent to your doctor's portal via ABDM standards.</p>
                        <button onClick={finishIntake} className="btn-primary" style={{ padding: '12px 32px', fontSize: 16 }}>
                            Return to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
