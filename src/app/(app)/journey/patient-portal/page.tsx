'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getActiveJourney, getCurrentUser, saveJourney, JourneyStep, type PatientJourney } from '@/lib/store';
import { ShieldAlert, Activity, CheckCircle, ArrowRight, BookOpen, User, Pill, HeartPulse, Settings } from 'lucide-react';
import Link from 'next/link';

export default function JourneyPatientPortalPage() {
    const router = useRouter();
    const [journey, setJourney] = useState<PatientJourney | null>(null);

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
    }, [router]);

    const handleContinue = () => {
        if (journey) {
            const updated = { 
                ...journey, 
                currentStep: JourneyStep.RECOVERY, 
                updatedAt: new Date().toISOString() 
            };
            saveJourney(updated);
        }
        router.push('/recovery');
    };

    if (!journey) return null;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24, paddingBottom: 100 }}>
            
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gradient-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24, fontWeight: 700 }}>
                    <User size={32} />
                </div>
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Patient Portal</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Your centralized hub for managing your healthcare journey.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
                
                <div className="glass-card" style={{ padding: 20 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                        <BookOpen size={20} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Care Plan</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>View your active recovery plan, verified by your doctor.</p>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: 6 }}>
                        Active
                    </span>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                        <Pill size={20} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Medications</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>Manage and track your prescribed medications.</p>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {journey.medications?.length || 0} Prescriptions
                    </span>
                </div>

                <div className="glass-card" style={{ padding: 20 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                        <HeartPulse size={20} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Vitals Tracker</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>Log your daily vitals to keep your doctor updated.</p>
                </div>

                <div className="glass-card" style={{ padding: 20, cursor: 'pointer', transition: 'all 0.2s', border: '1px solid rgba(14, 165, 233, 0.3)' }} onClick={() => router.push('/journey/medikiosk')}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                        <Activity size={20} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>MediKiosk Intake</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>Scan documents and chat with AI for a new clinical history.</p>
                </div>

            </div>

            <div className="glass-card-static" style={{ padding: 24, textAlign: 'center', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(139, 92, 246, 0.05))' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Ready to start your recovery?</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                    Head to the Recovery Command Center to track your daily progress and adhere to your care plan.
                </p>
                <button onClick={handleContinue} className="btn-primary" style={{ padding: '14px 32px', fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 32px rgba(14, 165, 233, 0.4)' }}>
                    Enter Recovery Module <ArrowRight size={20} />
                </button>
            </div>

        </div>
    );
}
