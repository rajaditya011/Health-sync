export interface AbhaPatient {
    abhaId: string;
    name: string;
    phone: string;
    email: string;
    bloodGroup: string;
    medicalHistory?: string;
}

const firstNames = ["Rajesh", "Priya", "Amit", "Sneha", "Vikram", "Anjali", "Ravi", "Kavita", "Suresh", "Neha", "Rahul", "Pooja", "Arun", "Kiran", "Sanjay", "Ritu", "Deepak", "Asha", "Sunil", "Anita", "Vijay", "Manju", "Ajay", "Geeta", "Vinod", "Meena"];
const lastNames = ["Sharma", "Verma", "Patel", "Singh", "Kumar", "Gupta", "Das", "Rao", "Reddy", "Nair", "Menon", "Jain", "Bose", "Chauhan", "Yadav"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const conditions = [
    "Type 2 Diabetes Mellitus",
    "Hypertension",
    "Family history of Myocardial Infarction",
    "Asthma",
    "Hypothyroidism",
    "Past history of Tuberculosis",
    "Allergic to Penicillin",
    "Chronic Kidney Disease",
    "Osteoarthritis",
    "Hyperlipidemia"
];

function getRandom<T>(arr: T[], seed: number): T {
    // A simple deterministic pseudo-random function based on seed so hydration matches
    const x = Math.sin(seed++) * 10000;
    const rand = x - Math.floor(x);
    return arr[Math.floor(rand * arr.length)];
}

// Generate 50 deterministic mock users
const initialDatabase = Array.from({ length: 50 }).map((_, i) => {
    const idNum = (i + 1).toString().padStart(4, '0');
    
    // Deterministic random checks based on index to ensure SSR and Client match
    const seed = i + 1;
    const hasHistory = (Math.sin(seed * 100) * 10000 - Math.floor(Math.sin(seed * 100) * 10000)) > 0.4; 
    
    return {
        abhaId: `91-0000-0000-${idNum}`,
        name: `${getRandom(firstNames, seed)} ${getRandom(lastNames, seed + 1)}`,
        phone: `+91 98${(Math.floor((Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000)) * 100000000)).toString().padStart(8, '0')}`,
        email: `patient${idNum}@example.com`,
        bloodGroup: getRandom(bloodGroups, seed + 2),
        medicalHistory: hasHistory ? getRandom(conditions, seed + 3) : undefined
    };
});

export let abhaDatabase: AbhaPatient[] = [...initialDatabase];

// If we are in the browser, try to load from localStorage to preserve edits
if (typeof window !== 'undefined') {
    try {
        const stored = localStorage.getItem('abhaDatabase_v1');
        if (stored) {
            abhaDatabase = JSON.parse(stored);
        }
    } catch(e) {}
}

export function getPatientByAbhaId(abhaId: string): AbhaPatient | undefined {
    return abhaDatabase.find(p => p.abhaId === abhaId);
}

export function updateAbhaRecord(abhaId: string, updates: Partial<AbhaPatient>) {
    const idx = abhaDatabase.findIndex(p => p.abhaId === abhaId);
    if (idx !== -1) {
        abhaDatabase[idx] = { ...abhaDatabase[idx], ...updates };
        
        // Try to persist to localStorage if possible, so it survives hard refreshes
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('abhaDatabase_v1', JSON.stringify(abhaDatabase));
            } catch(e) {}
        }
    }
}
