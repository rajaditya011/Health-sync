'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mic, Upload, CheckCircle, FileText, Loader2, ArrowRight, User, Stethoscope, X } from 'lucide-react';
import { generateId, saveIntakeSummary, ClinicalIntakeSummary, getCurrentUser } from '@/lib/store';
import { getPatientByAbhaId, AbhaPatient } from '@/lib/abhaDb';

type KioskStep = 'START' | 'CONSENT' | 'CONVERSE' | 'SCAN' | 'SUMMARIZE' | 'COMPLETE';

export default function KioskPage() {
    const [step, setStep] = useState<KioskStep>('START');
    const [patientId, setPatientId] = useState('');
    const [abhaId, setAbhaId] = useState('');

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setPatientId(currentUser.id);
        }
    }, []);
    const [patientContext, setPatientContext] = useState<AbhaPatient | null>(null);
    const [consultationType, setConsultationType] = useState<'Allopathic' | 'AYUSH'>('Allopathic');
    
    // Chat state
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const [intakeComplete, setIntakeComplete] = useState(false);
    
    // Document state
    const [documents, setDocuments] = useState<{ name: string; text: string }[]>([]);
    const [uploading, setUploading] = useState(false);
    
    // Summary state
    const [summaryLoading, setSummaryLoading] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-IN';

            recognitionRef.current.onresult = (event: any) => {
                const text = event.results[0][0].transcript;
                setInputValue(text);
                setIsListening(false);
            };

            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            setInputValue('');
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const handleStart = () => setStep('CONSENT');

    const handleConsent = () => {
        const foundPatient = getPatientByAbhaId(abhaId);
        if (foundPatient) {
            setPatientContext(foundPatient);
            setMessages([{ role: 'ai', content: `Hello ${foundPatient.name}! I am your AI Intake Assistant. I see from your ABHA records you are blood group ${foundPatient.bloodGroup}${foundPatient.medicalHistory ? ` and have a history of ${foundPatient.medicalHistory}` : ''}. Could you please tell me what brings you to the hospital today?` }]);
        } else {
            setMessages([{ role: 'ai', content: "Hello! I am your AI Intake Assistant. Could you please tell me what brings you to the hospital today?" }]);
        }
        setStep('CONVERSE');
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() || chatLoading) return;
        
        const newMessages = [...messages, { role: 'user' as const, content: inputValue }];
        setMessages(newMessages);
        setInputValue('');
        setChatLoading(true);

        try {
            const res = await fetch('/api/ai/intake', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    messages: newMessages, 
                    consultationType,
                    patientContext: patientContext ? JSON.stringify(patientContext) : undefined 
                })
            });
            const data = await res.json();
            
            if (data.error || !data.response) {
                throw new Error(data.error || 'Failed to get response');
            }
            
            setMessages([...newMessages, { role: 'ai', content: data.response }]);
            if (data.status === 'COMPLETE') {
                setIntakeComplete(true);
            }
        } catch (e) {
            setMessages([...newMessages, { role: 'ai', content: "I'm sorry, I had trouble processing that. Could you repeat?" }]);
        } finally {
            setChatLoading(false);
        }
    };

    const extractTextFromFile = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            if (file.type.startsWith('image/') || file.type === 'application/pdf') {
                reader.onload = (e) => {
                    const base64 = e.target?.result as string;
                    resolve(`[BASE64]${base64.split(',')[1] || base64}[/BASE64]\nFile: ${file.name}`);
                };
                reader.readAsDataURL(file);
            } else {
                reader.onload = (e) => resolve(e.target?.result as string || '');
                reader.readAsText(file);
            }
        });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setUploading(true);
        try {
            const text = await extractTextFromFile(file);
            setDocuments(prev => [...prev, { name: file.name, text: text.substring(0, 3000) }]);
        } catch (err) {
            console.error(err);
        }
        setUploading(false);
    };

    const finishScanning = async () => {
        setStep('SUMMARIZE');
        setSummaryLoading(true);

        const transcript = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
        
        try {
            const res = await fetch('/api/ai/summarize-intake', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    transcript, 
                    documents, 
                    consultationType,
                    patientContext: patientContext ? JSON.stringify(patientContext) : undefined 
                })
            });
            const summary = await res.json();

            // Save to store
            const currentUser = getCurrentUser();
            const finalSummary: ClinicalIntakeSummary = {
                id: generateId(),
                userId: patientId, 
                patientName: patientContext?.name || currentUser?.name || 'Unknown',
                abhaId: patientContext?.abhaId,
                date: new Date().toISOString(),
                consultationType,
                transcript,
                ...summary,
            };
            saveIntakeSummary(finalSummary);
            setStep('COMPLETE');

            // Auto-reset kiosk after 5 seconds
            setTimeout(() => {
                resetKiosk();
            }, 5000);
            
        } catch (err) {
            console.error(err);
            alert("Failed to generate summary.");
            setStep('SCAN'); // Go back on error
        }
        setSummaryLoading(false);
    };

    const resetKiosk = () => {
        setAbhaId('');
        setPatientContext(null);
        setMessages([]);
        setDocuments([]);
        setIntakeComplete(false);
        setStep('START');
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-default)' }}>
            {/* Header */}
            <div style={{ padding: '20px 40px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Stethoscope size={28} style={{ color: 'var(--color-primary)' }} />
                    <h1 style={{ fontSize: 24, fontWeight: 800 }}>MediKiosk</h1>
                </div>
                {step !== 'START' && (
                    <button onClick={resetKiosk} className="btn-secondary" style={{ padding: '8px 16px', fontSize: 14 }}>
                        <X size={16} style={{ marginRight: 6 }} /> Cancel Session
                    </button>
                )}
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                
                {step === 'START' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: 60, textAlign: 'center', maxWidth: 600 }}>
                        <User size={64} style={{ color: 'var(--color-primary)', margin: '0 auto 24px', opacity: 0.8 }} />
                        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Welcome to MediKiosk</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 18, marginBottom: 40 }}>
                            Automated Clinical History & Document Digitization.
                        </p>
                        <button onClick={handleStart} className="btn-primary" style={{ padding: '16px 48px', fontSize: 20 }}>
                            Tap to Start Intake <ArrowRight size={20} style={{ marginLeft: 8 }} />
                        </button>
                    </motion.div>
                )}

                {step === 'CONSENT' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: 40, maxWidth: 600, width: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 32 }}>
                            <ShieldCheck size={48} style={{ color: '#10B981', margin: '0 auto 16px' }} />
                            <h2 style={{ fontSize: 24, fontWeight: 700 }}>Patient Identification & Consent</h2>
                        </div>
                        
                        <div style={{ marginBottom: 24 }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Enter ABHA ID or Mobile Number</label>
                            <input 
                                type="text" 
                                className="input-field" 
                                value={abhaId}
                                onChange={e => setAbhaId(e.target.value)}
                                placeholder="e.g., 91-XXXX-XXXX-XXXX"
                                style={{ width: '100%', padding: 16, fontSize: 18 }}
                            />
                        </div>

                        <div style={{ marginBottom: 24 }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Consultation Type</label>
                            <select className="input-field" style={{ width: '100%', padding: 16, fontSize: 18 }} value={consultationType} onChange={e => setConsultationType(e.target.value as any)}>
                                <option value="Allopathic">Allopathic / Modern Medicine</option>
                                <option value="AYUSH">AYUSH (Ayurveda, Yoga, etc.)</option>
                            </select>
                        </div>

                        <div style={{ padding: 16, background: 'rgba(16, 185, 129, 0.1)', borderRadius: 12, border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: 32, fontSize: 14, color: 'var(--text-secondary)' }}>
                            <p style={{ marginBottom: 8 }}><strong>Consent Declaration:</strong> By proceeding, I consent to the capture of my clinical history via AI and the scanning of my medical documents. I understand this data will be securely pushed to my hospital record as per the DPDP Act 2023.</p>
                        </div>

                        <button onClick={handleConsent} className="btn-primary" style={{ width: '100%', padding: 16, fontSize: 18 }} disabled={!abhaId}>
                            I Agree & Continue
                        </button>
                    </motion.div>
                )}

                {step === 'CONVERSE' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ maxWidth: 800, width: '100%', height: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Clinical Interview</h2>
                            {intakeComplete && (
                                <button onClick={() => setStep('SCAN')} className="btn-primary" style={{ padding: '8px 16px' }}>
                                    Proceed to Document Scan <ArrowRight size={16} style={{ marginLeft: 6 }} />
                                </button>
                            )}
                        </div>
                        
                        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {messages.map((m, i) => (
                                <div key={i} style={{
                                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                                    background: m.role === 'user' ? 'var(--color-primary)' : 'var(--bg-card)',
                                    color: m.role === 'user' ? '#fff' : 'var(--text-primary)',
                                    border: m.role === 'user' ? 'none' : '1px solid var(--border-color)',
                                    padding: '16px 20px',
                                    borderRadius: 16,
                                    maxWidth: '80%',
                                    fontSize: 16,
                                    lineHeight: 1.5,
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    {m.content}
                                </div>
                            ))}
                            {chatLoading && (
                                <div style={{ alignSelf: 'flex-start', padding: '16px 20px', borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                    <Loader2 className="spinner" size={20} style={{ color: 'var(--color-primary)' }} />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div style={{ padding: 20, borderTop: '1px solid var(--border-color)', display: 'flex', gap: 12 }}>
                            <button onClick={toggleListening} className="btn-secondary" style={{ padding: '0 20px', background: isListening ? 'rgba(239, 68, 68, 0.1)' : undefined, color: isListening ? '#EF4444' : undefined, borderColor: isListening ? 'rgba(239, 68, 68, 0.3)' : undefined }}>
                                <Mic size={24} className={isListening ? 'pulse' : ''} />
                            </button>
                            <input 
                                type="text" 
                                className="input-field" 
                                placeholder={isListening ? "Listening..." : "Type your response..."}
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                                style={{ flex: 1, padding: 16, fontSize: 16 }}
                            />
                            <button onClick={handleSendMessage} className="btn-primary" style={{ padding: '0 24px' }} disabled={!inputValue.trim() || chatLoading}>
                                <ArrowRight size={24} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 'SCAN' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: 40, maxWidth: 600, width: '100%', textAlign: 'center' }}>
                        <FileText size={48} style={{ color: 'var(--color-primary)', margin: '0 auto 16px' }} />
                        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Scan Prior Documents</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Upload any existing prescriptions, lab reports, or discharge summaries to attach them to your history.</p>

                        <div 
                            style={{ padding: 40, border: '2px dashed var(--color-primary)', borderRadius: 16, background: 'rgba(14, 165, 233, 0.05)', marginBottom: 24, cursor: 'pointer' }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.png" onChange={handleFileUpload} style={{ display: 'none' }} />
                            {uploading ? <Loader2 size={32} className="spinner" style={{ margin: '0 auto 12px' }} /> : <Upload size={32} style={{ margin: '0 auto 12px', color: 'var(--color-primary)' }} />}
                            <h3 style={{ fontWeight: 600 }}>{uploading ? 'Scanning Document...' : 'Tap to Upload Document'}</h3>
                        </div>

                        {documents.length > 0 && (
                            <div style={{ textAlign: 'left', marginBottom: 24 }}>
                                <h4 style={{ fontWeight: 600, marginBottom: 12 }}>Scanned Documents:</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {documents.map((d, i) => (
                                        <div key={i} style={{ padding: 12, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <FileText size={16} style={{ color: 'var(--text-muted)' }} /> {d.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button onClick={finishScanning} className="btn-primary" style={{ width: '100%', padding: 16, fontSize: 18 }}>
                            Generate Clinical Summary <ArrowRight size={20} style={{ marginLeft: 8 }} />
                        </button>
                    </motion.div>
                )}

                {step === 'SUMMARIZE' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <Loader2 size={40} className="spinner" style={{ color: 'var(--color-primary)' }} />
                        </div>
                        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Synthesizing Clinical History</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>AI is organizing your conversation and documents into a physician-ready timeline...</p>
                    </motion.div>
                )}

                {step === 'COMPLETE' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: 60, textAlign: 'center', maxWidth: 600 }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <CheckCircle size={40} style={{ color: '#10B981' }} />
                        </div>
                        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Intake Complete!</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 18, marginBottom: 32 }}>
                            Your structured clinical history and digitized documents have been securely forwarded to your doctor.
                        </p>
                        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                            This session will automatically clear in a few seconds to protect your privacy. Please proceed to the waiting room.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
