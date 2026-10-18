const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate realistic vitals for the last 14 days
const generateMockVitals = (userId) => {
    const vitals = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = d.toISOString().split('T')[0];
        
        // BP
        const sys = 118 + Math.floor(Math.sin(i * 0.7) * 7);
        const dia = 78 + Math.floor(Math.cos(i * 0.7) * 5);
        vitals.push({ id: `bp-${i}`, userId, type: 'bp', value: `${sys}/${dia}`, unit: 'mmHg', date: dateStr, time: '08:30 AM' });
        
        // Heart Rate
        const hr = 72 + Math.floor(Math.sin(i * 1.2) * 6);
        vitals.push({ id: `hr-${i}`, userId, type: 'heartRate', value: `${hr}`, unit: 'bpm', date: dateStr, time: '08:32 AM' });
        
        // Blood Sugar
        const sugar = 98 + Math.floor(Math.cos(i * 0.9) * 8);
        vitals.push({ id: `sugar-${i}`, userId, type: 'sugar', value: `${sugar}`, unit: 'mg/dL', date: dateStr, time: '08:45 AM' });
        
        // SpO2
        const spo2 = 98 + (i % 3 === 0 ? 1 : 0);
        vitals.push({ id: `spo2-${i}`, userId, type: 'spo2', value: `${spo2}`, unit: '%', date: dateStr, time: '08:35 AM' });
        
        // Temperature
        const temp = (98.4 + Math.sin(i) * 0.3).toFixed(1);
        vitals.push({ id: `temp-${i}`, userId, type: 'temperature', value: `${temp}`, unit: '°F', date: dateStr, time: '08:31 AM' });
        
        // Weight
        const weight = (71.8 - (13 - i) * 0.08).toFixed(1);
        vitals.push({ id: `weight-${i}`, userId, type: 'weight', value: `${weight}`, unit: 'kg', date: dateStr, time: '08:30 AM' });
    }
    return vitals;
};

const mockUser = {
    id: 'user1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@healthsync.com',
    phone: '+91 98765 43210',
    age: '32',
    gender: 'Male',
    activityLevel: 'Moderate',
    existingConditions: ['Mild Hypertension', 'Seasonal Allergies'],
    healthGoals: ['Cardiovascular Optimization', 'Stress Reduction', 'Post-Op Recovery'],
    language: 'en',
    theme: 'dark',
    location: 'New Delhi, India',
    intent: 'diagnosed',
    onboardingComplete: true,
    createdAt: '2026-09-01T10:00:00.000Z'
};

const mockDoctor = {
    id: 'doc1',
    name: 'Dr. Priya Sharma',
    email: 'priya@healthsync.com',
    specialty: 'Nephrologist & Internal Medicine',
    hospital: 'AIIMS Delhi',
    experience: '15 yrs',
    image: 'PS'
};

const mockDigitalTwinChat = [
    {
        id: 'msg-1',
        role: 'user',
        content: "I've been feeling a localized tightness in my chest when working out, along with mild stiffness in my left shoulder.",
        timestamp: '10:14 AM'
    },
    {
        id: 'msg-2',
        role: 'ai',
        content: "I have mapped these symptoms onto your **3D Digital Twin**:\n- **Chest**: Moderate concern (cardio-pulmonary strain flag)\n- **Left Shoulder**: Mild musculoskeletal stress\n\nYour resting heart rate is **72 bpm** and blood pressure is currently **118/78 mmHg**, which is stable. However, given the exertional nature of chest tightness, I recommend an ECG telemetry review with Dr. Priya Sharma and temporarily pausing high-intensity workouts.",
        timestamp: '10:15 AM'
    }
];

