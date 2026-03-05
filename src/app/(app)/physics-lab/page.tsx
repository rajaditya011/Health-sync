'use client';

import dynamic from 'next/dynamic';

const PhysicsLabContent = dynamic(() => import('./PhysicsLabContent'), { ssr: false });

export default function PhysicsLabPage() {
    return <PhysicsLabContent />;
}
