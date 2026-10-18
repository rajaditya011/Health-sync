'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Phone, Video, PhoneOff, Mic, MicOff, Camera, CameraOff, Clock } from 'lucide-react';
import { getActiveJourney, getCurrentUser, saveJourney, JourneyStep, getAppointments, type PatientJourney } from '@/lib/store';

export default function JourneyConsultationPage() {
    const router = useRouter();
    const [journey, setJourney] = useState<PatientJourney | null>(null);
    const [status, setStatus] = useState<'waiting' | 'ongoing' | 'completed'>('waiting');
    const [isMuted, setIsMuted] = useState(false);
    const [isCamOff, setIsCamOff] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [doctorName, setDoctorName] = useState('Doctor');

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
        
        // Find doctor name from appointment
        if (j.appointmentId) {
            const appt = getAppointments().find(a => a.id === j.appointmentId);
            if (appt) setDoctorName(appt.doctorName);
        }

        // Simulate doctor joining after 3 seconds
        const timer = setTimeout(() => setStatus('ongoing'), 3000);
        return () => clearTimeout(timer);
    }, [router]);

    useEffect(() => {
        if (status !== 'ongoing') return;
        const interval = setInterval(() => setCallDuration(d => d + 1), 1000);
        return () => clearInterval(interval);
    }, [status]);

    const formatDuration = (secs: number) => {
        const m = Math.floor(secs / 60); const s = secs % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleEndCall = () => {
        setStatus('completed');
    };

    const handleContinue = () => {
        if (journey) {
            const updated = { ...journey, currentStep: JourneyStep.AI_ANALYSIS, updatedAt: new Date().toISOString() };
            saveJourney(updated);
        }
        router.push('/journey/ai-analysis');
    };

    if (!journey) return null;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            
            {status === 'waiting' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, animation: 'pulse 2s infinite' }}>
                        <Video size={40} />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Waiting Room</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Please wait, {doctorName} will join shortly...</p>
                </div>
            )}

            {status === 'ongoing' && (
                <div style={{ flex: 1, position: 'relative', borderRadius: 24, overflow: 'hidden', background: '#0B1120', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', top: 24, left: 24, padding: '8px 16px', borderRadius: 20, background: 'rgba(0,0,0,0.5)', color: 'white', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(10px)' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', animation: 'pulse 2s infinite' }} />
                        {formatDuration(callDuration)}
                    </div>

                    <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: 'white', fontWeight: 700, marginBottom: 24 }}>
                        {doctorName.split(' ').pop()?.charAt(0) || 'D'}
                    </div>
                    <h2 style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 8 }}>{doctorName}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Connected & securely recording for AI notes</p>

                    <div style={{ position: 'absolute', bottom: 32, display: 'flex', gap: 16 }}>
                        <button onClick={() => setIsMuted(!isMuted)} style={{
                            width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
                            background: isMuted ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.1)', color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)'
                        }}>
                            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                        </button>
                        <button onClick={() => setIsCamOff(!isCamOff)} style={{
                            width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
                            background: isCamOff ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.1)', color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)'
                        }}>
                            {isCamOff ? <CameraOff size={24} /> : <Camera size={24} />}
                        </button>
                        <button onClick={handleEndCall} style={{
                            width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
                            background: '#EF4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <PhoneOff size={24} />
                        </button>
                    </div>
                </div>
            )}

            {status === 'completed' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                        <PhoneOff size={40} />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Consultation Ended</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Duration: {formatDuration(callDuration)}</p>
                    
                    <div className="glass-card-static" style={{ padding: 24, maxWidth: 400, width: '100%', marginBottom: 32 }}>
                        <h3 style={{ fontWeight: 700, marginBottom: 8 }}>What's next?</h3>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                            HealthSync AI is currently analyzing the consultation transcript to draft a personalized care plan for your doctor's review.
                        </p>
                    </div>

                    <button onClick={handleContinue} className="btn-primary" style={{ padding: '14px 32px', fontSize: 16 }}>
                        Proceed to AI Analysis
                    </button>
                </div>
            )}

        </div>
    );
}
