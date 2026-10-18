'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Brain, Phone, ArrowRight, Lock, Activity, User, MapPin, Mail, Stethoscope } from 'lucide-react';
import { 
    setCurrentUser, generateId, registerUser, loginUser, simpleHash, loginDoctor, 
    setCurrentDoctor, getDoctorAccounts, type UserProfile, JourneyStep, saveJourney, getActiveJourney 
} from '@/lib/store';

export default function AuthPage() {
    const router = useRouter();
    const [portalRole, setPortalRole] = useState<'patient' | 'doctor'>('patient');
    
    // Patient State
    const [patientStep, setPatientStep] = useState<'phone' | 'otp' | 'profile' | 'reason'>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [profile, setProfile] = useState({ name: '', age: '', email: '', location: '' });
    const [reason, setReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    
    // Doctor State
    const [docEmail, setDocEmail] = useState('');
    const [docPassword, setDocPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const REASONS = [
        'New symptom',
        'Existing condition',
        'Follow-up',
        'Medication-related concern',
        'Report review',
        'General consultation',
        'Other'
    ];

    const handleSendOTP = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length < 10) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }
        setError('');
        setLoading(true);
        // Simulate sending OTP
        setTimeout(() => {
            setLoading(false);
            setPatientStep('otp');
        }, 1000);
    };

    const handleVerifyOTP = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length < 4) {
            setError('Please enter a valid OTP (e.g. 1234)');
            return;
        }
        setError('');
        setLoading(true);
        // Simulate verification
        setTimeout(() => {
            setLoading(false);
            // Check if user exists (mocked using phone as unique identifier for this demo)
            const result = loginUser(`${phone}@healthsync.com`, 'otp-login');
            if (result.success) {
                // User exists
                setCurrentUser(result.user!);
                setPatientStep('reason');
            } else {
                // New user
                setPatientStep('profile');
            }
        }, 1000);
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile.name || !profile.age) {
            setError('Please fill in required fields');
            return;
        }
        setError('');
        setLoading(true);
        
        setTimeout(() => {
            setLoading(false);
            const user: UserProfile = {
                id: generateId(),
                name: profile.name,
                email: profile.email || `${phone}@healthsync.com`,
                phone: phone,
                password: simpleHash('otp-login'), // mock password for OTP users
                location: profile.location,
                age: profile.age,
                gender: '',
                activityLevel: '',
                existingConditions: [],
                healthGoals: [],
                language: 'en',
                theme: 'light',
                intent: '',
                onboardingComplete: true,
                createdAt: new Date().toISOString(),
            };
            registerUser(user);
            setCurrentUser(user);
            setPatientStep('reason');
        }, 1000);
    };

    const handleStartJourney = (e: React.FormEvent) => {
        e.preventDefault();
        const finalReason = reason === 'Other' ? customReason : reason;
        if (!finalReason) {
            setError('Please provide a reason for your visit');
            return;
        }
        
        setLoading(true);
        const currentUser = JSON.parse(localStorage.getItem('healthsync_current_user') || '{}');
        
        // Check if there's an active journey, if not create one
        let journey = getActiveJourney(currentUser.id);
        if (!journey) {
            journey = {
                id: generateId(),
                userId: currentUser.id,
                currentStep: JourneyStep.INTAKE,
                reasonForVisit: finalReason,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        } else {
            journey.reasonForVisit = finalReason;
            journey.currentStep = JourneyStep.INTAKE;
            journey.updatedAt = new Date().toISOString();
        }
        saveJourney(journey);
        
        setTimeout(() => {
            router.push('/journey/intake');
        }, 500);
    };

    const handleDoctorLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (!docEmail || !docPassword) {
                setError('Please enter email and password');
                return;
            }
            const result = loginDoctor(docEmail, docPassword);
            if (!result.success) {
                setError(result.error || 'Login failed');
                return;
            }
            setCurrentDoctor(result.doctor!);
            router.push('/doctor-dashboard');
        }, 1000);
    };

    return (
        <div className="page-content" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)', top: '10%', right: '-10%', pointerEvents: 'none' }} />
            <div style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)', bottom: '10%', left: '-5%', pointerEvents: 'none' }} />

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card-static" style={{ width: '100%', maxWidth: 440, padding: 40, position: 'relative', zIndex: 1 }}>
                
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 16, background: 'var(--gradient-primary)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                        boxShadow: '0 8px 30px rgba(14, 165, 233, 0.3)'
                    }}>
                        <Brain size={28} color="white" />
                    </div>
                    <h1 style={{ fontSize: 28, fontWeight: 800 }}>HealthSync</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 15 }}>Your Complete Healthcare Journey</p>
                </div>

                {patientStep === 'phone' && (
                    <div style={{ display: 'flex', background: 'var(--bg-card)', borderRadius: 12, padding: 4, marginBottom: 28 }}>
                        <button onClick={() => setPortalRole('patient')} style={{
                            flex: 1, padding: '10px 12px', borderRadius: 10, border: 'none',
                            background: portalRole === 'patient' ? 'var(--gradient-primary)' : 'transparent',
                            color: portalRole === 'patient' ? 'white' : 'var(--text-secondary)',
                            fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease'
                        }}>Patient Portal</button>
                        <button onClick={() => setPortalRole('doctor')} style={{
                            flex: 1, padding: '10px 12px', borderRadius: 10, border: 'none',
                            background: portalRole === 'doctor' ? 'var(--gradient-primary)' : 'transparent',
                            color: portalRole === 'doctor' ? 'white' : 'var(--text-secondary)',
                            fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease'
                        }}>Doctor Portal</button>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            style={{ padding: '10px 14px', borderRadius: 10, marginBottom: 16, background: 'rgba(239, 68, 68, 0.08)', color: '#EF4444', fontSize: 13, fontWeight: 500 }}>
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {portalRole === 'patient' ? (
                    <AnimatePresence mode="wait">
                        {patientStep === 'phone' && (
                            <motion.form key="phone" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                                    <input className="input-field" style={{ paddingLeft: 42 }} type="tel" placeholder="Mobile Number" value={phone} onChange={e => setPhone(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn-primary" disabled={loading} style={{ display: 'flex', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
                                    {loading ? 'Sending...' : 'Get OTP'} <ArrowRight size={18} />
                                </button>
                            </motion.form>
                        )}

                        {patientStep === 'otp' && (
                            <motion.form key="otp" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center' }}>Enter OTP sent to +91 {phone}</p>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                                    <input className="input-field" style={{ paddingLeft: 42, letterSpacing: '8px', textAlign: 'center' }} type="text" maxLength={4} placeholder="••••" value={otp} onChange={e => setOtp(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn-primary" disabled={loading} style={{ display: 'flex', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
                                    {loading ? 'Verifying...' : 'Verify & Proceed'}
                                </button>
                                <button type="button" onClick={() => setPatientStep('phone')} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: 13, cursor: 'pointer', marginTop: -8 }}>Change Number</button>
                            </motion.form>
                        )}

                        {patientStep === 'profile' && (
                            <motion.form key="profile" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 8 }}>Let's create your health profile</p>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                                    <input className="input-field" style={{ paddingLeft: 42 }} placeholder="Full Name" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} required />
                                </div>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <div style={{ position: 'relative', flex: 1 }}>
                                        <Activity size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                                        <input className="input-field" style={{ paddingLeft: 42 }} type="number" placeholder="Age" value={profile.age} onChange={e => setProfile({...profile, age: e.target.value})} required />
                                    </div>
                                    <div style={{ position: 'relative', flex: 2 }}>
                                        <MapPin size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                                        <input className="input-field" style={{ paddingLeft: 42 }} placeholder="Location (Optional)" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
                                    </div>
                                </div>
                                <button type="submit" className="btn-primary" disabled={loading} style={{ display: 'flex', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
                                    {loading ? 'Saving...' : 'Save Profile'} <ArrowRight size={18} />
                                </button>
                            </motion.form>
                        )}

                        {patientStep === 'reason' && (
                            <motion.form key="reason" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleStartJourney} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <h3 style={{ fontSize: 20, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Why are you here?</h3>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 300, overflowY: 'auto', padding: '4px' }}>
                                    {REASONS.map(r => (
                                        <label key={r} style={{
                                            display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12,
                                            border: `1px solid ${reason === r ? 'var(--color-primary)' : 'var(--border-color)'}`,
                                            background: reason === r ? 'rgba(14, 165, 233, 0.05)' : 'var(--bg-secondary)',
                                            cursor: 'pointer', transition: 'all 0.2s'
                                        }}>
                                            <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} style={{ accentColor: 'var(--color-primary)' }} />
                                            <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{r}</span>
                                        </label>
                                    ))}
                                </div>

                                <AnimatePresence>
                                    {reason === 'Other' && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                            <textarea className="input-field" placeholder="Please describe briefly..." value={customReason} onChange={e => setCustomReason(e.target.value)} style={{ minHeight: 80, resize: 'vertical' }} required />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button type="submit" className="btn-primary" disabled={loading || !reason} style={{ display: 'flex', justifyContent: 'center', gap: 8, opacity: loading || !reason ? 0.7 : 1 }}>
                                    {loading ? 'Starting...' : 'Start Intake'} <ArrowRight size={18} />
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                ) : (
                    <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleDoctorLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                            <input className="input-field" style={{ paddingLeft: 42 }} type="email" placeholder="Doctor Email" value={docEmail} onChange={e => setDocEmail(e.target.value)} required />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                            <input className="input-field" style={{ paddingLeft: 42 }} type="password" placeholder="Password" value={docPassword} onChange={e => setDocPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading} style={{ display: 'flex', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
                            {loading ? 'Authenticating...' : 'Access Portal'} <ArrowRight size={18} />
                        </button>
                        <div style={{ marginTop: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(14, 165, 233, 0.06)', border: '1px solid rgba(14, 165, 233, 0.12)', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                            Demo: priya@healthsync.com / doctor123
                        </div>
                    </motion.form>
                )}
            </motion.div>
        </div>
    );
}
