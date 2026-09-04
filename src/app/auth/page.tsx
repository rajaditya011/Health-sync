'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Brain, Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, Stethoscope, MapPin, Navigation, Camera, CreditCard, X } from 'lucide-react';
import { setCurrentUser, generateId, registerUser, loginUser, simpleHash, loginDoctor, setCurrentDoctor, type UserProfile } from '@/lib/store';

export default function AuthPage() {
    const router = useRouter();
    const [isSignUp, setIsSignUp] = useState(true);
    const [portalRole, setPortalRole] = useState('patient'); // 'patient', 'doctor', 'admin', 'hospital', 'blood-bank', 'abha'
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', location: '', avatar: '', age: '' });
    const [fetchingLocation, setFetchingLocation] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setMediaStream(stream);
            setShowCamera(true);
        } catch (err: any) {
            console.error("Camera error:", err);
            setError(err.message || 'Could not access camera. Please allow permissions.');
        }
    };

    const capturePhoto = () => {
        if (videoRef.current) {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = videoRef.current.videoWidth || 640;
                canvas.height = videoRef.current.videoHeight || 480;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                    setForm({ ...form, avatar: canvas.toDataURL('image/jpeg') });
                }
                stopCamera();
            } catch (err: any) {
                console.error("Capture error:", err);
                setError("Failed to capture image.");
            }
        }
    };

    const stopCamera = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
        setShowCamera(false);
    };

    const handleGetLocation = () => {
        setFetchingLocation(true);
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setFetchingLocation(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setForm(prev => ({ ...prev, location: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}` }));
                setFetchingLocation(false);
            },
            () => {
                setError('Unable to retrieve your location');
                setFetchingLocation(false);
            }
        );
    };

    const handleABHALogin = () => {
        setLoading(true);
        setTimeout(() => {
            const abhaUser: UserProfile = {
                id: generateId(),
                name: 'ABHA User',
                email: 'abha@healthsync.com',
                phone: '9876543210',
                password: simpleHash('abha123'),
                location: '',
                age: '30',
                gender: 'Male',
                activityLevel: 'Moderate',
                existingConditions: [],
                healthGoals: [],
                language: 'en',
                theme: 'light',
                intent: 'wellness',
                onboardingComplete: true,
                createdAt: new Date().toISOString(),
            };
            registerUser(abhaUser);
            setCurrentUser(abhaUser);
            router.push('/dashboard');
        }, 1500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (portalRole !== 'patient') {
            setLoading(true);
            setTimeout(() => {
                if (portalRole === 'doctor') {
                    if (!form.email || !form.password) { setError('Please enter email and password'); setLoading(false); return; }
                    const result = loginDoctor(form.email, form.password);
                    if (!result.success) { setError(result.error || 'Login failed'); setLoading(false); return; }
                    setCurrentDoctor(result.doctor!);
                    router.push('/doctor-dashboard');
                } else if (portalRole === 'admin') {
                    router.push('/admin');
                } else if (portalRole === 'hospital') {
                    router.push('/hospital');
                } else if (portalRole === 'blood-bank') {
                    router.push('/blood-bank');
                } else if (portalRole === 'abha-gov') {
                    router.push('/abha/gov');
                } else if (portalRole === 'abha-patient') {
                    router.push('/abha/patient');
                }
            }, 500);
            return;
        }

        // Patient Sign Up
        if (isSignUp) {
            if (!form.name.trim()) { setError('Please enter your name'); setLoading(false); return; }
            if (!form.email.trim()) { setError('Please enter your email'); setLoading(false); return; }
            if (!form.password || form.password.length < 4) { setError('Password must be at least 4 characters'); setLoading(false); return; }

            const user: UserProfile = {
                id: generateId(),
                name: form.name.trim(),
                email: form.email.trim().toLowerCase(),
                phone: form.phone,
                password: simpleHash(form.password),
                location: form.location.trim(),
                avatar: form.avatar,
                age: form.age,
                gender: '',
                activityLevel: '',
                existingConditions: [],
                healthGoals: [],
                language: 'en',
                theme: 'light',
                intent: '',
                onboardingComplete: false,
                createdAt: new Date().toISOString(),
            };

            const result = registerUser(user);
            if (!result.success) {
                setError(result.error || 'Registration failed');
                setLoading(false);
                return;
            }

            setCurrentUser(user);
            router.push('/onboarding');
            return;
        }

        // Patient Sign In
        if (!form.email.trim()) { setError('Please enter your email'); setLoading(false); return; }
        if (!form.password) { setError('Please enter your password'); setLoading(false); return; }

        const result = loginUser(form.email.trim(), form.password);
        if (!result.success) {
            setError(result.error || 'Login failed');
            setLoading(false);
            return;
        }

        setCurrentUser(result.user!);
        router.push(result.user!.onboardingComplete ? '/dashboard' : '/onboarding');
    };

    return (
        <div className="page-content" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'fixed', width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)',
                top: '10%', right: '-10%', pointerEvents: 'none',
            }} />
            <div style={{
                position: 'fixed', width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
                bottom: '10%', left: '-5%', pointerEvents: 'none',
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="glass-card-static"
                style={{ width: '100%', maxWidth: 440, padding: 40, position: 'relative', zIndex: 1 }}
            >
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 16,
                        background: 'var(--gradient-primary)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 16,
                        boxShadow: '0 8px 30px rgba(14, 165, 233, 0.3)',
                    }}>
                        <Brain size={28} color="white" />
                    </div>
                    <h1 style={{ fontSize: 28, fontWeight: 800 }}>HealthSync</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 15 }}>
                        {portalRole !== 'patient' ? `${portalRole.replace('-', ' ').toUpperCase()} PORTAL` : isSignUp ? 'Create your health profile' : 'Welcome back'}
                    </p>
                </div>

                {/* Mode Toggle */}
                <div style={{
                    display: 'flex', background: 'var(--bg-card)', borderRadius: 12, padding: 4, marginBottom: 28,
                }}>
                    {['Sign Up', 'Sign In'].map((label, i) => {
                        const active = (i === 0 && isSignUp) || (i === 1 && !isSignUp);
                        return (
                            <button
                                key={label}
                                onClick={() => { setError(''); setIsSignUp(i === 0); setPortalRole('patient'); }}
                                style={{
                                    flex: 1, padding: '10px 12px', borderRadius: 10, border: 'none',
                                    background: active && portalRole === 'patient' ? 'var(--gradient-primary)' : 'transparent',
                                    color: active && portalRole === 'patient' ? 'white' : 'var(--text-secondary)',
                                    fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease',
                                }}
                            >
                                {label} (Patient)
                            </button>
                        );
                    })}
                </div>
                
                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>OR ACCESS STAFF PORTALS:</label>
                    <select 
                        value={portalRole} 
                        onChange={(e) => { setPortalRole(e.target.value); setIsSignUp(false); }} 
                        className="input-field" 
                        style={{ width: '100%', padding: 12, fontWeight: 600 }}
                    >
                        <option value="patient">Select Portal...</option>
                        <option value="doctor">🩺 Doctor Dashboard</option>
                        <option value="admin">🛡️ Admin Command Center</option>
                        <option value="hospital">🏥 Hospital Management</option>
                        <option value="blood-bank">🩸 Blood Bank Portal</option>
                        <option value="abha-gov">🏛️ ABHA Authority (Gov)</option>
                        <option value="abha-patient">🪪 ABHA Kiosk (Patient)</option>
                    </select>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                                padding: '10px 14px', borderRadius: 10, marginBottom: 16,
                                background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)',
                                color: '#EF4444', fontSize: 13, fontWeight: 500,
                            }}
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <AnimatePresence mode="wait">
                        {isSignUp && portalRole === 'patient' && (
                            <motion.div key="avatar" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 12, overflow: 'hidden' }}>
                                <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 12 }}>
                                    <div style={{
                                        width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-secondary)',
                                        border: '2px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}>
                                        {form.avatar ? (
                                            <img src={form.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <User size={24} color="var(--text-muted)" />
                                        )}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <label className="hover-lift" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-primary)', background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: 20, border: '1px solid var(--border-color)' }}>
                                        <Camera size={14} /> Upload
                                        <input type="file" accept="image/*" onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => setForm({ ...form, avatar: reader.result as string });
                                                reader.readAsDataURL(file);
                                            }
                                        }} style={{ display: 'none' }} />
                                    </label>
                                    <button type="button" onClick={startCamera} className="hover-lift" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'white', background: '#3B82F6', padding: '6px 12px', borderRadius: 20, border: 'none' }}>
                                        <Camera size={14} /> Live Photo
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {isSignUp && portalRole === 'patient' && (
                            <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                                <input className="input-field" style={{ paddingLeft: 42 }} placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                        <input className="input-field" style={{ paddingLeft: 42 }} type="email" placeholder={portalRole === 'doctor' ? 'Doctor Email' : 'Email Address'} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required={portalRole === 'patient' || portalRole === 'doctor'} />
                    </div>

                    <AnimatePresence mode="wait">
                        {isSignUp && portalRole === 'patient' && (
                            <motion.div key="phone" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                                <input className="input-field" style={{ paddingLeft: 42 }} type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {isSignUp && portalRole === 'patient' && (
                            <motion.div key="age" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                                <input className="input-field" style={{ paddingLeft: 42 }} type="number" placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {isSignUp && portalRole === 'patient' && (
                            <motion.div key="location" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ position: 'relative' }}>
                                <MapPin size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                                <input className="input-field" style={{ paddingLeft: 42, paddingRight: 44 }} type="text" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                                <button type="button" onClick={handleGetLocation} disabled={fetchingLocation} style={{ position: 'absolute', right: 14, top: 14, background: 'none', border: 'none', color: fetchingLocation ? 'var(--color-primary)' : 'var(--text-muted)', cursor: 'pointer', padding: 2 }} title="Use Current Location">
                                    <Navigation size={18} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                        <input className="input-field" style={{ paddingLeft: 42, paddingRight: 44 }} type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required={portalRole === 'patient' || portalRole === 'doctor'} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: 14, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
                        {loading ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
                        ) : (
                            <>
                                {portalRole !== 'patient' ? 'Access Portal' : isSignUp ? 'Start Your Journey' : 'Continue'} <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    {portalRole === 'patient' && (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                                <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
                                <span style={{ padding: '0 12px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>OR</span>
                                <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
                            </div>

                            <button type="button" onClick={handleABHALogin} disabled={loading} style={{
                                width: '100%', padding: '14px 24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                                borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                                opacity: loading ? 0.7 : 1
                            }} className="hover-lift">
                                <CreditCard size={20} style={{ color: '#10B981' }} />
                                Continue with ABHA Card
                            </button>
                        </>
                    )}
                </form>

                {/* Doctor hint */}
                {portalRole === 'doctor' && (
                    <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 10, background: 'rgba(14, 165, 233, 0.06)', border: '1px solid rgba(14, 165, 233, 0.12)', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                        Demo: priya@healthsync.com / doctor123
                    </div>
                )}
                {portalRole !== 'patient' && portalRole !== 'doctor' && (
                    <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 10, background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.12)', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                        Administrative Access. No password required for demo.
                    </div>
                )}

                {/* ABHA badge */}
                <div style={{
                    marginTop: 24, padding: '10px 16px', borderRadius: 12,
                    background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.12)',
                    textAlign: 'center', fontSize: 12, color: 'var(--text-muted)',
                }}>
                    ABHA Compatible • DPDP Act 2023 Compliant
                </div>
            </motion.div>

            {/* Camera Modal */}
            <AnimatePresence>
                {showCamera && (
                    <div style={{
                        position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 20, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            style={{
                                background: 'var(--bg-card)', borderRadius: 24, padding: 24, width: '100%', maxWidth: 400,
                                position: 'relative', textAlign: 'center', border: '1px solid var(--border-color)',
                            }}
                        >
                            <button onClick={stopCamera} style={{ position: 'absolute', top: 16, right: 16, background: 'var(--bg-secondary)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', zIndex: 10 }}>
                                <X size={18} />
                            </button>
                            
                            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Take a Photo</h2>
                            
                            <div style={{ width: '100%', borderRadius: 16, overflow: 'hidden', background: '#000', marginBottom: 16, position: 'relative', aspectRatio: '4/3' }}>
                                <video 
                                    ref={(el) => {
                                        if (el && mediaStream && el.srcObject !== mediaStream) {
                                            el.srcObject = mediaStream;
                                        }
                                        videoRef.current = el;
                                    }} 
                                    autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                />
                            </div>

                            <button type="button" onClick={capturePhoto} className="btn-primary" style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                <Camera size={20} /> Capture Image
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
