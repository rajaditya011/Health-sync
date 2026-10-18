'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getActiveJourney, getCurrentUser, saveJourney, JourneyStep, type PatientJourney } from '@/lib/store';
import { Activity, Calendar, Pill, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

export default function JourneyDraftPlanPage() {
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
            const updated = { ...journey, currentStep: JourneyStep.DOCTOR_APPROVAL, updatedAt: new Date().toISOString() };
            saveJourney(updated);
        }
        router.push('/journey/doctor-approval');
    };

    if (!journey) return null;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24, paddingBottom: 100 }}>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>Draft Care Plan</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
                    HealthSync AI has generated this preliminary care plan based on your consultation.
                </p>
                <div style={{ 
                    marginTop: 12, padding: '12px 16px', borderRadius: 8, 
                    background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', 
                    fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 
                }}>
                    <AlertTriangle size={16} /> Pending Doctor Approval
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                
                {/* AI Summary */}
                <div className="glass-card-static" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Activity size={18} style={{ color: 'var(--color-primary)' }} /> Consultation Summary
                    </h3>
                    <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
                        {journey.aiSummary || 'AI Summary not available.'}
                    </p>
                </div>

                {/* Medications */}
                <div className="glass-card-static" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Pill size={18} style={{ color: 'var(--color-primary)' }} /> Suggested Medications
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {journey.medications && journey.medications.length > 0 ? journey.medications.map((med: any, i: number) => (
                            <div key={med.id || i} style={{ 
                                padding: 16, borderRadius: 12, border: '1px solid var(--border-color)',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 15 }}>{med.name}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>{med.dosage} • {med.frequency}</div>
                                </div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {med.time?.map((t: string, j: number) => (
                                        <span key={j} style={{ padding: '4px 10px', background: 'var(--bg-secondary)', borderRadius: 12, fontSize: 12, fontWeight: 500 }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )) : (
                            <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>No medications suggested.</div>
                        )}
                    </div>
                </div>

                {/* Timeline */}
                <div className="glass-card-static" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Calendar size={18} style={{ color: 'var(--color-primary)' }} /> Recovery Timeline
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {journey.timeline && journey.timeline.length > 0 ? journey.timeline.map((step: any, i: number) => (
                            <div key={step.id || i} style={{ display: 'flex', gap: 16 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ 
                                        width: 28, height: 28, borderRadius: '50%', 
                                        background: 'rgba(14, 165, 233, 0.1)', 
                                        color: 'var(--color-primary)', 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: 12
                                    }}>
                                        D{step.day}
                                    </div>
                                    {journey.timeline && i < journey.timeline.length - 1 && (
                                        <div style={{ width: 2, flex: 1, background: 'var(--border-color)', margin: '4px 0' }} />
                                    )}
                                </div>
                                <div style={{ flex: 1, paddingBottom: 16 }}>
                                    <div style={{ fontWeight: 600, fontSize: 15 }}>{step.title}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>{step.description}</div>
                                </div>
                            </div>
                        )) : (
                            <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>No timeline steps suggested.</div>
                        )}
                    </div>
                </div>

            </div>

            <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}>
                <button onClick={handleContinue} className="btn-primary" style={{ padding: '14px 28px', fontSize: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 32px rgba(14, 165, 233, 0.4)' }}>
                    Send to Doctor for Approval <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