const mockKioskSummaries = [
    {
        id: 'kiosk-01',
        userId: 'user1',
        patientName: 'Aarav Sharma',
        abhaId: '91-4829-1092-4821',
        date: new Date().toISOString(),
        consultationType: 'Allopathic',
        chiefComplaint: 'Intermittent chest tightness and left shoulder discomfort post-exercise',
        hpi: 'Patient reports 4-day history of exertional discomfort. Non-radiating, resolves within 10 minutes of rest.',
        pastMedicalHistory: 'Mild Hypertension (controlled), Appendectomy (2019)',
        drugAllergyHistory: 'Penicillin (mild rash)',
        reviewOfSystems: 'Cardiovascular: Tightness noted. Respiratory: Normal. Neurological: Normal.',
        prakriti: 'Pitta-Vata',
        redFlags: ['Exertional chest symptom — rule out angina'],
    },
    {
        id: 'kiosk-02',
        userId: 'user2',
        patientName: 'Kavita Sundaram',
        abhaId: '91-8832-4411-9012',
        date: new Date(Date.now() - 3600000).toISOString(),
        consultationType: 'Allopathic',
        chiefComplaint: 'Routine Type-2 Diabetes follow-up and HbA1c review',
        hpi: 'Last fasting glucose 104 mg/dL. Compliant with Metformin 500mg twice daily.',
        pastMedicalHistory: 'Type-2 Diabetes (3 yrs)',
        drugAllergyHistory: 'None known',
        reviewOfSystems: 'Endocrine: Stable glycemic control. Vision: Clear.',
        redFlags: []
    }
];

const mockAppointments = [
    {
        id: 'apt-01',
        userId: 'user1',
        doctorId: 'doc1',
        doctorName: 'Dr. Priya Sharma',
        specialty: 'Nephrologist',
        date: new Date().toISOString().split('T')[0],
        time: '10:30 AM',
        status: 'booked',
        location: 'Virtual Teleconsult (Room #4)',
        notes: 'Review exertional symptoms & recent vitals trend'
    },
    {
        id: 'apt-02',
        userId: 'user2',
        doctorId: 'doc1',
        doctorName: 'Dr. Priya Sharma',
        specialty: 'Nephrologist',
        date: new Date().toISOString().split('T')[0],
        time: '11:15 AM',
        status: 'booked',
        location: 'OPD AIIMS Delhi Room 204',
        notes: 'Quarterly renal panel & urinalysis'
    },
    {
        id: 'apt-03',
        userId: 'user3',
        doctorId: 'doc1',
        doctorName: 'Dr. Priya Sharma',
        specialty: 'Nephrologist',
        date: new Date().toISOString().split('T')[0],
        time: '02:00 PM',
        status: 'booked',
        location: 'Virtual Teleconsult',
        notes: 'Electrolyte balance check'
    }
];

const mockPrescriptions = [
    {
        id: 'rx-1',
        userId: 'user1',
        doctorId: 'doc1',
        doctorName: 'Dr. Priya Sharma',
        recipientUserId: 'user1',
        medicine: 'Telmisartan 40mg',
        dosage: '1 tablet',
        frequency: 'Once daily (morning)',
        instructions: 'Take after breakfast with water. Monitor BP weekly.',
        date: new Date().toISOString().split('T')[0],
        status: 'active'
    },
    {
        id: 'rx-2',
        userId: 'user1',
        doctorId: 'doc1',
        doctorName: 'Dr. Priya Sharma',
        recipientUserId: 'user1',
        medicine: 'CoQ10 100mg',
        dosage: '1 capsule',
        frequency: 'Once daily',
        instructions: 'Cardiovascular antioxidant support.',
        date: new Date().toISOString().split('T')[0],
        status: 'active'
    }
];

const mockJourneys = [
    {
        id: 'journey-01',
        userId: 'user1',
        title: 'Cardiovascular Optimization & Recovery Plan',
        condition: 'Exertional Chest Strain & Hypertension',
        status: 'active',
        triageLevel: 'amber',
        progress: 72,
        startDate: '2026-09-10',
        endDate: '2026-09-24',
        timeline: [
            { id: 't1', day: 1, title: 'Initial Clinical Triage & Baseline ECG', description: 'Complete 12-lead ECG telemetry and resting vitals capture.', status: 'completed', type: 'checkup' },
            { id: 't2', day: 3, title: 'Start Low-Sodium DASH Nutrition Protocol', description: 'Limit sodium <1,500mg/day, increase dietary potassium.', status: 'completed', type: 'diet' },
            { id: 't3', day: 5, title: 'Targeted Blood Pressure Stabilization', description: 'Begin Telmisartan 40mg with daily automated morning logging.', status: 'completed', type: 'medication' },
            { id: 't4', day: 8, title: 'Low-Intensity Aerobic Zone-2 Walking', description: '30-minute daily zone 2 walking maintaining HR under 115 bpm.', status: 'completed', type: 'exercise' },
            { id: 't5', day: 11, title: 'Mid-Journey Telehealth Consultation', description: 'Virtual review of 10-day ambulatory BP trends with Dr. Sharma.', status: 'completed', type: 'checkup' },
            { id: 't6', day: 14, title: 'Holter Monitor & Stress Echo Follow-Up', description: 'Evaluate exertional tolerance and update maintenance regimen.', status: 'active', type: 'checkup' }
        ],
        medications: [
            { id: 'm1', name: 'Telmisartan 40mg', dosage: '1 Tab', frequency: 'Once Daily', time: ['08:00 AM'], takenToday: true },
            { id: 'm2', name: 'CoQ10 100mg', dosage: '1 Cap', frequency: 'Once Daily', time: ['01:00 PM'], takenToday: true }
        ],
        dietPlan: [
            { name: 'Oatmeal with Blueberries & Walnuts', time: 'Breakfast', notes: 'High soluble fiber, rich in antioxidants' },
            { name: 'Steamed Salmon with Spinach & Quinoa', time: 'Lunch', notes: 'Omega-3 fatty acids for arterial elasticity' },
            { name: 'Chamomile Tea & Roasted Pumpkin Seeds', time: 'Evening', notes: 'Magnesium-rich for vascular relaxation' }
        ],
        doctorNotes: 'Patient responding well to ARB therapy. Resting systolic down from 134 to 118 mmHg. Continue zone-2 exercise protocol.',
        aiSummary: 'Cardiovascular parameters stabilizing favorably. 14-day adherence score is 94%. Recommended for transition to ongoing preventative monitoring.',
        verified: true
    }
];

