'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getActiveJourney, getCurrentUser, saveJourney, JourneyStep, type PatientJourney } from '@/lib/store';
import { ShieldAlert, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function JourneyDoctorApprovalPage() {
    const router = useRouter();
    const [journey, setJourney] = useState<PatientJourney | null>(null);
    const [status, setStatus] = useState<'waiting' | 'approved'>('waiting');

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

        // Simulate doctor approval after 4 seconds
        const timer = setTimeout(() => {
            setStatus('approved');
        }, 4000);

        return () => clearTimeout(timer);
    }, [router]);

    const handleContinue = () => {
        if (journey) {
            const updated = { 
                ...journey, 
                currentStep: JourneyStep.PATIENT_PORTAL, 
                verified: true, // Officially verified by doctor
                updatedAt: new Date().toISOString() 
            };
            saveJourney(updated);
        }
        router.push('/journey/patient-portal');
    };

    if (!journey) return null;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            
            <AnimatePresence mode="wait">
                {status === 'waiting' ? (
                    <motion.div 
                        key="waiting"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{ textAlign: 'center' }}
                    >
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', position: 'relative' }}>
                            <ShieldAlert size={40} />
                            <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#F59E0B', animation: 'rotate-slow 2s linear infinite' }} />
                        </div>
                        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Waiting for Doctor's Approval</h1>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto' }}>
                            Your draft care plan has been securely sent to the doctor. They are reviewing it now and will make any necessary adjustments before activating it.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="approved"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center', width: '100%', maxWidth: 500 }}
                    >
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <CheckCircle2 size={40} />
                        </div>
                        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Care Plan Approved!</h1>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
                            The doctor has reviewed and finalized your recovery plan. It is now active.
                        </p>
                        
                        <div className="glass-card-static" style={{ padding: 24, textAlign: 'left', marginBottom: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--gradient-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>
                                    D
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 16 }}>Doctor's Note</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Just now</div>
                                </div>
                            </div>
                            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                "I've reviewed the AI suggestions and they look good. I've adjusted the dosage slightly on your medication. Please follow the timeline and rest up."
                            </p>
                        </div>

                        <button onClick={handleContinue} className="btn-primary" style={{ padding: '14px 32px', fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)', background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                            Go to Patient Portal <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
