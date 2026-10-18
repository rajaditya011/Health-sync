'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
    getJourneys, 
    setJourneys, 
    getAllUsers, 
    type HealthJourney, 
    type UserProfile 
} from '@/lib/store';
import { 
    CheckCircle, 
    AlertTriangle, 
    Activity, 
    Pill, 
    Clock, 
    Check, 
    ArrowLeft,
    Calendar,
    Thermometer,
    HeartPulse,
    ListChecks
} from 'lucide-react';

export default function DoctorCaseApprovalPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [journey, setJourney] = useState<HealthJourney | null>(null);
    const [patient, setPatient] = useState<UserProfile | null>(null);
    const [editedJourney, setEditedJourney] = useState<HealthJourney | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!id) return;
        const allJourneys = getJourneys();
        const j = allJourneys.find(j => j.id === id);
        if (j) {
            setJourney(j);
            setEditedJourney(j);
            const allUsers = getAllUsers();
            setPatient(allUsers.find(u => u.id === j.userId) || null);
        }
    }, [id]);

    const handleApprove = () => {
        if (!editedJourney) return;
        setIsSaving(true);
        
        const allJourneys = getJourneys();
        const updatedJourneys = allJourneys.map(j => 
            j.id === editedJourney.id ? { ...editedJourney, verified: true } : j
        );
        
        setJourneys(updatedJourneys);
        
        setTimeout(() => {
            router.push('/doctor-dashboard');
        }, 1000);
    };

    const handleEditNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (editedJourney) {
            setEditedJourney({ ...editedJourney, doctorNotes: e.target.value });
        }
    };

    if (!journey || !editedJourney) return <div style={{ padding: 40, textAlign: 'center' }}>Loading case...</div>;

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: 60 }}>
            
            <button 
                onClick={() => router.back()} 
                style={{ 
                    display: 'flex', alignItems: 'center', gap: 8, 
                    background: 'none', border: 'none', color: 'var(--text-secondary)',
                    cursor: 'pointer', marginBottom: 24, fontSize: 14 
                }}
            >
                <ArrowLeft size={16} /> Back to Dashboard
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 800 }}>Review Care Plan</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
                        Patient: {patient?.name || 'Unknown'} • Case: {journey.condition}
                    </p>
                </div>
                <div style={{ 
                    padding: '6px 12px', 
                    borderRadius: 8, 
                    background: 'rgba(245, 158, 11, 0.1)', 
                    color: '#F59E0B', 
                    fontWeight: 600, 
                    fontSize: 13,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                }}>
                    <AlertTriangle size={14} /> Pending Approval
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
                
                {/* Left Column: Plan Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    
                    {/* AI Summary */}
                    <div className="glass-card-static" style={{ padding: 24 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Activity size={18} style={{ color: 'var(--color-primary)' }} /> AI Consultation Summary
                        </h2>
                        <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, background: 'var(--bg-secondary)', padding: 16, borderRadius: 12 }}>
                            {journey.aiSummary || 'No AI summary available for this consultation.'}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="glass-card-static" style={{ padding: 24 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Calendar size={18} style={{ color: 'var(--color-primary)' }} /> Proposed Timeline
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {editedJourney.timeline.map((step, i) => (
                                <div key={step.id} style={{ display: 'flex', gap: 16 }}>
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
                                        {i < editedJourney.timeline.length - 1 && (
                                            <div style={{ width: 2, flex: 1, background: 'var(--border-color)', margin: '4px 0' }} />
                                        )}
                                    </div>
                                    <div style={{ flex: 1, paddingBottom: 16 }}>
                                        <div style={{ fontWeight: 600, fontSize: 15 }}>{step.title}</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>{step.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Medications */}
                    <div className="glass-card-static" style={{ padding: 24 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Pill size={18} style={{ color: 'var(--color-primary)' }} /> Prescribed Medications
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {editedJourney.medications.map((med, i) => (
                                <div key={med.id} style={{ 
                                    padding: 16, borderRadius: 12, border: '1px solid var(--border-color)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 15 }}>{med.name}</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>{med.dosage} • {med.frequency}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        {med.time.map((t, j) => (
                                            <span key={j} style={{ padding: '4px 10px', background: 'var(--bg-secondary)', borderRadius: 12, fontSize: 12, fontWeight: 500 }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {editedJourney.medications.length === 0 && (
                                <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>No medications prescribed.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Vitals & Approval */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    
                    {/* Vitals Snapshot */}
                    <div className="glass-card-static" style={{ padding: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Vitals Snapshot</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
                                    <HeartPulse size={14} color="#EF4444" /> Blood Pressure
                                </div>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>120/80</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
                                    <Thermometer size={14} color="#F59E0B" /> Temperature
                                </div>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>98.6°F</div>
                            </div>
                        </div>
                    </div>

                    {/* Doctor Notes */}
                    <div className="glass-card-static" style={{ padding: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Doctor's Notes (Optional)</h3>
                        <textarea 
                            className="input-field" 
                            style={{ width: '100%', height: 120, resize: 'none', padding: 12, fontSize: 14 }}
                            placeholder="Add your own notes or instructions here..."
                            value={editedJourney.doctorNotes || ''}
                            onChange={handleEditNotes}
                        />
                    </div>

                    {/* Approve Button */}
                    <div style={{ position: 'sticky', top: 24 }}>
                        <button 
                            onClick={handleApprove}
                            disabled={isSaving}
                            className="btn-primary" 
                            style={{ 
                                width: '100%', padding: '16px', fontSize: 16, 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
                                background: 'linear-gradient(135deg, #10B981, #059669)'
                            }}
                        >
                            {isSaving ? 'Approving...' : <><Check size={20} /> Approve & Send to Patient</>}
                        </button>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}>
                            This will activate the care plan on the patient's dashboard.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