const mockCallLogs = [
    { id: 'c-1', doctorId: 'doc1', userId: 'user1', patientName: 'Aarav Sharma', duration: '14m 20s', date: 'Today at 09:30 AM', type: 'video', status: 'completed' },
    { id: 'c-2', doctorId: 'doc1', userId: 'user2', patientName: 'Kavita Sundaram', duration: '9m 45s', date: 'Yesterday', type: 'video', status: 'completed' },
    { id: 'c-3', doctorId: 'doc1', userId: 'user3', patientName: 'Rohan Mehra', duration: '6m 12s', date: 'Sep 21', type: 'audio', status: 'completed' },
    { id: 'c-4', doctorId: 'doc1', userId: 'user4', patientName: 'Ananya Verma', duration: '11m 05s', date: 'Sep 20', type: 'video', status: 'completed' }
];

async function capture() {
    console.log('Starting Puppeteer browser...');
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1920,1080',
            '--force-device-scale-factor=2'
        ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    // Set initial storage
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.evaluate((user, doc, vitals, chat, kiosk, apts, rx, journeys, calls) => {
        localStorage.setItem('healthsync_current_user', JSON.stringify(user));
        localStorage.setItem('hs_current_doctor', JSON.stringify(doc));
        localStorage.setItem('healthsync_users', JSON.stringify([
            user,
            { id: 'user2', name: 'Kavita Sundaram', email: 'kavita@healthsync.com', phone: '+91 98112 33445', age: '45', gender: 'Female', onboardingComplete: true },
            { id: 'user3', name: 'Rohan Mehra', email: 'rohan.mehra@healthsync.com', phone: '+91 98450 11223', age: '38', gender: 'Male', onboardingComplete: true }
        ]));
        localStorage.setItem('hs_vitals_user1', JSON.stringify(vitals));
        localStorage.setItem('hs_dt_chat_user1', JSON.stringify(chat));
        localStorage.setItem('hs_dt_symptoms_user1', JSON.stringify({ Chest: 'moderate', 'Left Shoulder': 'mild' }));
        localStorage.setItem('hs_intake_user1', JSON.stringify(kiosk));
        localStorage.setItem('hs_appointments_user1', JSON.stringify(apts));
        localStorage.setItem('hs_appointments_user2', JSON.stringify([apts[1]]));
        localStorage.setItem('hs_appointments_user3', JSON.stringify([apts[2]]));
        localStorage.setItem('hs_prescriptions_user1', JSON.stringify(rx));
        localStorage.setItem('hs_journeys_user1', JSON.stringify(journeys));
        localStorage.setItem('hs_call_logs', JSON.stringify(calls));
        localStorage.setItem('hs_doctor_notes_doc1', JSON.stringify([
            { id: 'n1', patientName: 'Aarav Sharma', content: 'Patient reported chest tightness post-exercise. Vitals telemetry reviewed. BP well controlled. ECG scheduled.', date: new Date().toISOString() }
        ]));
        
        // Hospital emergency & radiology requests
        localStorage.setItem('healthsync_emergency_requests', JSON.stringify([
            { id: 'req-1', type: 'bed', patientName: 'Rajesh Kumar', ward: 'ICU (Bed 04)', status: 'Admitted', time: '15 mins ago' },
            { id: 'req-2', type: 'bed', patientName: 'Sunita Mehra', ward: 'Normal Ward', status: 'Pending', time: '30 mins ago' },
            { id: 'req-3', type: 'machine', patientName: 'Aarav Sharma', machine: 'Cardiac MRI', status: 'In Progress', time: '10 mins ago' },
            { id: 'req-4', type: 'machine', patientName: 'Vikram Seth', machine: '128-Slice CT', status: 'Completed', time: '45 mins ago' }
        ]));

        // Hospital pharmacy orders
        localStorage.setItem('user1_hs_orders', JSON.stringify([
            {
                id: 'ORD-8921',
                userId: 'user1',
                orderDate: new Date().toISOString(),
                items: [
                    { name: 'Telmisartan 40mg', quantity: 30, price: 140 },
                    { name: 'CoQ10 100mg Capsule', quantity: 30, price: 320 }
                ],
                totalAmount: 460,
                status: 'Processing'
            },
            {
                id: 'ORD-8840',
                userId: 'user1',
                orderDate: new Date(Date.now() - 86400000).toISOString(),
                items: [
                    { name: 'Digital Blood Pressure Monitor', quantity: 1, price: 1850 }
                ],
                totalAmount: 1850,
                status: 'Dispensed'
            }
        ]));

        document.documentElement.setAttribute('data-theme', 'dark');
    }, mockUser, mockDoctor, generateMockVitals('user1'), mockDigitalTwinChat, mockKioskSummaries, mockAppointments, mockPrescriptions, mockJourneys, mockCallLogs);

    const screens = [
        {
            name: '01_3D_Digital_Twin_Copilot.png',
            url: 'http://localhost:3000/journey/digital-twin',
            theme: 'dark',
            waitMs: 4000
        },
        {
            name: '02_Doctor_Clinical_Workstation.png',
            url: 'http://localhost:3000/doctor-dashboard',
            theme: 'dark',
            waitMs: 3500
        },
        {
            name: '03_Biometric_Telemetry_Vitals.png',
            url: 'http://localhost:3000/vitals',
            theme: 'dark',
            waitMs: 3000
        },
        {
            name: '04_AI_Recovery_Pathway.png',
            url: 'http://localhost:3000/recovery',
            theme: 'dark',
            waitMs: 3000
        },
        {
            name: '05_Hospital_Resource_Command_Grid.png',
            url: 'http://localhost:3000/hospital',
            theme: 'dark',
            waitMs: 3000
        },
        {
            name: '06_Platform_Landing_Experience.png',
            url: 'http://localhost:3000',
            theme: 'dark',
            waitMs: 3500
        }
    ];

    for (const s of screens) {
        console.log(`Capturing: ${s.name} from ${s.url}...`);
        await page.goto(s.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        
        // Hide dev badges and set theme
        await page.evaluate((thm) => {
            if (thm) document.documentElement.setAttribute('data-theme', thm);
            
            // Remove Next.js dev indicators and overlays
            const elements = document.querySelectorAll('nextjs-portal, [data-nextjs-toast], #next-route-announcer, [class*="next-dev"]');
            elements.forEach(el => el.remove());

            const style = document.createElement('style');
            style.textContent = `
                nextjs-portal, [data-nextjs-toast], #next-route-announcer, [class*="next-dev-overlay"], div[data-nextjs-dialog-overlay] {
                    display: none !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                    pointer-events: none !important;
                }
                /* Hide bottom-left fixed dev badge */
                div[style*="position: fixed"][style*="bottom: 0px"],
                div[style*="position: fixed"][style*="bottom: 12px"],
                div[style*="position: fixed"][style*="bottom: 16px"][style*="left: 16px"],
                div[style*="position: fixed"][style*="left: 0px"] {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }, s.theme);

        await new Promise(r => setTimeout(r, s.waitMs));
        const filePath = path.join(OUTPUT_DIR, s.name);
        await page.screenshot({ path: filePath, fullPage: false });
        console.log(`Saved screenshot to ${filePath}`);
    }

    await browser.close();
    console.log('All screenshots captured successfully!');
}

capture().catch(err => {
    console.error('Capture failed:', err);
    process.exit(1);
});

