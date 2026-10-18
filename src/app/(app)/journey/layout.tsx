'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser, getActiveJourney, JourneyStep } from '@/lib/store';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

const STEPS = [
    { id: 'intake', label: 'History', path: '/journey/intake' },
    { id: 'reports', label: 'Reports', path: '/journey/reports' },
    { id: 'timeline', label: 'Summary', path: '/journey/timeline' },
    { id: 'booking', label: 'Doctor', path: '/journey/booking' },
    { id: 'consultation', label: 'Consultation', path: '/journey/consultation' },
    { id: 'ai-analysis', label: 'AI Analysis', path: '/journey/ai-analysis' }
];

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const user = getCurrentUser();
        if (!user) {
            router.push('/auth');
        }
    }, [router]);

    if (!mounted) return null;

    const currentStepIndex = STEPS.findIndex(s => pathname.includes(s.path) || (s.id === 'intake' && (pathname.includes('medikiosk') || pathname.includes('digital-twin'))));

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
            
            {/* Top Progress Bar */}
            <div style={{ 
                background: 'var(--bg-card)', 
                borderBottom: '1px solid var(--border-color)',
                padding: '16px 24px',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', paddingBottom: 4 }}>
                    {STEPS.map((step, index) => {
                        const isCompleted = index < currentStepIndex;
                        const isCurrent = index === currentStepIndex;
                        
                        return (
                            <div key={step.id} style={{ display: 'flex', alignItems: 'center', minWidth: 'max-content' }}>
                                <div style={{ 
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    color: isCompleted || isCurrent ? 'var(--color-primary)' : 'var(--text-muted)',
                                    opacity: isCurrent ? 1 : 0.7,
                                    fontWeight: isCurrent ? 700 : 500
                                }}>
                                    {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} fill={isCurrent ? 'var(--color-primary)' : 'transparent'} />}
                                    <span style={{ fontSize: 14 }}>{step.label}</span>
                                </div>
                                {index < STEPS.length - 1 && (
                                    <div style={{ margin: '0 16px', color: 'var(--border-color)' }}>
                                        <ArrowRight size={14} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, position: 'relative' }}>
                {children}
            </div>

        </div>
    );
}
