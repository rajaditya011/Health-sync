'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Upload, FileText, Brain, AlertTriangle, CheckCircle, XCircle, Loader2, Plus, ArrowRight, X } from 'lucide-react';
import { getReports, addReport, generateId, getCurrentUser, getActiveJourney, saveJourney, JourneyStep, type MedicalReport } from '@/lib/store';
import { formatContextForAI, buildAIContext } from '@/lib/ai-context';

export default function JourneyReportsPage() {
    const router = useRouter();
    const [reports, setReportsList] = useState<MedicalReport[]>([]);
    const [analyzing, setAnalyzing] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            router.push('/auth');
            return;
        }
        setReportsList(getReports());
    }, [router]);

    const handleContinue = () => {
        const user = getCurrentUser();
        if (user) {
            const journey = getActiveJourney(user.id);
            if (journey) {
                const updated = { ...journey, currentStep: JourneyStep.TIMELINE, updatedAt: new Date().toISOString() };
                saveJourney(updated);
            }
        }
        router.push('/journey/timeline');
    };

    const extractTextFromFile = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            const isImage = file.type.startsWith('image/');
            const isPdf = file.type === 'application/pdf';
            if (isImage) {
                reader.onload = (e) => {
                    const base64 = e.target?.result as string;
                    resolve(`[IMAGE_BASE64]${base64.split(',')[1] || base64}[/IMAGE_BASE64]\nFile: ${file.name}\nType: ${file.type}`);
                };
                reader.readAsDataURL(file);
            } else if (isPdf) {
                reader.onload = (e) => {
                    const base64 = e.target?.result as string;
                    resolve(`[PDF_BASE64]${base64.split(',')[1] || base64}[/PDF_BASE64]\nFile: ${file.name}\nType: ${file.type}`);
                };
                reader.readAsDataURL(file);
            } else {
                reader.onload = (e) => {
                    resolve((e.target?.result as string) || 'Unable to read file content');
                };
                reader.readAsText(file);
            }
        });
    };

    const analyzeReport = async (file: File) => {
        setAnalyzing(true);
        try {
            const reportText = await extractTextFromFile(file);
            
            // Mocking analysis for speed since we're simulating the journey
            setTimeout(() => {
                const report: MedicalReport = {
                    id: generateId(),
                    userId: getCurrentUser()?.id || 'unknown',
                    fileName: file.name,
                    uploadDate: new Date().toISOString(),
                    fileData: reportText.substring(0, 100),
                    aiSummary: 'Summary of ' + file.name,
                    technicalSummary: 'Technical details...',
                    abnormalities: [],
                    recommendations: ['Discuss with doctor'],
                    urgencyLevel: 'green',
                    fileType: file.type,
                    category: 'other',
                    sharedWith: [],
                };
                addReport(report);
                setReportsList(getReports());
                setAnalyzing(false);
            }, 1500);

        } catch (err) {
            console.error(err);
            setAnalyzing(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) analyzeReport(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) analyzeReport(file);
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24, paddingBottom: 100 }}>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>Upload Medical Reports (Optional)</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
                    Do you have any past prescriptions, lab tests, or imaging files to share? 
                    Our AI will analyze them and prepare them for your doctor.
                </p>
            </div>

            {/* Upload Area */}
            <motion.div
                className="glass-card-static"
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                style={{
                    padding: 40, textAlign: 'center', marginBottom: 24,
                    border: dragOver ? '2px dashed var(--color-primary)' : '1px solid var(--glass-border)',
                    background: dragOver ? 'rgba(14, 165, 233, 0.06)' : undefined,
                    transition: 'all 0.3s ease', cursor: 'pointer',
                }}
                onClick={() => fileInputRef.current?.click()}
            >
                <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.png,.jpeg" onChange={handleFileUpload} style={{ display: 'none' }} />
                {analyzing ? (
                    <div>
                        <Loader2 size={48} style={{ color: 'var(--color-primary)', animation: 'rotate-slow 1s linear infinite', marginBottom: 16 }} />
                        <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Analyzing Document...</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Please wait.</p>
                    </div>
                ) : (
                    <div>
                        <Upload size={48} style={{ color: 'var(--color-primary)', marginBottom: 16, opacity: 0.7 }} />
                        <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Drag & drop or click to upload</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Supports PDF, JPG, PNG.</p>
                    </div>
                )}
            </motion.div>

            {/* Uploaded Reports List */}
            {reports.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>Uploaded Files</h3>
                    {reports.map((report) => (
                        <div key={report.id} className="glass-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FileText size={20} style={{ color: 'var(--color-primary)' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>{report.fileName}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Analyzed and attached to journey</div>
                            </div>
                            <CheckCircle size={20} style={{ color: '#10B981' }} />
                        </div>
                    ))}
                </div>
            )}

            {/* Floating Continue Button */}
            <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}>
                <button onClick={handleContinue} className="btn-primary" style={{ padding: '14px 28px', fontSize: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 32px rgba(14, 165, 233, 0.4)' }}>
                    Continue to Summary <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
