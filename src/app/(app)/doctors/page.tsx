'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, MapPin, Clock, Calendar, X, CheckCircle, Phone, Filter } from 'lucide-react';
import { addAppointment, generateId, getCurrentUser } from '@/lib/store';
import { PLATFORM_DOCTORS } from '@/lib/data';
import { useLanguage } from '@/lib/LanguageProvider';

const doctors = PLATFORM_DOCTORS;

const specialties = [...new Set(doctors.map(d => d.specialty))].sort();

export default function DoctorsPage() {
    const [search, setSearch] = useState('');
    const [filterSpecialty, setFilterSpecialty] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterMode, setFilterMode] = useState('All');
    const [showBooking, setShowBooking] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedMode, setSelectedMode] = useState<'Physical' | 'Online'>('Physical');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const filtered = doctors.filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()) || d.hospital.toLowerCase().includes(search.toLowerCase());
        const matchesSpecialty = !filterSpecialty || d.specialty === filterSpecialty;
        const matchesType = filterType === 'All' || d.type === filterType;
        const matchesMode = filterMode === 'All' || d.modes.includes(filterMode);
        return matchesSearch && matchesSpecialty && matchesType && matchesMode;
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
        if (!doctor || !selectedDate || !selectedTime) return;

        addAppointment({
            id: generateId(),
            userId: getCurrentUser()?.id || 'unknown',
            doctorId: doctor.id,
            doctorName: doctor.name,
            specialty: doctor.specialty,
            date: selectedDate,
            time: selectedTime,
            status: 'booked',
            location: selectedMode === 'Online' ? 'Online Video Call' : doctor.hospital,
            notes: '',
        });

        setBookingSuccess(true);
        setTimeout(() => {
            setShowBooking(null);
            setBookingSuccess(false);
            setSelectedDate('');
            setSelectedTime('');
        }, 2000);
    };

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 28, fontWeight: 800 }}>Find a Doctor</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Book appointments with verified specialists</p>
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, position: 'relative', minWidth: 200 }}>
                    <Search size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                    <input className="input-field" style={{ paddingLeft: 42 }} placeholder="Search doctors, specialties, hospitals..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="input-field" style={{ width: 150 }} value={filterType} onChange={e => setFilterType(e.target.value)}>
                    <option value="All">All Types</option>
                    <option value="Allopathic">Allopathic</option>
                    <option value="Ayurvedic">Ayurvedic</option>
                    <option value="Homeopathic">Homeopathic</option>
                </select>
                <select className="input-field" style={{ width: 150 }} value={filterMode} onChange={e => setFilterMode(e.target.value)}>
                    <option value="All">All Modes</option>
                    <option value="Physical">Physical Visit</option>
                    <option value="Online">Online Video</option>
                </select>
                <select className="input-field" style={{ width: 170 }} value={filterSpecialty} onChange={e => setFilterSpecialty(e.target.value)}>
                    <option value="">All Specialties</option>
                    {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {/* Results count */}
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
                Showing {filtered.length} doctor{filtered.length !== 1 ? 's' : ''}
            </p>

            {/* Doctor Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                {filtered.map((doc, i) => (
                    <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="glass-card"
                        style={{ padding: 22 }}
                    >
                        <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: 16,
                                background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0, color: 'white', fontWeight: 700, fontSize: 18,
                            }}>
                                {doc.initials}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{doc.name}</h3>
                                <div style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 600 }}>{doc.specialty}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <MapPin size={11} /> {doc.hospital}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Star size={12} style={{ color: '#F59E0B', fill: '#F59E0B' }} /> {doc.rating}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Clock size={12} /> {doc.experience}
                                </span>
                            </div>
                            <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 15 }}>{doc.fee}</span>
                        </div>

                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 14 }}>
                            {doc.available.slice(0, 4).map(t => (
                                <span key={t} style={{
                                    padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 500,
                                    background: 'rgba(16, 185, 129, 0.08)', color: '#10B981',
                                    border: '1px solid rgba(16, 185, 129, 0.15)',
                                }}>
                                    {t}
                                </span>
                            ))}
                            {doc.available.length > 4 && (
                                <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                                    +{doc.available.length - 4} more
                                </span>
                            )}
                        </div>

                        <button onClick={() => { setShowBooking(doc.id); setSelectedDate(''); setSelectedTime(''); }} className="btn-primary" style={{ width: '100%', padding: '10px 16px', fontSize: 14 }}>
                            <Calendar size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Book Appointment
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Booking Modal */}
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
                            style={{ padding: 32, width: '100%', maxWidth: 480 }}
                        >
                            {bookingSuccess ? (
                                <div style={{ textAlign: 'center', padding: 20 }}>
                                    <CheckCircle size={56} style={{ color: '#10B981', marginBottom: 16 }} />
                                    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Appointment Booked!</h2>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        {doctors.find(d => d.id === showBooking)?.name} — {selectedDate} at {selectedTime}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Book Appointment</h2>
                                        <button onClick={() => setShowBooking(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, padding: 14, borderRadius: 12, background: 'var(--bg-card)' }}>
                                        <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-primary)' }}>{doctors.find(d => d.id === showBooking)?.initials}</span>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{doctors.find(d => d.id === showBooking)?.name}</div>
                                            <div style={{ fontSize: 13, color: 'var(--color-primary)' }}>{doctors.find(d => d.id === showBooking)?.specialty}</div>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Select Date</label>
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                            {getNextDays().map(d => (
                                                <button key={d} onClick={() => setSelectedDate(d)} style={{
                                                    padding: '10px 14px', borderRadius: 10, fontSize: 13,
                                                    border: `1px solid ${selectedDate === d ? 'var(--color-primary)' : 'var(--border-color)'}`,
                                                    background: selectedDate === d ? 'rgba(14, 165, 233, 0.12)' : 'var(--bg-card)',
                                                    color: selectedDate === d ? 'var(--color-primary)' : 'var(--text-secondary)',
                                                    cursor: 'pointer', fontWeight: 500,
                                                }}>
                                                    {new Date(d).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedDate && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
                                            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Select Time Slot</label>
                                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                {doctors.find(d => d.id === showBooking)?.available.map(t => (
                                                    <button key={t} onClick={() => setSelectedTime(t)} style={{
                                                        padding: '8px 14px', borderRadius: 8, fontSize: 13,
                                                        border: `1px solid ${selectedTime === t ? '#10B981' : 'var(--border-color)'}`,
                                                        background: selectedTime === t ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-card)',
                                                        color: selectedTime === t ? '#10B981' : 'var(--text-secondary)',
                                                        cursor: 'pointer', fontWeight: 500,
                                                    }}>
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {selectedDate && selectedTime && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
                                            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Select Consultation Mode</label>
                                            <div style={{ display: 'flex', gap: 8 }}>
                                                {doctors.find(d => d.id === showBooking)?.modes.map(mode => (
                                                    <button key={mode} onClick={() => setSelectedMode(mode as any)} style={{
                                                        flex: 1, padding: '10px', borderRadius: 8, fontSize: 13,
                                                        border: `1px solid ${selectedMode === mode ? 'var(--color-primary)' : 'var(--border-color)'}`,
                                                        background: selectedMode === mode ? 'rgba(14, 165, 233, 0.12)' : 'var(--bg-card)',
                                                        color: selectedMode === mode ? 'var(--color-primary)' : 'var(--text-secondary)',
                                                        cursor: 'pointer', fontWeight: 500,
                                                    }}>
                                                        {mode}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    <button onClick={handleBook} disabled={!selectedDate || !selectedTime || !selectedMode} className="btn-primary" style={{ width: '100%', opacity: !selectedDate || !selectedTime || !selectedMode ? 0.5 : 1 }}>
                                        Confirm Booking
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
