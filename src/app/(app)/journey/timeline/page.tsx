'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getActiveJourney, getCurrentUser, saveJourney, JourneyStep, type PatientJourney } from '@/lib/store';
import { ArrowRight, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function JourneyTimelinePage() {
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
            const updated = { ...journey, currentStep: JourneyStep.BOOKING, updatedAt: new Date().toISOString() };
            saveJourney(updated);
        }
        router.push('/journey/booking');
    };

    if (!journey) return null;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24, paddingBottom: 100 }}>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>Summary of Your Visit</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
                    Here is a quick overview of what we have gathered. This will be sent to your doctor for review.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                
                {/* Reason for Visit */}
                <div className="glass-card-static" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            1
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 700 }}>Primary Reason</h3>
                    </div>
                    <div style={{ paddingLeft: 44, color: 'var(--text-primary)', fontSize: 15 }}>
                        {journey.reasonForVisit || 'Not specified'}
                    </div>
                </div>

                {/* Intake Answers */}
                {journey.intakeAnswers && Object.keys(journey.intakeAnswers).length > 0 && (
                    <div className="glass-card-static" style={{ padding: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                2
                            </div>
                            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Medical History ({journey.pathway})</h3>
                        </div>
                        <div style={{ paddingLeft: 44, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {Object.entries(journey.intakeAnswers).map(([key, value]) => (
                                <div key={key}>
                                    <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)' }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                    <div style={{ fontSize: 15 }}>{String(value)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Kiosk Data */}
                {journey.kioskData && (
                    <div className="glass-card-static" style={{ padding: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CheckCircle2 size={16} />
                            </div>
                            <h3 style={{ fontSize: 16, fontWeight: 700 }}>MediKiosk Vitals</h3>
                        </div>
                        <div style={{ paddingLeft: 44, display: 'flex', gap: 24 }}>
                            <div>
                                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)' }}>BP:</span>
                                <div style={{ fontSize: 15 }}>{journey.kioskData.bp}</div>
                            </div>
                            <div>
                                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)' }}>Temp:</span>
                                <div style={{ fontSize: 15 }}>{journey.kioskData.temp}°F</div>
                            </div>
                            <div>
                                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)' }}>HR:</span>
                                <div style={{ fontSize: 15 }}>{journey.kioskData.hr} bpm</div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}>
                <button onClick={handleContinue} className="btn-primary" style={{ padding: '14px 28px', fontSize: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 32px rgba(14, 165, 233, 0.4)' }}>
                    Book a Doctor <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
