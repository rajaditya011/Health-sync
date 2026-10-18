'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, FileText, CheckCircle, Activity, Loader2, ArrowRight } from 'lucide-react';
import { getActiveJourney, getCurrentUser, saveJourney, JourneyStep, type PatientJourney } from '@/lib/store';

export default function JourneyAIAnalysisPage() {
    const router = useRouter();
    const [journey, setJourney] = useState<PatientJourney | null>(null);
    const [status, setStatus] = useState<'analyzing' | 'done'>('analyzing');
    const [analysisSteps, setAnalysisSteps] = useState([
        { id: 1, label: 'Transcribing consultation audio', status: 'pending' },
        { id: 2, label: 'Extracting key symptoms and complaints', status: 'pending' },
        { id: 3, label: 'Cross-referencing medical history', status: 'pending' },
        { id: 4, label: 'Drafting preliminary care plan', status: 'pending' },
    ]);

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            router.push('/auth');
            return;
        }
        const j = getActiveJourney(user.id);
        if (!j) {
            router.push('/auth');
            return;
        }
        setJourney(j);

        // Simulate AI analysis steps
        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < analysisSteps.length) {
                setAnalysisSteps(prev => prev.map((s, i) => {
                    if (i === currentStep) return { ...s, status: 'done' };
                    if (i === currentStep + 1) return { ...s, status: 'active' };
                    return s;
                }));
                currentStep++;
            } else {
                clearInterval(interval);
                setTimeout(() => setStatus('done'), 500);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [router]);

    const handleContinue = () => {
        if (journey) {
            const updated = { 
                ...journey, 
                currentStep: JourneyStep.DRAFT_PLAN, 
                aiSummary: 'Patient presented with headache and fatigue. Recommended rest and hydration.',
                updatedAt: new Date().toISOString() 
            };
            saveJourney(updated);
        }
        router.push('/journey/draft-plan');
    };

    if (!journey) return null;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24, paddingBottom: 100 }}>
            
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(139, 92, 246, 0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', position: 'relative' }}>
                    <Brain size={40} style={{ color: 'var(--color-primary)' }} />
                    {status === 'analyzing' && (
                        <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid transparent', borderTopColor: 'var(--color-primary)', animation: 'rotate-slow 2s linear infinite' }} />
                    )}
                </div>
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
                    {status === 'analyzing' ? 'AI is analyzing your visit...' : 'Analysis Complete'}
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {status === 'analyzing' 
                        ? 'HealthSync AI is processing the consultation to assist your doctor.' 
                        : 'A draft care plan has been generated for your doctor\'s review.'}
                </p>
            </div>

            <div className="glass-card-static" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Processing Steps</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {analysisSteps.map((step, index) => (
                        <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: step.status === 'pending' ? 0.4 : 1 }}>
                            <div style={{ 
                                width: 24, height: 24, borderRadius: '50%', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: step.status === 'done' ? 'rgba(16, 185, 129, 0.1)' : step.status === 'active' ? 'rgba(14, 165, 233, 0.1)' : 'var(--bg-secondary)',
                                color: step.status === 'done' ? '#10B981' : step.status === 'active' ? 'var(--color-primary)' : 'var(--text-muted)'
                            }}>
                                {step.status === 'done' ? <CheckCircle size={14} /> : step.status === 'active' ? <Loader2 size={14} style={{ animation: 'rotate-slow 1s linear infinite' }} /> : index + 1}
                            </div>
                            <div style={{ flex: 1, fontSize: 15, fontWeight: step.status === 'active' ? 600 : 500, color: step.status === 'active' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                {step.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {status === 'done' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: 24, padding: 20, background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 12, display: 'flex', gap: 12 }}
                    >
                        <Activity style={{ color: '#F59E0B', flexShrink: 0 }} />
                        <div>
                            <h4 style={{ fontWeight: 700, color: '#F59E0B', marginBottom: 4 }}>Note on AI Assistance</h4>
                            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                                This analysis is for your doctor's reference only. AI does not make medical decisions or prescribe treatments. Your doctor will review and finalize the care plan.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {status === 'done' && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}
                    >
                        <button onClick={handleContinue} className="btn-primary" style={{ padding: '14px 28px', fontSize: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 32px rgba(14, 165, 233, 0.4)' }}>
                            View Draft Plan <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
