'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Calendar, Search, Star, Clock, MapPin, X, CheckCircle, ArrowRight } from 'lucide-react';
import { getActiveJourney, getCurrentUser, saveJourney, JourneyStep, addAppointment, generateId, type PatientJourney } from '@/lib/store';
import { PLATFORM_DOCTORS } from '@/lib/data';

const doctors = PLATFORM_DOCTORS;

export default function JourneyBookingPage() {
    const router = useRouter();
    const [journey, setJourney] = useState<PatientJourney | null>(null);
    const [search, setSearch] = useState('');
    const [showBooking, setShowBooking] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);

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
        
        // Use AI pathway logic to auto-suggest a specialty based on intake/pathway
        if (j.pathway === 'Chronic Care') setSearch('Endocrinology');
        else if (j.pathway === 'Mental Health') setSearch('Psychiatry');
    }, [router]);

    const filtered = doctors.filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || 
                              d.specialty.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    const getNextDays = () => {
        const days: string[] = [];
        for (let i = 1; i <= 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            days.push(d.toISOString().split('T')[0]);
        }
        return days;
    };

    const handleBook = () => {
        const doctor = doctors.find(d => d.id === showBooking);
        if (!doctor || !selectedDate || !selectedTime || !journey) return;

        const appointmentId = generateId();

        // 1. Create the appointment
        addAppointment({
            id: appointmentId,
            userId: journey.userId,
            doctorId: doctor.id,
            doctorName: doctor.name,
            specialty: doctor.specialty,
            date: selectedDate,
            time: selectedTime,
            status: 'booked',
            location: 'Online Video Call',
            notes: 'Journey Consultation',
        });

        // 2. Update the journey
        const updated = { 
            ...journey, 
            currentStep: JourneyStep.CONSULTATION, 
            doctorId: doctor.id,
            appointmentId: appointmentId,
            updatedAt: new Date().toISOString() 
        };
        saveJourney(updated);

        setBookingSuccess(true);
        setTimeout(() => {
            router.push('/journey/consultation');
        }, 2000);
    };

    if (!journey) return null;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24, paddingBottom: 100 }}>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>Book a Doctor</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
                    Based on your intake, we suggest the following specialists. Select a doctor to begin your consultation.
                </p>
            </div>

            <div style={{ position: 'relative', marginBottom: 24 }}>
                <Search size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                <input 
                    className="input-field" 
                    style={{ paddingLeft: 42, width: '100%' }} 
                    placeholder="Search by name or specialty..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                {filtered.slice(0, 5).map((doc, i) => (
                    <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card"
                        style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}
                    >
                        <div style={{ display: 'flex', gap: 14 }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 12,
                                background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0, color: 'white', fontWeight: 700, fontSize: 16,
                            }}>
                                {doc.initials}
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 700, fontSize: 16 }}>{doc.name}</h3>
                                <div style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 600 }}>{doc.specialty}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={12} color="#F59E0B" fill="#F59E0B" /> {doc.rating}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {doc.experience}</span>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => { setShowBooking(doc.id); setSelectedDate(getNextDays()[0]); setSelectedTime(doc.available[0] || '10:00 AM'); }} className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
                            Book & Consult
                        </button>
                    </motion.div>
                ))}
                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                        No doctors found matching "{search}".
                    </div>
                )}
            </div>

            {/* Quick Booking Modal */}
            <AnimatePresence>
                {showBooking && (
                    <div style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 1001, padding: 20, backdropFilter: 'blur(4px)',
                    }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-card-static"
                            style={{ padding: 32, width: '100%', maxWidth: 400, textAlign: 'center' }}
                        >
                            {bookingSuccess ? (
                                <div>
                                    <CheckCircle size={56} style={{ color: '#10B981', margin: '0 auto 16px' }} />
                                    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Booking Confirmed!</h2>
                                    <p style={{ color: 'var(--text-secondary)' }}>Preparing your consultation room...</p>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Confirm Appointment</h2>
                                        <button onClick={() => setShowBooking(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                                        Book an online consultation with <strong>{doctors.find(d => d.id === showBooking)?.name}</strong> for {selectedDate} at {selectedTime}?
                                    </p>
                                    <button onClick={handleBook} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 16 }}>
                                        Confirm & Enter Waiting Room
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
