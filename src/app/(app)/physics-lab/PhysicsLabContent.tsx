'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Atom, Waves, Zap, Thermometer, Wind, Radio,
    Eye, Heart, Activity, ArrowRight, ArrowLeft, Play, Pause,
    RotateCcw, ChevronDown, Sparkles, Gauge,
    Calculator, CheckCircle, XCircle, SlidersHorizontal, Lightbulb,
    Bot, Send, MessageCircle, BrainCircuit, Loader2, X, Minimize2, Maximize2, Copy, RefreshCw,
    Trophy, Target, Shuffle, SkipForward, ChevronRight
} from 'lucide-react';

/* ─────────────────────  DATA  ───────────────────── */

interface PhysicsConcept {
    id: string;
    title: string;
    subtitle: string;
    physicsField: string;
    icon: typeof Atom;
    gradient: string;
    color: string;
    principle: string;
    formula: string;
    formulaDesc: string;
    medicalApplication: string;
    howItWorks: string[];
    funFact: string;
}

const physicsConcepts: PhysicsConcept[] = [
    {
        id: 'xray',
        title: 'X-Ray Imaging',
        subtitle: 'Electromagnetic Radiation',
        physicsField: 'Quantum Physics & EM Waves',
        icon: Zap,
        gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
        color: '#8B5CF6',
        principle: 'X-rays are high-energy electromagnetic waves (λ ≈ 0.01–10 nm) that penetrate soft tissue but are absorbed by dense materials like bones (photoelectric absorption). The differential absorption creates contrast in the image.',
        formula: 'E = hf = hc/λ',
        formulaDesc: 'Energy of a photon: Planck\'s constant (h) × frequency (f). X-ray photons have energies of 1–100 keV.',
        medicalApplication: 'Bone fracture detection, dental imaging, chest radiography, and mammography.',
        howItWorks: [
            'An electron beam strikes a tungsten target, producing X-ray photons via Bremsstrahlung radiation',
            'X-rays pass through the body — bone absorbs more than soft tissue',
            'A detector captures transmitted photons, creating a shadow image',
            'Dense structures (bones) appear white; air-filled areas appear black',
        ],
        funFact: 'Wilhelm Röntgen discovered X-rays in 1895 and won the first Nobel Prize in Physics in 1901!',
    },
    {
        id: 'mri',
        title: 'MRI Scanning',
        subtitle: 'Nuclear Magnetic Resonance',
        physicsField: 'Electromagnetism & Quantum Spin',
        icon: Radio,
        gradient: 'linear-gradient(135deg, #0EA5E9, #06B6D4)',
        color: '#0EA5E9',
        principle: 'MRI uses powerful magnetic fields (1.5–3 Tesla) to align hydrogen protons in water molecules. Radio-frequency pulses knock them out of alignment; as they relax back, they emit detectable RF signals. Different tissues relax at different rates.',
        formula: 'ω₀ = γB₀',
        formulaDesc: 'Larmor Precession Frequency: The resonance frequency (ω₀) equals the gyromagnetic ratio (γ) × magnetic field strength (B₀).',
        medicalApplication: 'Brain imaging, spinal cord, joint injuries, tumor detection, cardiac MRI.',
        howItWorks: [
            'A superconducting magnet creates a uniform magnetic field, aligning hydrogen protons',
            'RF pulses at the Larmor frequency cause protons to precess (spin) coherently',
            'When the pulse stops, protons relax — emitting RF signals detected by receiver coils',
            'T1 and T2 relaxation times differ per tissue type, creating detailed contrast',
        ],
        funFact: 'An MRI magnet is ~60,000x stronger than Earth\'s magnetic field! The field is so strong it can pull a metal chair across the room.',
    },
    {
        id: 'ultrasound',
        title: 'Ultrasound Imaging',
        subtitle: 'Acoustic Wave Physics',
        physicsField: 'Wave Mechanics & Acoustics',
        icon: Waves,
        gradient: 'linear-gradient(135deg, #10B981, #34D399)',
        color: '#10B981',
        principle: 'Ultrasound uses high-frequency sound waves (2–18 MHz) above human hearing. Waves reflect (echo) at tissue boundaries based on acoustic impedance differences (Z = ρv). The time delay and intensity of echoes create the image.',
        formula: 'v = fλ, Z = ρv',
        formulaDesc: 'Wave velocity equals frequency × wavelength. Acoustic impedance (Z) = density (ρ) × sound velocity (v).',
        medicalApplication: 'Prenatal imaging, cardiac echocardiography, abdominal organ scanning, guided biopsies.',
        howItWorks: [
            'A piezoelectric transducer converts electrical signals into ultrasound pulses',
            'Waves travel into the body and reflect at tissue interfaces',
            'The same transducer detects returning echoes (pulse-echo method)',
            'Time delay → depth mapping; echo intensity → brightness (B-mode imaging)',
        ],
        funFact: 'Sound travels ~1,540 m/s through soft tissue — the machine calculates distances in microseconds!',
    },
    {
        id: 'ecg',
        title: 'ECG / EKG',
        subtitle: 'Bioelectricity',
        physicsField: 'Electrophysiology & Circuit Theory',
        icon: Heart,
        gradient: 'linear-gradient(135deg, #EF4444, #F87171)',
        color: '#EF4444',
        principle: 'The heart generates electrical signals via ion channels (Na⁺, K⁺, Ca²⁺) that depolarize and repolarize cardiac cells. These tiny currents (~1 mV) propagate through the body and can be detected on the skin surface via electrodes — governed by Einthoven\'s triangle.',
        formula: 'V = IR, ΔV = -∫E·dl',
        formulaDesc: 'Ohm\'s Law relates voltage, current, and resistance. The potential difference is the line integral of the electric field.',
        medicalApplication: 'Arrhythmia detection, heart attack diagnosis, atrial fibrillation, cardiac health monitoring.',
        howItWorks: [
            'The SA node fires, creating an electrical impulse that spreads through the heart',
            'Depolarization wave → P wave (atria), QRS complex (ventricles), T wave (repolarization)',
            '12 leads placed on the body surface measure voltage differences from different angles',
            'The ECG trace reveals rhythm, rate, and conduction abnormalities',
        ],
        funFact: 'Your heart generates enough electricity in a lifetime to drive a truck for 30 km! The SA node fires ~100,000 times/day.',
    },
    {
        id: 'bloodpressure',
        title: 'Blood Pressure',
        subtitle: 'Fluid Dynamics',
        physicsField: 'Hemodynamics & Bernoulli\'s Principle',
        icon: Gauge,
        gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
        color: '#F59E0B',
        principle: 'Blood flow follows principles of fluid dynamics. Poiseuille\'s Law governs flow through vessels. Bernoulli\'s equation explains why narrowed arteries (stenosis) cause pressure drops and increased velocity — leading to turbulence detected as murmurs.',
        formula: 'Q = ΔPπr⁴/8ηL',
        formulaDesc: 'Poiseuille\'s Law: Flow rate (Q) depends on pressure difference (ΔP), vessel radius (r⁴!), fluid viscosity (η), and vessel length (L).',
        medicalApplication: 'Hypertension diagnosis, cardiovascular risk assessment, shock management.',
        howItWorks: [
            'The heart contracts (systole) creating peak pressure (~120 mmHg) pushing blood forward',
            'Between beats (diastole), elastic artery walls maintain pressure (~80 mmHg)',
            'A sphygmomanometer cuff compresses the artery; Korotkoff sounds indicate systolic/diastolic pressure',
            'Bernoulli effect: where vessels narrow, velocity increases and pressure decreases',
        ],
        funFact: 'If all blood vessels were laid end-to-end, they\'d circle the Earth 2.5 times — roughly 100,000 km!',
    },
    {
        id: 'thermometry',
        title: 'Body Thermometry',
        subtitle: 'Thermal Radiation',
        physicsField: 'Thermodynamics & Infrared Physics',
        icon: Thermometer,
        gradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
        color: '#EC4899',
        principle: 'All objects emit infrared radiation based on their temperature (Wien\'s Displacement Law). IR thermometers detect this radiation. The body maintains 37°C via metabolic thermogenesis (ΔG = ΔH − TΔS) balanced by heat loss through radiation, convection, and evaporation.',
        formula: 'λ_max = b/T',
        formulaDesc: 'Wien\'s Law: The peak wavelength of emission is inversely proportional to temperature. At 37°C, peak IR emission is ~9.3 μm.',
        medicalApplication: 'Fever screening, thermal imaging for inflammation, hypothermia detection.',
        howItWorks: [
            'The body emits IR radiation with peak wavelength determined by its temperature',
            'A thermopile sensor in the thermometer absorbs IR photons',
            'The Seebeck effect converts thermal energy difference into a measurable voltage',
            'Stefan-Boltzmann law (P = εσAT⁴) relates total radiated power to temperature',
        ],
        funFact: 'The human body radiates ~100 watts of infrared energy — equivalent to a bright lightbulb!',
    },
];

/* ─────────────── CANVAS SIMULATIONS ─────────────── */

function WaveSimulation({ type, isPlaying, params }: { type: string; isPlaying: boolean; params: { frequency: number; amplitude: number; speed: number } }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        if (isPlaying) timeRef.current += 0.03;
        const t = timeRef.current;

        if (type === 'xray') {
            // EM wave — transverse oscillation
            ctx.strokeStyle = '#8B5CF6';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const y = h / 2 + Math.sin((x * 0.02 * params.frequency) - t * params.speed * 3) * params.amplitude * 0.5 * Math.exp(-Math.pow((x - w / 2) / (w / 3), 2));
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Magnetic component (perpendicular)
            ctx.strokeStyle = '#C084FC';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            for (let x = 0; x < w; x++) {
                const y = h / 2 + Math.cos((x * 0.02 * params.frequency) - t * params.speed * 3) * params.amplitude * 0.38 * Math.exp(-Math.pow((x - w / 2) / (w / 3), 2));
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.setLineDash([]);

            // Labels
            ctx.font = '11px Inter, sans-serif';
            ctx.fillStyle = '#8B5CF6';
            ctx.fillText('E (Electric Field)', 12, 30);
            ctx.fillStyle = '#C084FC';
            ctx.fillText('B (Magnetic Field)', 12, 48);

            // Photon particles
            for (let i = 0; i < 5; i++) {
                const px = ((t * 80 + i * 80) % (w + 40)) - 20;
                const py = h / 2 + Math.sin((px * 0.04) - t * 4) * 40 * Math.exp(-Math.pow((px - w / 2) / (w / 3), 2));
                ctx.beginPath();
                ctx.arc(px, py, 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 92, 246, ${0.5 + Math.sin(t * 3 + i) * 0.3})`;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(px, py, 8, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
                ctx.fill();
            }

        } else if (type === 'mri') {
            // Proton precession visualization
            const cx = w / 2, cy = h / 2;
            const protonCount = 8;

            // Magnetic field lines (B₀)
            ctx.strokeStyle = 'rgba(14, 165, 233, 0.15)';
            ctx.lineWidth = 1;
            for (let i = -3; i <= 3; i++) {
                ctx.beginPath();
                ctx.moveTo(0, cy + i * 20);
                ctx.lineTo(w, cy + i * 20);
                ctx.stroke();
            }
            ctx.font = '11px Inter, sans-serif';
            ctx.fillStyle = 'rgba(14, 165, 233, 0.5)';
            ctx.fillText('B₀ →', w - 50, cy - 50);

            // Precessing protons
            for (let i = 0; i < protonCount; i++) {
                const angle = (i / protonCount) * Math.PI * 2 + t * 2;
                const radius = 30 + i * 8;
                const offsetX = cx + Math.cos(angle) * radius * 0.4 - 60 + i * 20;
                const offsetY = cy + Math.sin(angle) * radius * 0.2;

                // Proton
                const grad = ctx.createRadialGradient(offsetX, offsetY, 0, offsetX, offsetY, 8);
                grad.addColorStop(0, '#38BDF8');
                grad.addColorStop(1, 'rgba(14, 165, 233, 0.3)');
                ctx.beginPath();
                ctx.arc(offsetX, offsetY, 6, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // Spin arrow
                const arrowLen = 14;
                const ax = offsetX + Math.cos(angle + Math.PI / 2) * arrowLen;
                const ay = offsetY + Math.sin(angle + Math.PI / 2) * arrowLen * 0.5;
                ctx.strokeStyle = '#0EA5E9';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(offsetX, offsetY);
                ctx.lineTo(ax, ay);
                ctx.stroke();
            }

            ctx.fillStyle = '#0EA5E9';
            ctx.font = '11px Inter, sans-serif';
            ctx.fillText('Precessing H⁺ Protons', 12, 30);

        } else if (type === 'ultrasound') {
            // Pulse-echo wave propagation
            const waveSpeed = 2;
            const pulseX = ((t * 60) % (w * 1.5));

            // Tissue layers
            const layers = [
                { x: w * 0.35, label: 'Skin', color: 'rgba(16, 185, 129, 0.15)' },
                { x: w * 0.55, label: 'Muscle', color: 'rgba(16, 185, 129, 0.1)' },
                { x: w * 0.75, label: 'Organ', color: 'rgba(16, 185, 129, 0.2)' },
            ];

            layers.forEach(layer => {
                ctx.fillStyle = layer.color;
                ctx.fillRect(layer.x, 0, 2, h);
                ctx.font = '10px Inter, sans-serif';
                ctx.fillStyle = 'rgba(16, 185, 129, 0.6)';
                ctx.fillText(layer.label, layer.x + 6, 20);
            });

            // Outgoing pulse
            ctx.strokeStyle = '#10B981';
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                const px = pulseX - i * 12;
                if (px > 0 && px < w) {
                    ctx.beginPath();
                    for (let y = 10; y < h - 10; y++) {
                        const x = px + Math.sin(y * 0.15 + t * 5) * 8 * Math.exp(-Math.pow((y - h / 2) / (h / 3), 2));
                        y === 10 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    }
                    ctx.globalAlpha = 1 - i * 0.3;
                    ctx.stroke();
                }
            }
            ctx.globalAlpha = 1;

            // Echo pulses (reflected)
            layers.forEach((layer, li) => {
                const echoX = layer.x * 2 - pulseX + 10;
                if (echoX > 0 && echoX < layer.x) {
                    ctx.strokeStyle = `rgba(52, 211, 153, ${0.6 - li * 0.15})`;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    for (let y = 10; y < h - 10; y++) {
                        const x = echoX + Math.sin(y * 0.15 - t * 5) * 5 * Math.exp(-Math.pow((y - h / 2) / (h / 3), 2));
                        y === 10 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                }
            });

            ctx.fillStyle = '#10B981';
            ctx.font = '11px Inter, sans-serif';
            ctx.fillText('← Transducer', 12, h - 15);

        } else if (type === 'ecg') {
            // ECG waveform
            ctx.strokeStyle = '#EF4444';
            ctx.lineWidth = 2.5;
            ctx.beginPath();

            const drawECG = (x: number): number => {
                const cycle = 300 / params.frequency;
                const pos = ((x + t * params.speed * 60) % cycle) / cycle;
                let y = 0;

                // P wave
                if (pos > 0.0 && pos < 0.1) y = Math.sin((pos - 0.0) / 0.1 * Math.PI) * 12;
                // PR segment
                else if (pos >= 0.1 && pos < 0.18) y = 0;
                // Q dip
                else if (pos >= 0.18 && pos < 0.22) y = Math.sin((pos - 0.18) / 0.04 * Math.PI) * -10;
                // R peak
                else if (pos >= 0.22 && pos < 0.30) y = Math.sin((pos - 0.22) / 0.08 * Math.PI) * -params.amplitude * 0.75;
                // S dip
                else if (pos >= 0.30 && pos < 0.34) y = Math.sin((pos - 0.30) / 0.04 * Math.PI) * 15;
                // ST segment
                else if (pos >= 0.34 && pos < 0.45) y = 0;
                // T wave
                else if (pos >= 0.45 && pos < 0.60) y = Math.sin((pos - 0.45) / 0.15 * Math.PI) * 18;
                // Baseline
                else y = 0;

                return h / 2 + y;
            };

            for (let x = 0; x < w; x++) {
                const y = drawECG(x);
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Grid lines (ECG paper style)
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.06)';
            ctx.lineWidth = 0.5;
            for (let x = 0; x < w; x += 20) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }
            for (let y = 0; y < h; y += 20) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
            }

            // Labels
            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.fillStyle = '#EF4444';
            const labelT = t * 80;
            const labels = [
                { name: 'P', offset: 0.05 },
                { name: 'QRS', offset: 0.26 },
                { name: 'T', offset: 0.52 },
            ];
            labels.forEach(l => {
                const lx = (l.offset * 200 - (labelT % 200) + 200) % 200;
                if (lx > 30 && lx < w - 30) {
                    ctx.fillText(l.name, lx, 25);
                }
            });

        } else if (type === 'bloodpressure') {
            // Fluid dynamics — blood flow in vessel
            const vesselY = h / 2;
            const vesselH = 50;

            // Vessel walls
            ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
            ctx.fillRect(0, vesselY - vesselH, w, vesselH * 2);

            // Stenosis (narrowing)
            const nX = w * 0.55;
            const nW = 60;
            ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
            ctx.beginPath();
            ctx.moveTo(nX - nW, vesselY - vesselH);
            ctx.quadraticCurveTo(nX, vesselY - vesselH + 25, nX + nW, vesselY - vesselH);
            ctx.lineTo(nX + nW, vesselY - vesselH);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(nX - nW, vesselY + vesselH);
            ctx.quadraticCurveTo(nX, vesselY + vesselH - 25, nX + nW, vesselY + vesselH);
            ctx.lineTo(nX + nW, vesselY + vesselH);
            ctx.fill();

            // Vessel wall lines
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(0, vesselY - vesselH); ctx.lineTo(nX - nW, vesselY - vesselH);
            ctx.quadraticCurveTo(nX, vesselY - vesselH + 25, nX + nW, vesselY - vesselH);
            ctx.lineTo(w, vesselY - vesselH); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, vesselY + vesselH); ctx.lineTo(nX - nW, vesselY + vesselH);
            ctx.quadraticCurveTo(nX, vesselY + vesselH - 25, nX + nW, vesselY + vesselH);
            ctx.lineTo(w, vesselY + vesselH); ctx.stroke();

            // Blood particles (flowing)
            for (let i = 0; i < 30; i++) {
                const seed = i * 137.508;
                let px = ((t * 40 + seed * 3) % (w + 20)) - 10;
                const baseY = vesselY + (Math.sin(seed) * 0.8) * (vesselH - 8);

                // Speed up at stenosis (Bernoulli)
                let py = baseY;
                const distToN = Math.abs(px - nX);
                if (distToN < nW) {
                    const squeeze = 1 - (1 - distToN / nW) * 0.4;
                    py = vesselY + (baseY - vesselY) * squeeze;
                }

                const radius = 3 + Math.sin(seed * 0.1) * 1.5;
                const rGrad = ctx.createRadialGradient(px, py, 0, px, py, radius);
                rGrad.addColorStop(0, '#EF4444');
                rGrad.addColorStop(1, 'rgba(239, 68, 68, 0.2)');
                ctx.beginPath();
                ctx.arc(px, py, radius, 0, Math.PI * 2);
                ctx.fillStyle = rGrad;
                ctx.fill();
            }

            // Labels
            ctx.font = '10px Inter, sans-serif';
            ctx.fillStyle = '#F59E0B';
            ctx.fillText('Normal Flow', 20, vesselY - vesselH - 8);
            ctx.fillText('Stenosis → ↑Velocity ↓Pressure', nX - 55, vesselY - vesselH - 8);
            ctx.fillText('(Bernoulli Effect)', nX - 35, vesselY + vesselH + 18);

        } else if (type === 'thermometry') {
            // IR radiation visualization
            const bodyX = w * 0.3;

            // Body silhouette
            ctx.fillStyle = 'rgba(236, 72, 153, 0.12)';
            ctx.beginPath();
            ctx.ellipse(bodyX, h / 2 - 20, 25, 60, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(bodyX, h / 2 - 80, 18, 0, Math.PI * 2);
            ctx.fill();

            // IR waves emanating
            for (let ring = 0; ring < 8; ring++) {
                const radius = 30 + ring * 25 + (t * 20) % 25;
                const alpha = Math.max(0, 0.4 - ring * 0.05);
                ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(bodyX, h / 2 - 20, radius, -Math.PI * 0.4, Math.PI * 0.4);
                ctx.stroke();
            }

            // Temperature color gradient bar
            const barX = w * 0.65;
            const barW = 20;
            const barH = h - 40;
            const tempGrad = ctx.createLinearGradient(barX, 20, barX, 20 + barH);
            tempGrad.addColorStop(0, '#EF4444');
            tempGrad.addColorStop(0.3, '#F59E0B');
            tempGrad.addColorStop(0.5, '#EC4899');
            tempGrad.addColorStop(0.7, '#8B5CF6');
            tempGrad.addColorStop(1, '#3B82F6');
            ctx.fillStyle = tempGrad;
            ctx.beginPath();
            ctx.roundRect(barX, 20, barW, barH, 10);
            ctx.fill();

            // Temperature markers
            ctx.font = '10px Inter, sans-serif';
            ctx.fillStyle = '#EC4899';
            const temps = ['42°C', '39°C', '37°C', '35°C', '32°C'];
            temps.forEach((temp, i) => {
                const y = 20 + (i / (temps.length - 1)) * barH;
                ctx.fillText(temp, barX + barW + 8, y + 4);
                ctx.strokeStyle = 'rgba(236, 72, 153, 0.2)';
                ctx.beginPath(); ctx.moveTo(barX, y); ctx.lineTo(barX + barW, y); ctx.stroke();
            });

            // Body temp indicator
            const bodyTempY = 20 + (2 / 4) * barH; // 37°C position
            ctx.fillStyle = '#EC4899';
            ctx.beginPath();
            ctx.moveTo(barX - 4, bodyTempY);
            ctx.lineTo(barX - 12, bodyTempY - 6);
            ctx.lineTo(barX - 12, bodyTempY + 6);
            ctx.closePath();
            ctx.fill();
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.fillText('Body: 37°C', barX - 75, bodyTempY + 4);

            ctx.font = '11px Inter, sans-serif';
            ctx.fillText('IR Radiation →', bodyX + 40, h / 2);
            ctx.fillText('λ_peak ≈ 9.3 μm', bodyX + 40, h / 2 + 18);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [type, isPlaying]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvas.offsetWidth * 2;
            canvas.height = canvas.offsetHeight * 2;
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.scale(2, 2);
        }
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [draw]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%', height: '100%', borderRadius: 12,
                background: 'rgba(0,0,0,0.02)',
            }}
        />
    );
}

/* ─────────────── AI PHYSICS TUTOR ─────────────── */

interface AiMessage {
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
}

const aiSuggestedPrompts: Record<string, string[]> = {
    xray: [
        'Explain how X-ray energy relates to wavelength',
        'Why do bones appear white on X-rays?',
        'What is Bremsstrahlung radiation?',
        'Calculate the energy of a 0.05nm X-ray photon',
    ],
    mri: [
        'What is proton precession in MRI?',
        'Explain T1 vs T2 relaxation times',
        'Why is MRI better for soft tissue than X-ray?',
        'What happens at the Larmor frequency?',
    ],
    ultrasound: [
        'How does acoustic impedance create ultrasound images?',
        'What is the piezoelectric effect in transducers?',
        'Why can\'t ultrasound image through bone?',
        'Explain Doppler ultrasound physics',
    ],
    ecg: [
        'What ions create the heart\'s electrical signal?',
        'Explain the P-QRS-T wave components',
        'How does Einthoven\'s triangle work?',
        'Why is the QRS complex the tallest wave?',
    ],
    bloodpressure: [
        'Explain Poiseuille\'s Law in blood flow',
        'How does vessel radius affect flow rate?',
        'What is the Bernoulli effect in arteries?',
        'Why does stenosis cause a pressure drop?',
    ],
    thermometry: [
        'How does Wien\'s Law apply to body temperature?',
        'Explain the Stefan-Boltzmann Law for radiation',
        'What is the Seebeck effect in thermometers?',
        'Calculate peak IR wavelength at 37°C',
    ],
};

function AIPhysicsTutor({ concept }: { concept: PhysicsConcept }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<AiMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const physicsSystemPrompt = `You are an expert Physics Tutor integrated into the HealthSync Physics Lab. You specialize in explaining how physics principles are applied in medical technology.

CURRENT CONTEXT: The student is studying "${concept.title}" (${concept.physicsField}).
Key Equation: ${concept.formula} — ${concept.formulaDesc}
Principle: ${concept.principle}
Medical Application: ${concept.medicalApplication}

RULES:
1. Explain physics concepts clearly with real-world medical analogies
2. Use LaTeX-style notation for equations when helpful (e.g., E = mc²)
3. Break down complex topics step by step
4. When solving calculations, show each step clearly
5. Relate everything back to medical applications when possible
6. Keep responses concise but thorough (2-4 paragraphs max)
7. Use bullet points and numbered steps for clarity
8. If asked about a different physics topic, still relate it to medical physics
9. Be encouraging and make physics accessible and exciting
10. Use markdown formatting: **bold** for key terms, \`code\` for equations/values`;

    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: AiMessage = { role: 'user', content: content.trim(), timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
                    systemPrompt: physicsSystemPrompt,
                }),
            });

            const data = await response.json();
            const aiMessage: AiMessage = {
                role: 'ai',
                content: data.response || 'I apologize, I couldn\'t generate a response. Please try again.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: 'Sorry, I\'m having trouble connecting. Please check your connection and try again.',
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const clearChat = () => {
        setMessages([]);
    };

    const suggestedPrompts = aiSuggestedPrompts[concept.id] || [];

    const formatMessage = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`(.*?)`/g, '<code style="background:rgba(139,92,246,0.1);padding:2px 6px;border-radius:4px;font-size:12px;color:#8B5CF6">$1</code>')
            .replace(/\n/g, '<br/>');
    };

    return (
        <>
            {/* Floating AI Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1, boxShadow: '0 8px 40px rgba(99, 102, 241, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        style={{
                            position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
                            width: 62, height: 62, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899)',
                            border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 6px 30px rgba(99, 102, 241, 0.35)',
                        }}
                    >
                        <BrainCircuit size={26} style={{ color: 'white' }} />
                        <span style={{
                            position: 'absolute', top: -2, right: -2,
                            width: 20, height: 20, borderRadius: '50%',
                            background: '#10B981', border: '2px solid white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 10, color: 'white', fontWeight: 700,
                        }}>
                            AI
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* AI Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                            position: 'fixed',
                            bottom: isExpanded ? 20 : 28,
                            right: isExpanded ? 20 : 28,
                            zIndex: 1001,
                            width: isExpanded ? 520 : 400,
                            height: isExpanded ? 'calc(100vh - 40px)' : 560,
                            borderRadius: isExpanded ? 20 : 24,
                            overflow: 'hidden',
                            display: 'flex', flexDirection: 'column',
                            background: 'var(--bg-primary, #0a0a14)',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(99, 102, 241, 0.12)',
                            transition: 'width 0.3s ease, height 0.3s ease',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '16px 20px',
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(236, 72, 153, 0.08))',
                            borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
                            display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 14,
                                background: 'linear-gradient(135deg, #6366F1, #EC4899)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <BrainCircuit size={22} style={{ color: 'white' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
                                    AI Physics Tutor
                                </div>
                                <div style={{ fontSize: 11, color: concept.color, fontWeight: 600 }}>
                                    Studying: {concept.title}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <button
                                    onClick={clearChat}
                                    title="Clear chat"
                                    style={{
                                        width: 32, height: 32, borderRadius: 10, border: 'none',
                                        background: 'rgba(255,255,255,0.05)', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--text-muted)',
                                    }}
                                >
                                    <RefreshCw size={14} />
                                </button>
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    title={isExpanded ? 'Minimize' : 'Expand'}
                                    style={{
                                        width: 32, height: 32, borderRadius: 10, border: 'none',
                                        background: 'rgba(255,255,255,0.05)', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--text-muted)',
                                    }}
                                >
                                    {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                                </button>
                                <button
                                    onClick={() => { setIsOpen(false); setIsExpanded(false); }}
                                    title="Close"
                                    style={{
                                        width: 32, height: 32, borderRadius: 10, border: 'none',
                                        background: 'rgba(239,68,68,0.1)', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#EF4444',
                                    }}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div style={{
                            flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
                            display: 'flex', flexDirection: 'column', gap: 14,
                        }}>
                            {messages.length === 0 ? (
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20, padding: '20px 0' }}>
                                    {/* Welcome */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', delay: 0.1 }}
                                        style={{
                                            width: 64, height: 64, borderRadius: 20,
                                            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.1))',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}
                                    >
                                        <Bot size={32} style={{ color: '#8B5CF6' }} />
                                    </motion.div>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                                            Ask me about {concept.title}!
                                        </p>
                                        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                            I can explain physics equations, solve problems,<br />and connect concepts to medical applications.
                                        </p>
                                    </div>

                                    {/* Concept Badge */}
                                    <div style={{
                                        padding: '8px 16px', borderRadius: 12,
                                        background: `${concept.color}10`,
                                        border: `1px solid ${concept.color}25`,
                                        display: 'flex', alignItems: 'center', gap: 8,
                                    }}>
                                        {(() => { const I = concept.icon; return <I size={16} style={{ color: concept.color }} />; })()}
                                        <span style={{ fontSize: 12, fontWeight: 600, color: concept.color }}>
                                            {concept.formula}
                                        </span>
                                    </div>

                                    {/* Suggested Prompts */}
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' }}>
                                            Try asking
                                        </span>
                                        {suggestedPrompts.map((prompt, i) => (
                                            <motion.button
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + i * 0.08 }}
                                                whileHover={{ scale: 1.02, x: 4 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => sendMessage(prompt)}
                                                style={{
                                                    padding: '10px 14px', borderRadius: 12,
                                                    background: 'rgba(255,255,255,0.03)',
                                                    border: '1px solid rgba(255,255,255,0.06)',
                                                    cursor: 'pointer', textAlign: 'left',
                                                    display: 'flex', alignItems: 'center', gap: 10,
                                                    color: 'var(--text-secondary)', fontSize: 12.5,
                                                    fontFamily: 'inherit',
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                <MessageCircle size={13} style={{ color: concept.color, flexShrink: 0 }} />
                                                {prompt}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                display: 'flex',
                                                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                                gap: 8,
                                            }}
                                        >
                                            {msg.role === 'ai' && (
                                                <div style={{
                                                    width: 30, height: 30, borderRadius: 10, flexShrink: 0,
                                                    background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    marginTop: 2,
                                                }}>
                                                    <Bot size={16} style={{ color: 'white' }} />
                                                </div>
                                            )}
                                            <div style={{
                                                maxWidth: '80%',
                                                padding: '12px 16px',
                                                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                                background: msg.role === 'user'
                                                    ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                                                    : 'rgba(255,255,255,0.04)',
                                                border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                                                color: msg.role === 'user' ? 'white' : 'var(--text-secondary)',
                                                fontSize: 13, lineHeight: 1.7,
                                                position: 'relative',
                                            }}>
                                                <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                                                {msg.role === 'ai' && (
                                                    <button
                                                        onClick={() => handleCopy(msg.content, i)}
                                                        style={{
                                                            position: 'absolute', top: 8, right: 8,
                                                            width: 24, height: 24, borderRadius: 6,
                                                            border: 'none', background: 'rgba(255,255,255,0.06)',
                                                            cursor: 'pointer', display: 'flex',
                                                            alignItems: 'center', justifyContent: 'center',
                                                            color: copiedIndex === i ? '#10B981' : 'var(--text-muted)',
                                                            transition: 'all 0.2s',
                                                        }}
                                                    >
                                                        {copiedIndex === i ? <CheckCircle size={11} /> : <Copy size={11} />}
                                                    </button>
                                                )}
                                                <div style={{
                                                    fontSize: 10, color: msg.role === 'user' ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)',
                                                    marginTop: 6, textAlign: 'right',
                                                }}>
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Loading indicator */}
                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{ display: 'flex', gap: 8 }}
                                        >
                                            <div style={{
                                                width: 30, height: 30, borderRadius: 10, flexShrink: 0,
                                                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <Bot size={16} style={{ color: 'white' }} />
                                            </div>
                                            <div style={{
                                                padding: '14px 20px', borderRadius: '16px 16px 16px 4px',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                display: 'flex', alignItems: 'center', gap: 8,
                                            }}>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                                >
                                                    <Loader2 size={14} style={{ color: '#8B5CF6' }} />
                                                </motion.div>
                                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Thinking...</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Quick follow-up suggestions after AI responds */}
                                    {messages.length > 0 && messages[messages.length - 1].role === 'ai' && !isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', padding: '4px 0' }}
                                        >
                                            {['Explain more', 'Give an example', 'Solve a problem'].map((q, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => sendMessage(q + ' about ' + concept.title)}
                                                    style={{
                                                        padding: '6px 12px', borderRadius: 20,
                                                        background: `${concept.color}10`,
                                                        border: `1px solid ${concept.color}20`,
                                                        fontSize: 11, color: concept.color, cursor: 'pointer',
                                                        fontWeight: 600, fontFamily: 'inherit',
                                                        transition: 'all 0.2s',
                                                    }}
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div style={{
                            padding: '12px 16px 16px',
                            borderTop: '1px solid rgba(255,255,255,0.06)',
                            background: 'rgba(0,0,0,0.15)',
                        }}>
                            <div style={{
                                display: 'flex', gap: 8, alignItems: 'center',
                            }}>
                                <input
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && sendMessage(inputValue)}
                                    placeholder={`Ask about ${concept.title}...`}
                                    disabled={isLoading}
                                    style={{
                                        flex: 1, padding: '12px 16px', borderRadius: 14,
                                        border: '1px solid rgba(139, 92, 246, 0.15)',
                                        background: 'rgba(255,255,255,0.04)',
                                        color: 'var(--text-primary)', fontSize: 13,
                                        outline: 'none', fontFamily: 'inherit',
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'rgba(139, 92, 246, 0.4)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(139, 92, 246, 0.15)'}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => sendMessage(inputValue)}
                                    disabled={isLoading || !inputValue.trim()}
                                    style={{
                                        width: 44, height: 44, borderRadius: 14,
                                        border: 'none', cursor: 'pointer',
                                        background: inputValue.trim()
                                            ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                                            : 'rgba(255,255,255,0.05)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'all 0.2s',
                                        opacity: isLoading ? 0.5 : 1,
                                    }}
                                >
                                    <Send size={16} style={{ color: inputValue.trim() ? 'white' : 'var(--text-muted)' }} />
                                </motion.button>
                            </div>
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                gap: 4, marginTop: 8,
                            }}>
                                <Sparkles size={10} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
                                <span style={{ fontSize: 10, color: 'var(--text-muted)', opacity: 0.5 }}>
                                    Powered by AI • Context-aware physics tutoring
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ─────────────── MAIN COMPONENT ─────────────── */

/* ─────────────── QUIZ DATA ─────────────── */
const allQuizQuestions = [
    // X-Ray
    { q: 'What type of radiation do X-ray machines produce?', options: ['Infrared', 'Electromagnetic (X-ray)', 'Ultrasonic', 'Gamma'], correct: 1, topic: 'xray' },
    { q: 'What is the typical energy range of diagnostic X-ray photons?', options: ['0.01–0.1 eV', '1–100 keV', '1–10 MeV', '100–500 GeV'], correct: 1, topic: 'xray' },
    { q: 'What process produces X-rays when electrons hit a tungsten target?', options: ['Cherenkov radiation', 'Bremsstrahlung radiation', 'Hawking radiation', 'Synchrotron radiation'], correct: 1, topic: 'xray' },
    { q: 'Why do bones appear white on X-ray images?', options: ['They emit light', 'They absorb more X-rays than soft tissue', 'They reflect X-rays', 'They are radioactive'], correct: 1, topic: 'xray' },
    { q: 'What is the wavelength range of diagnostic X-rays?', options: ['1–10 m', '400–700 nm', '0.01–10 nm', '1–100 μm'], correct: 2, topic: 'xray' },
    // MRI
    { q: 'In MRI, what does the Larmor frequency depend on?', options: ['Patient weight', 'Room temperature', 'Magnetic field strength', 'X-ray dosage'], correct: 2, topic: 'mri' },
    { q: 'What particle is primarily imaged in clinical MRI?', options: ['Electron', 'Neutron', 'Hydrogen proton', 'Carbon-14 nucleus'], correct: 2, topic: 'mri' },
    { q: 'How strong is a typical clinical MRI magnet?', options: ['0.001 Tesla', '0.05 Tesla', '1.5–3 Tesla', '100 Tesla'], correct: 2, topic: 'mri' },
    { q: 'What do T1 and T2 represent in MRI?', options: ['Temperature readings', 'Relaxation times of protons', 'X-ray exposure times', 'Blood pressure intervals'], correct: 1, topic: 'mri' },
    { q: 'What type of pulse is used to excite protons in MRI?', options: ['X-ray pulse', 'Laser pulse', 'Radio-frequency pulse', 'Ultrasound pulse'], correct: 2, topic: 'mri' },
    // Ultrasound
    { q: 'What physical property allows ultrasound to create images?', options: ['Refraction of light', 'Acoustic impedance difference', 'Magnetic resonance', 'Radioactive decay'], correct: 1, topic: 'ultrasound' },
    { q: 'What is the speed of sound in soft tissue approximately?', options: ['340 m/s', '1,540 m/s', '3,000 m/s', '300,000 km/s'], correct: 1, topic: 'ultrasound' },
    { q: 'What effect converts electrical signals to ultrasound waves?', options: ['Photoelectric effect', 'Piezoelectric effect', 'Doppler effect', 'Seebeck effect'], correct: 1, topic: 'ultrasound' },
    { q: 'What frequency range is used in diagnostic ultrasound?', options: ['20–20,000 Hz', '2–18 MHz', '1–100 GHz', '0.1–1 Hz'], correct: 1, topic: 'ultrasound' },
    { q: 'In B-mode ultrasound, what determines pixel brightness?', options: ['Color of tissue', 'Echo intensity', 'Patient age', 'Room lighting'], correct: 1, topic: 'ultrasound' },
    // ECG
    { q: 'What does the QRS complex in an ECG represent?', options: ['Atrial depolarization', 'Ventricular depolarization', 'Ventricular repolarization', 'SA node firing'], correct: 1, topic: 'ecg' },
    { q: 'Which ions are primarily responsible for cardiac action potentials?', options: ['Fe²⁺ and Mg²⁺', 'Na⁺, K⁺, and Ca²⁺', 'Cl⁻ and HCO₃⁻', 'Zn²⁺ and Cu²⁺'], correct: 1, topic: 'ecg' },
    { q: 'What does the P wave in an ECG represent?', options: ['Ventricular contraction', 'Atrial depolarization', 'Ventricular repolarization', 'Bundle of His activation'], correct: 1, topic: 'ecg' },
    { q: 'How many leads are used in a standard 12-lead ECG?', options: ['6', '10 electrodes / 12 leads', '2', '24'], correct: 1, topic: 'ecg' },
    { q: 'What is the typical amplitude of an ECG signal on the skin?', options: ['~1 V', '~1 mV', '~1 μV', '~100 V'], correct: 1, topic: 'ecg' },
    // Blood Pressure
    { q: 'Poiseuille\'s Law states that flow rate depends on vessel radius to what power?', options: ['1st power', '2nd power', '3rd power', '4th power'], correct: 3, topic: 'bloodpressure' },
    { q: 'What does the Bernoulli effect predict at a stenosis?', options: ['Velocity decreases', 'Pressure increases', 'Velocity increases & pressure decreases', 'Flow stops'], correct: 2, topic: 'bloodpressure' },
    { q: 'What are Korotkoff sounds used to measure?', options: ['Heart rate', 'Blood oxygen', 'Systolic & diastolic blood pressure', 'Lung capacity'], correct: 2, topic: 'bloodpressure' },
    { q: 'Normal systolic blood pressure is approximately?', options: ['60 mmHg', '120 mmHg', '200 mmHg', '80 mmHg'], correct: 1, topic: 'bloodpressure' },
    { q: 'What happens to blood flow if vessel radius is halved (Poiseuille)?', options: ['Halved', 'Quartered', 'Reduced to 1/16th', 'Unchanged'], correct: 2, topic: 'bloodpressure' },
    // Thermometry
    { q: 'Wien\'s Law relates peak emission wavelength to what?', options: ['Pressure', 'Volume', 'Temperature', 'Density'], correct: 2, topic: 'thermometry' },
    { q: 'At 37°C, what is the peak IR emission wavelength of the human body?', options: ['~550 nm', '~9.3 μm', '~1 mm', '~100 nm'], correct: 1, topic: 'thermometry' },
    { q: 'What physical law relates total radiated power to temperature?', options: ['Ohm\'s Law', 'Stefan-Boltzmann Law', 'Snell\'s Law', 'Coulomb\'s Law'], correct: 1, topic: 'thermometry' },
    { q: 'How much infrared power does the human body radiate approximately?', options: ['~1 watt', '~10 watts', '~100 watts', '~1000 watts'], correct: 2, topic: 'thermometry' },
    { q: 'What effect do IR thermometers use to convert heat to voltage?', options: ['Photoelectric effect', 'Hall effect', 'Seebeck effect', 'Doppler effect'], correct: 2, topic: 'thermometry' },
];

// Randomly shuffle and pick questions
function getRandomQuizQuestions(count: number = 10) {
    const shuffled = [...allQuizQuestions];
    // Fisher-Yates shuffle with Math.random
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

export default function PhysicsLabContent() {
    const [selectedConcept, setSelectedConcept] = useState<PhysicsConcept>(physicsConcepts[0]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    // Interactive params
    const [simParams, setSimParams] = useState({ frequency: 2, amplitude: 80, speed: 1.5 });
    // Calculator
    const [calcInputs, setCalcInputs] = useState<Record<string, string>>({});
    // Quiz
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
    const [evaluatedQuestions, setEvaluatedQuestions] = useState<Record<number, boolean>>({});
    const [quizQuestions, setQuizQuestions] = useState(() => getRandomQuizQuestions(10));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
    const quizScore = Object.entries(evaluatedQuestions).filter(([, v]) => v).length;
    const totalEvaluated = Object.keys(evaluatedQuestions).length;

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setSlideDirection('next');
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setSlideDirection('prev');
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleRestartQuiz = () => {
        setQuizAnswers({});
        setEvaluatedQuestions({});
        setQuizQuestions(getRandomQuizQuestions(10));
        setCurrentQuestionIndex(0);
        setQuizCompleted(false);
        setSlideDirection('next');
    };

    const getTopicStats = () => {
        const stats: Record<string, { correct: number; total: number }> = {};
        Object.entries(evaluatedQuestions).forEach(([idxStr, wasCorrect]) => {
            const q = quizQuestions[parseInt(idxStr)];
            if (!q) return;
            if (!stats[q.topic]) stats[q.topic] = { correct: 0, total: 0 };
            stats[q.topic].total++;
            if (wasCorrect) stats[q.topic].correct++;
        });
        return stats;
    };

    const calcResult = useMemo(() => {
        const v = calcInputs;
        try {
            switch (selectedConcept.id) {
                case 'xray': {
                    const freq = parseFloat(v.freq || '0');
                    const h = 6.626e-34; const eV = 1.602e-19;
                    return freq > 0 ? `E = ${((h * freq * 1e18) / eV).toFixed(2)} keV` : '';
                }
                case 'mri': {
                    const B = parseFloat(v.B || '0');
                    const gamma = 267.52e6;
                    return B > 0 ? `ω₀ = ${((gamma * B) / (2 * Math.PI * 1e6)).toFixed(2)} MHz` : '';
                }
                case 'ultrasound': {
                    const f = parseFloat(v.freq || '0'); const wl = parseFloat(v.wl || '0');
                    return f > 0 && wl > 0 ? `v = ${(f * wl).toFixed(1)} m/s` : '';
                }
                case 'ecg': {
                    const volt = parseFloat(v.V || '0'); const res = parseFloat(v.R || '0');
                    return volt > 0 && res > 0 ? `I = ${((volt / res) * 1000).toFixed(3)} mA` : '';
                }
                case 'bloodpressure': {
                    const dP = parseFloat(v.dP || '0'); const r = parseFloat(v.r || '0');
                    const eta = parseFloat(v.eta || '0.003'); const L = parseFloat(v.L || '0.1');
                    return dP > 0 && r > 0 ? `Q = ${((dP * Math.PI * Math.pow(r * 0.001, 4)) / (8 * eta * L) * 1e6).toExponential(2)} mm³/s` : '';
                }
                case 'thermometry': {
                    const T = parseFloat(v.T || '0');
                    const b = 2.8977e-3;
                    return T > 0 ? `λ_max = ${((b / (T + 273.15)) * 1e6).toFixed(2)} μm` : '';
                }
                default: return '';
            }
        } catch { return 'Invalid input'; }
    }, [calcInputs, selectedConcept.id]);

    const calcFields: Record<string, { label: string; key: string; placeholder: string; unit: string }[]> = {
        xray: [{ label: 'Frequency', key: 'freq', placeholder: '3e18', unit: 'Hz' }],
        mri: [{ label: 'Field Strength', key: 'B', placeholder: '1.5', unit: 'Tesla' }],
        ultrasound: [{ label: 'Frequency', key: 'freq', placeholder: '5', unit: 'MHz' }, { label: 'Wavelength', key: 'wl', placeholder: '0.000308', unit: 'm' }],
        ecg: [{ label: 'Voltage', key: 'V', placeholder: '0.001', unit: 'V' }, { label: 'Resistance', key: 'R', placeholder: '1000', unit: 'Ω' }],
        bloodpressure: [{ label: 'ΔP (Pressure)', key: 'dP', placeholder: '13332', unit: 'Pa' }, { label: 'Radius', key: 'r', placeholder: '3', unit: 'mm' }],
        thermometry: [{ label: 'Temperature', key: 'T', placeholder: '37', unit: '°C' }],
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }} className="page-content">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: 32 }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{
                        width: 44, height: 44, borderRadius: 14,
                        background: 'linear-gradient(135deg, #6366F1, #EC4899)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Atom size={24} style={{ color: 'white' }} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>
                            Physics of <span className="gradient-text">Medicine</span>
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 2 }}>
                            Explore how physics principles power modern medical technology
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Physics Stats Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card-static"
                style={{
                    padding: '20px 28px', marginBottom: 24,
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
                    textAlign: 'center',
                }}
            >
                {[
                    { value: '6', label: 'Physics Domains', icon: Atom },
                    { value: '24+', label: 'Key Equations', icon: Sparkles },
                    { value: '∞', label: 'Applications', icon: Activity },
                    { value: 'Live', label: 'Simulations', icon: Waves },
                ].map((stat, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <stat.icon size={18} style={{ color: 'var(--color-primary)', opacity: 0.7 }} />
                        <div style={{
                            fontSize: 22, fontWeight: 800,
                            backgroundImage: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>{stat.value}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{stat.label}</div>
                    </div>
                ))}
            </motion.div>

            {/* Concept Selector Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                    display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto',
                    paddingBottom: 8,
                }}
            >
                {physicsConcepts.map((concept) => {
                    const Icon = concept.icon;
                    const isActive = selectedConcept.id === concept.id;
                    return (
                        <motion.button
                            key={concept.id}
                            onClick={() => setSelectedConcept(concept)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: '10px 18px', borderRadius: 14, border: 'none',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                                background: isActive ? concept.gradient : 'var(--glass-bg)',
                                color: isActive ? 'white' : 'var(--text-secondary)',
                                fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap',
                                transition: 'all 0.3s ease',
                                boxShadow: isActive ? `0 4px 20px ${concept.color}40` : 'none',
                                fontFamily: 'inherit',
                            }}
                        >
                            <Icon size={16} />
                            {concept.title}
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* Main Content Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedConcept.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}
                >
                    {/* Left: Canvas Simulation */}
                    <div className="glass-card-static" style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                                    <span style={{ color: selectedConcept.color }}>Live</span> Simulation
                                </h3>
                                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{selectedConcept.subtitle}</p>
                            </div>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    style={{
                                        width: 34, height: 34, borderRadius: 10, border: 'none',
                                        background: isPlaying ? `${selectedConcept.color}15` : 'var(--bg-card)',
                                        color: selectedConcept.color, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}
                                >
                                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                                </button>
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    style={{
                                        width: 34, height: 34, borderRadius: 10, border: 'none',
                                        background: 'var(--bg-card)', color: 'var(--text-muted)',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}
                                >
                                    <RotateCcw size={14} />
                                </button>
                            </div>
                        </div>
                        <div style={{ flex: 1, minHeight: 280, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                            <WaveSimulation type={selectedConcept.id} isPlaying={isPlaying} params={simParams} />
                        </div>

                        {/* Parameter Sliders */}
                        <div style={{ marginTop: 14, padding: '12px 14px', borderRadius: 12, background: `${selectedConcept.color}05`, border: `1px solid ${selectedConcept.color}12` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                                <SlidersHorizontal size={13} style={{ color: selectedConcept.color }} />
                                <span style={{ fontSize: 11, fontWeight: 700, color: selectedConcept.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>Adjust Parameters</span>
                            </div>
                            {[{ label: 'Frequency', key: 'frequency' as const, min: 0.5, max: 5, step: 0.1 },
                            { label: 'Amplitude', key: 'amplitude' as const, min: 20, max: 120, step: 5 },
                            { label: 'Speed', key: 'speed' as const, min: 0.3, max: 4, step: 0.1 },
                            ].map(s => (
                                <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                    <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 65, flexShrink: 0 }}>{s.label}</span>
                                    <input type="range" min={s.min} max={s.max} step={s.step}
                                        value={simParams[s.key]}
                                        onChange={e => setSimParams(p => ({ ...p, [s.key]: parseFloat(e.target.value) }))}
                                        style={{ flex: 1, accentColor: selectedConcept.color, height: 4, cursor: 'pointer' }}
                                    />
                                    <span style={{ fontSize: 11, fontWeight: 600, color: selectedConcept.color, width: 32, textAlign: 'right' }}>{simParams[s.key].toFixed(1)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Physics Details */}
                    <div className="glass-card-static" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <div style={{
                                    width: 38, height: 38, borderRadius: 12, background: selectedConcept.gradient,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {(() => { const I = selectedConcept.icon; return <I size={20} style={{ color: 'white' }} />; })()}
                                </div>
                                <div>
                                    <h2 style={{ fontSize: 18, fontWeight: 800 }}>{selectedConcept.title}</h2>
                                    <span style={{
                                        fontSize: 11, color: selectedConcept.color, fontWeight: 600,
                                        padding: '2px 8px', borderRadius: 6,
                                        background: `${selectedConcept.color}12`,
                                    }}>
                                        {selectedConcept.physicsField}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Key Equation */}
                        <div style={{
                            padding: '14px 18px', borderRadius: 14,
                            background: `${selectedConcept.color}08`,
                            border: `1px solid ${selectedConcept.color}20`,
                        }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Key Equation
                            </div>
                            <div style={{
                                fontSize: 22, fontWeight: 800, color: selectedConcept.color,
                                fontFamily: 'Georgia, serif', letterSpacing: 1,
                            }}>
                                {selectedConcept.formula}
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
                                {selectedConcept.formulaDesc}
                            </div>
                        </div>

                        {/* Principle */}
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>
                                Physics Principle
                            </div>
                            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                {selectedConcept.principle}
                            </p>
                        </div>

                        {/* Medical Application */}
                        <div style={{
                            padding: '10px 14px', borderRadius: 10,
                            background: 'rgba(14, 165, 233, 0.04)',
                            border: '1px solid rgba(14, 165, 233, 0.1)',
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                        }}>
                            <Eye size={16} style={{ color: 'var(--color-primary)', marginTop: 2, flexShrink: 0 }} />
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary)', marginBottom: 2 }}>Medical Application</div>
                                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    {selectedConcept.medicalApplication}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* How It Works Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card-static"
                style={{ padding: 24, marginBottom: 24 }}
            >
                <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>
                    How <span style={{ color: selectedConcept.color }}>{selectedConcept.title}</span> Works — Step by Step
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {selectedConcept.howItWorks.map((step, i) => (
                        <motion.div
                            key={`${selectedConcept.id}-${i}`}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{
                                width: 30, height: 30, borderRadius: '50%',
                                background: selectedConcept.gradient, color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, fontSize: 13, marginBottom: 10,
                            }}>
                                {i + 1}
                            </div>
                            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {step}
                            </p>
                            {i < selectedConcept.howItWorks.length - 1 && (
                                <ArrowRight size={14} style={{
                                    position: 'absolute', top: 8, right: -12,
                                    color: 'var(--text-muted)', opacity: 0.4,
                                }} />
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Fun Fact */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                    padding: '16px 22px', borderRadius: 16, marginBottom: 24,
                    background: `${selectedConcept.color}06`,
                    border: `1px solid ${selectedConcept.color}15`,
                    display: 'flex', alignItems: 'center', gap: 14,
                }}
            >
                <Sparkles size={20} style={{ color: selectedConcept.color, flexShrink: 0 }} />
                <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: selectedConcept.color, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Fun Fact
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {selectedConcept.funFact}
                    </p>
                </div>
            </motion.div>

            {/* Physics Calculator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card-static"
                style={{ padding: 24, marginBottom: 24 }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: selectedConcept.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Calculator size={18} style={{ color: 'white' }} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 16, fontWeight: 800 }}>Physics <span style={{ color: selectedConcept.color }}>Calculator</span></h3>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Plug in values and compute {selectedConcept.title} equations</p>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${(calcFields[selectedConcept.id] || []).length}, 1fr) auto`, gap: 12, alignItems: 'end' }}>
                    {(calcFields[selectedConcept.id] || []).map(field => (
                        <div key={field.key}>
                            <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>{field.label} ({field.unit})</label>
                            <input className="input-field" placeholder={field.placeholder}
                                value={calcInputs[field.key] || ''}
                                onChange={e => setCalcInputs(p => ({ ...p, [field.key]: e.target.value }))}
                                style={{ padding: '10px 14px', fontSize: 14 }}
                            />
                        </div>
                    ))}
                    <div style={{ padding: '10px 18px', borderRadius: 12, background: calcResult ? `${selectedConcept.color}10` : 'var(--bg-card)', border: `1px solid ${calcResult ? selectedConcept.color + '30' : 'var(--border-color)'}`, minWidth: 160, textAlign: 'center', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: calcResult ? selectedConcept.color : 'var(--text-muted)', fontFamily: 'Georgia, serif' }}>
                            {calcResult || 'Enter values'}
                        </span>
                    </div>
                </div>
                <div style={{ marginTop: 10, padding: '8px 12px', borderRadius: 8, background: 'rgba(14,165,233,0.04)', fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Lightbulb size={12} style={{ color: 'var(--color-primary)' }} />
                    Using: <strong style={{ color: selectedConcept.color, marginLeft: 2, fontFamily: 'Georgia, serif' }}>{selectedConcept.formula}</strong>
                </div>
            </motion.div>

            {/* AI Physics Tutor Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                    padding: 28, marginBottom: 24, borderRadius: 20,
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(236, 72, 153, 0.06), rgba(139, 92, 246, 0.04))',
                    border: '1px solid rgba(139, 92, 246, 0.15)',
                    position: 'relative', overflow: 'hidden',
                }}
            >
                {/* Decorative background orbs */}
                <div style={{
                    position: 'absolute', top: -40, right: -40,
                    width: 160, height: 160, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: -30, left: -30,
                    width: 120, height: 120, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, position: 'relative', zIndex: 1 }}>
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                        style={{
                            width: 56, height: 56, borderRadius: 18, flexShrink: 0,
                            background: 'linear-gradient(135deg, #6366F1, #EC4899)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.3)',
                        }}
                    >
                        <BrainCircuit size={28} style={{ color: 'white' }} />
                    </motion.div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
                            AI Physics <span style={{ backgroundImage: 'linear-gradient(135deg, #6366F1, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tutor</span>
                        </h3>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                            Got a question about <strong style={{ color: selectedConcept.color }}>{selectedConcept.title}</strong>? Ask the AI tutor to explain equations, solve problems, and connect physics to real-world medical technology.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
                            {[
                                { icon: MessageCircle, label: 'Ask Questions', desc: 'Get instant explanations' },
                                { icon: Calculator, label: 'Solve Problems', desc: 'Step-by-step solutions' },
                                { icon: Lightbulb, label: 'Learn Concepts', desc: 'Medical physics connected' },
                            ].map((feat, i) => {
                                const FIcon = feat.icon;
                                return (
                                    <div key={i} style={{
                                        padding: '10px 12px', borderRadius: 12,
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                    }}>
                                        <FIcon size={16} style={{ color: '#8B5CF6', marginBottom: 6 }} />
                                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{feat.label}</div>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{feat.desc}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            {(aiSuggestedPrompts[selectedConcept.id] || []).slice(0, 2).map((prompt, i) => (
                                <span key={i} style={{
                                    padding: '4px 10px', borderRadius: 8, fontSize: 11,
                                    background: `${selectedConcept.color}08`,
                                    border: `1px solid ${selectedConcept.color}15`,
                                    color: selectedConcept.color, fontStyle: 'italic',
                                }}>
                                    "{prompt}"
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>AI Tutor is online — Context: {selectedConcept.title}</span>
                    </div>
                    <span style={{ fontSize: 11, color: '#8B5CF6', fontWeight: 600 }}>Click the 🧠 button in the corner →</span>
                </div>
            </motion.div>

            {/* Physics Quiz — One at a Time */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card-static"
                style={{ padding: 28, marginBottom: 24, overflow: 'hidden' }}
            >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Target size={20} style={{ color: '#8B5CF6' }} />
                            Test Your <span className="gradient-text">Knowledge</span>
                        </h3>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                            {quizCompleted ? 'Quiz complete! See your results below.' : `Question ${currentQuestionIndex + 1} of ${quizQuestions.length} — randomly selected`}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {totalEvaluated > 0 && !quizCompleted && (
                            <span style={{
                                fontSize: 13, fontWeight: 700, padding: '5px 14px', borderRadius: 10,
                                background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(16,185,129,0.1))',
                                border: '1px solid rgba(99,102,241,0.15)',
                                color: '#10B981',
                            }}>
                                {quizScore}/{totalEvaluated} ✓
                            </span>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.05, rotate: 180 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleRestartQuiz}
                            title="New random questions"
                            style={{
                                width: 36, height: 36, borderRadius: 10, border: 'none',
                                background: 'rgba(139,92,246,0.08)', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#8B5CF6', transition: 'background 0.2s',
                            }}
                        >
                            <Shuffle size={15} />
                        </motion.button>
                    </div>
                </div>

                {/* Progress Dots */}
                {!quizCompleted && (
                    <div style={{ display: 'flex', gap: 6, marginBottom: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {quizQuestions.map((_, i) => {
                            const isAnswered = i in evaluatedQuestions;
                            const wasCorrect = evaluatedQuestions[i];
                            const isCurrent = i === currentQuestionIndex;
                            return (
                                <motion.button
                                    key={i}
                                    onClick={() => {
                                        setSlideDirection(i > currentQuestionIndex ? 'next' : 'prev');
                                        setCurrentQuestionIndex(i);
                                    }}
                                    whileHover={{ scale: 1.3 }}
                                    animate={{
                                        scale: isCurrent ? 1.2 : 1,
                                        background: isCurrent
                                            ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                                            : isAnswered
                                                ? wasCorrect ? '#10B981' : '#EF4444'
                                                : 'rgba(255,255,255,0.08)',
                                    }}
                                    style={{
                                        width: isCurrent ? 28 : 12,
                                        height: 12,
                                        borderRadius: 20,
                                        border: isCurrent ? '2px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.06)',
                                        cursor: 'pointer',
                                        transition: 'width 0.3s ease',
                                        padding: 0,
                                    }}
                                />
                            );
                        })}
                    </div>
                )}

                {/* Progress Bar */}
                {!quizCompleted && (
                    <div style={{ height: 3, borderRadius: 3, background: 'var(--bg-card)', marginBottom: 24, overflow: 'hidden' }}>
                        <motion.div
                            animate={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899)' }}
                        />
                    </div>
                )}

                {/* Question Card or Results */}
                <AnimatePresence mode="wait">
                    {quizCompleted ? (
                        /* ── Results Screen ── */
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                        >
                            {/* Score Circle */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                    style={{
                                        width: 120, height: 120, borderRadius: '50%',
                                        background: `conic-gradient(${quizScore >= quizQuestions.length * 0.7 ? '#10B981' : quizScore >= quizQuestions.length * 0.4 ? '#F59E0B' : '#EF4444'} ${(quizScore / quizQuestions.length) * 360}deg, rgba(255,255,255,0.05) 0deg)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        padding: 6,
                                    }}
                                >
                                    <div style={{
                                        width: '100%', height: '100%', borderRadius: '50%',
                                        background: 'var(--bg-primary, #0a0a14)',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Trophy size={22} style={{ color: quizScore >= quizQuestions.length * 0.7 ? '#10B981' : '#F59E0B', marginBottom: 4 }} />
                                        <span style={{ fontSize: 24, fontWeight: 900, color: 'var(--text-primary)' }}>{quizScore}/{quizQuestions.length}</span>
                                    </div>
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    style={{
                                        marginTop: 14, fontSize: 18, fontWeight: 800,
                                        backgroundImage: quizScore >= quizQuestions.length * 0.7
                                            ? 'linear-gradient(135deg, #10B981, #34D399)'
                                            : quizScore >= quizQuestions.length * 0.4
                                                ? 'linear-gradient(135deg, #F59E0B, #FBBF24)'
                                                : 'linear-gradient(135deg, #EF4444, #F87171)',
                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {quizScore === quizQuestions.length ? '🏆 Perfect Score!' : quizScore >= quizQuestions.length * 0.7 ? '⭐ Excellent Work!' : quizScore >= quizQuestions.length * 0.4 ? '💪 Good Effort!' : '📚 Keep Studying!'}
                                </motion.p>
                                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                                    You scored {Math.round((quizScore / quizQuestions.length) * 100)}% — {quizScore} correct out of {quizQuestions.length}
                                </p>
                            </div>

                            {/* Topic Breakdown */}
                            <div style={{
                                padding: 20, borderRadius: 16,
                                background: 'rgba(99,102,241,0.04)',
                                border: '1px solid rgba(99,102,241,0.1)',
                                marginBottom: 20,
                            }}>
                                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>📊 Topic Breakdown</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
                                    {Object.entries(getTopicStats()).map(([topic, stat], i) => {
                                        const concept = physicsConcepts.find(c => c.id === topic);
                                        const pct = Math.round((stat.correct / stat.total) * 100);
                                        return (
                                            <motion.div
                                                key={topic}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 + i * 0.08 }}
                                                style={{
                                                    padding: '10px 14px', borderRadius: 12,
                                                    background: 'var(--bg-card)',
                                                    border: `1px solid ${concept?.color || '#8B5CF6'}20`,
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                                    <span style={{ fontSize: 10, fontWeight: 700, color: concept?.color || '#8B5CF6', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                                        {topic === 'bloodpressure' ? 'BP' : topic === 'thermometry' ? 'Thermo' : topic.toUpperCase()}
                                                    </span>
                                                    <span style={{ fontSize: 12, fontWeight: 700, color: pct >= 70 ? '#10B981' : pct >= 40 ? '#F59E0B' : '#EF4444' }}>
                                                        {stat.correct}/{stat.total}
                                                    </span>
                                                </div>
                                                <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${pct}%` }}
                                                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                                                        style={{ height: '100%', borderRadius: 4, background: concept?.color || '#8B5CF6' }}
                                                    />
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Question Review (compact) */}
                            <div style={{
                                padding: 16, borderRadius: 14,
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid var(--border-color)',
                                maxHeight: 220, overflowY: 'auto',
                                marginBottom: 20,
                            }}>
                                <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: 'var(--text-muted)' }}>Review Answers</p>
                                {quizQuestions.map((q, i) => {
                                    const wasCorrect = evaluatedQuestions[i];
                                    return (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0',
                                            borderBottom: i < quizQuestions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                        }}>
                                            {wasCorrect
                                                ? <CheckCircle size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                                                : <XCircle size={14} style={{ color: '#EF4444', flexShrink: 0 }} />}
                                            <span style={{ fontSize: 11, color: 'var(--text-secondary)', flex: 1, lineHeight: 1.4 }}>{q.q}</span>
                                            {!wasCorrect && (
                                                <span style={{ fontSize: 10, color: '#10B981', fontWeight: 600, flexShrink: 0 }}>
                                                    {q.options[q.correct]}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={handleRestartQuiz}
                                    style={{
                                        padding: '12px 28px', borderRadius: 14, fontSize: 13, fontWeight: 700,
                                        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                                        color: 'white', border: 'none', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
                                    }}
                                >
                                    <Shuffle size={15} /> New Random Quiz
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => { setQuizCompleted(false); setCurrentQuestionIndex(0); }}
                                    className="btn-secondary"
                                    style={{ padding: '12px 28px', fontSize: 13 }}
                                >
                                    <RotateCcw size={14} style={{ marginRight: 6 }} /> Review Questions
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        /* ── Single Question Card ── */
                        <motion.div
                            key={`question-${currentQuestionIndex}`}
                            initial={{ opacity: 0, x: slideDirection === 'next' ? 80 : -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: slideDirection === 'next' ? -80 : 80 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {(() => {
                                const qi = currentQuestionIndex;
                                const q = quizQuestions[qi];
                                if (!q) return null;
                                const isEvaluated = qi in evaluatedQuestions;
                                const wasCorrect = evaluatedQuestions[qi];
                                const chosen = quizAnswers[qi];
                                const concept = physicsConcepts.find(c => c.id === q.topic);

                                return (
                                    <div style={{
                                        padding: 24, borderRadius: 18,
                                        background: isEvaluated
                                            ? wasCorrect ? 'rgba(16,185,129,0.03)' : 'rgba(239,68,68,0.03)'
                                            : 'var(--bg-card)',
                                        border: `1px solid ${isEvaluated ? (wasCorrect ? '#10B98120' : '#EF444420') : 'var(--border-color)'}`,
                                        transition: 'all 0.4s ease',
                                        minHeight: 280,
                                        display: 'flex', flexDirection: 'column',
                                    }}>
                                        {/* Question Header */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                                    <span style={{
                                                        fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 8,
                                                        background: `${concept?.color || '#8B5CF6'}15`,
                                                        color: concept?.color || '#8B5CF6',
                                                        textTransform: 'uppercase', letterSpacing: 0.8,
                                                    }}>
                                                        {concept?.title || q.topic}
                                                    </span>
                                                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                                                        Q{qi + 1} of {quizQuestions.length}
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.6, color: 'var(--text-primary)' }}>
                                                    {q.q}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Options */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                                            {q.options.map((opt, oi) => {
                                                const isSelected = chosen === oi;
                                                const showCorrect = isEvaluated && oi === q.correct;
                                                const showWrong = isEvaluated && isSelected && oi !== q.correct;
                                                const optionLetter = String.fromCharCode(65 + oi); // A, B, C, D
                                                return (
                                                    <motion.button
                                                        key={oi}
                                                        whileHover={!isEvaluated ? { scale: 1.015, x: 4 } : {}}
                                                        whileTap={!isEvaluated ? { scale: 0.985 } : {}}
                                                        onClick={() => {
                                                            if (isEvaluated) return;
                                                            setQuizAnswers(p => ({ ...p, [qi]: oi }));
                                                        }}
                                                        style={{
                                                            padding: '14px 18px', borderRadius: 14, fontSize: 14,
                                                            textAlign: 'left', fontFamily: 'inherit',
                                                            border: `1.5px solid ${showCorrect ? '#10B98150' : showWrong ? '#EF444450' : isSelected ? '#6366F150' : 'rgba(255,255,255,0.06)'}`,
                                                            background: showCorrect
                                                                ? 'rgba(16,185,129,0.08)'
                                                                : showWrong
                                                                    ? 'rgba(239,68,68,0.08)'
                                                                    : isSelected
                                                                        ? 'rgba(99,102,241,0.06)'
                                                                        : 'rgba(255,255,255,0.02)',
                                                            color: showCorrect ? '#10B981' : showWrong ? '#EF4444' : 'var(--text-secondary)',
                                                            cursor: isEvaluated ? 'default' : 'pointer',
                                                            fontWeight: isSelected || showCorrect ? 600 : 400,
                                                            display: 'flex', alignItems: 'center', gap: 12,
                                                            transition: 'all 0.3s ease',
                                                        }}
                                                    >
                                                        <span style={{
                                                            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: 12, fontWeight: 700,
                                                            background: showCorrect ? '#10B98118' : showWrong ? '#EF444418' : isSelected ? '#6366F118' : 'rgba(255,255,255,0.05)',
                                                            color: showCorrect ? '#10B981' : showWrong ? '#EF4444' : isSelected ? '#6366F1' : 'var(--text-muted)',
                                                        }}>
                                                            {showCorrect ? <CheckCircle size={14} /> : showWrong ? <XCircle size={14} /> : optionLetter}
                                                        </span>
                                                        {opt}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>

                                        {/* Feedback */}
                                        <AnimatePresence>
                                            {isEvaluated && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    style={{
                                                        marginTop: 16, padding: '12px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                                                        background: wasCorrect
                                                            ? 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(52,211,153,0.04))'
                                                            : 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(248,113,113,0.04))',
                                                        color: wasCorrect ? '#10B981' : '#EF4444',
                                                        display: 'flex', alignItems: 'center', gap: 8,
                                                        border: `1px solid ${wasCorrect ? '#10B98115' : '#EF444415'}`,
                                                    }}
                                                >
                                                    {wasCorrect
                                                        ? <><CheckCircle size={16} /> Correct! Well done 🎉</>
                                                        : <><XCircle size={16} /> Incorrect — the right answer is: <strong>{q.options[q.correct]}</strong></>}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Navigation Buttons */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handlePrevQuestion}
                                                disabled={currentQuestionIndex === 0}
                                                style={{
                                                    padding: '10px 18px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.06)',
                                                    color: currentQuestionIndex === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
                                                    cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                                                    display: 'flex', alignItems: 'center', gap: 6,
                                                    opacity: currentQuestionIndex === 0 ? 0.4 : 1,
                                                    fontFamily: 'inherit',
                                                }}
                                            >
                                                <ArrowLeft size={14} /> Previous
                                            </motion.button>

                                            <div style={{ display: 'flex', gap: 8 }}>
                                                {!isEvaluated && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => {
                                                            // Skip: mark as wrong, don't select
                                                            setEvaluatedQuestions(p => ({ ...p, [qi]: false }));
                                                        }}
                                                        style={{
                                                            padding: '10px 16px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                                                            background: 'rgba(255,255,255,0.03)',
                                                            border: '1px solid rgba(255,255,255,0.06)',
                                                            color: 'var(--text-muted)', cursor: 'pointer',
                                                            display: 'flex', alignItems: 'center', gap: 6,
                                                            fontFamily: 'inherit',
                                                        }}
                                                    >
                                                        <SkipForward size={13} /> Skip
                                                    </motion.button>
                                                )}

                                                {!isEvaluated && chosen !== undefined && (
                                                    <motion.button
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => {
                                                            setEvaluatedQuestions(p => ({ ...p, [qi]: chosen === q.correct }));
                                                        }}
                                                        style={{
                                                            padding: '10px 22px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                                                            background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
                                                            border: 'none',
                                                            color: '#000', cursor: 'pointer',
                                                            display: 'flex', alignItems: 'center', gap: 6,
                                                            boxShadow: '0 4px 16px rgba(245,158,11,0.3)',
                                                            fontFamily: 'inherit',
                                                        }}
                                                    >
                                                        <CheckCircle size={15} /> Check Answer
                                                    </motion.button>
                                                )}

                                                {isEvaluated && (
                                                    <motion.button
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={handleNextQuestion}
                                                        style={{
                                                            padding: '10px 22px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                                                            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                                                            border: 'none',
                                                            color: 'white', cursor: 'pointer',
                                                            display: 'flex', alignItems: 'center', gap: 6,
                                                            boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
                                                            fontFamily: 'inherit',
                                                        }}
                                                    >
                                                        {currentQuestionIndex === quizQuestions.length - 1 ? 'See Results' : 'Next'}
                                                        <ChevronRight size={16} />
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* All Physics Concepts Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: 32 }}
            >
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>
                    All Physics <span className="gradient-text">Concepts</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {physicsConcepts.map((concept, i) => {
                        const Icon = concept.icon;
                        const isExpanded = expandedCard === concept.id;
                        return (
                            <motion.div
                                key={concept.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="glass-card"
                                style={{ padding: 20, cursor: 'pointer' }}
                                onClick={() => {
                                    setExpandedCard(isExpanded ? null : concept.id);
                                    setSelectedConcept(concept);
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                                    <div style={{
                                        width: 42, height: 42, borderRadius: 12,
                                        background: concept.gradient,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Icon size={22} style={{ color: 'white' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontWeight: 700, fontSize: 15 }}>{concept.title}</h4>
                                        <span style={{ fontSize: 11, color: concept.color }}>{concept.physicsField}</span>
                                    </div>
                                    <ChevronDown
                                        size={16}
                                        style={{
                                            color: 'var(--text-muted)',
                                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                                            transition: 'transform 0.3s ease',
                                        }}
                                    />
                                </div>

                                {/* Formula preview */}
                                <div style={{
                                    padding: '8px 12px', borderRadius: 8,
                                    background: `${concept.color}08`,
                                    marginBottom: isExpanded ? 12 : 0,
                                }}>
                                    <span style={{
                                        fontSize: 16, fontWeight: 700, color: concept.color,
                                        fontFamily: 'Georgia, serif',
                                    }}>
                                        {concept.formula}
                                    </span>
                                </div>

                                {/* Expanded content */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>
                                                {concept.principle}
                                            </p>
                                            <div style={{
                                                padding: '8px 12px', borderRadius: 8,
                                                background: `rgba(14, 165, 233, 0.04)`,
                                                border: `1px solid rgba(14, 165, 233, 0.1)`,
                                                fontSize: 12, color: 'var(--text-secondary)',
                                            }}>
                                                <strong style={{ color: 'var(--color-primary)' }}>💊 Used in:</strong> {concept.medicalApplication}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Physics & HealthSync Connection */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card-static"
                style={{ padding: 28, marginBottom: 32 }}
            >
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>
                    How Physics Powers <span className="gradient-text">HealthSync</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {[
                        {
                            icon: Wind,
                            title: 'Biomechanics',
                            desc: 'Newton\'s Laws govern body movement. Our 3D Digital Twin uses physics-based modeling — joint torques (τ = r × F), center of mass calculations, and kinematic chains to simulate and track body symmetry.',
                            color: '#10B981',
                        },
                        {
                            icon: Activity,
                            title: 'Signal Processing',
                            desc: 'ECG, SpO₂, and vitals data use Fourier transforms (f(t) = Σ aₙcos(nωt)) to filter noise and extract meaningful physiological signals. Our vitals dashboard applies digital signal processing in real-time.',
                            color: '#0EA5E9',
                        },
                        {
                            icon: Eye,
                            title: 'Optics & AI Vision',
                            desc: 'Medical image analysis relies on optics (lens equations: 1/f = 1/u + 1/v) and computational physics. Our AI report analyzer uses convolutional neural networks inspired by visual cortex physics.',
                            color: '#8B5CF6',
                        },
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={i} style={{ padding: '16px', borderRadius: 14, background: `${item.color}06`, border: `1px solid ${item.color}15` }}>
                                <Icon size={20} style={{ color: item.color, marginBottom: 10 }} />
                                <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{item.title}</h4>
                                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Floating AI Physics Tutor */}
            <AIPhysicsTutor concept={selectedConcept} />
        </div>
    );
}
