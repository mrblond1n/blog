import Link from 'next/link';
import React from 'react';
import {ROUTES} from '@/routes';

function HomePage() {
    return (
        <div>
            <h1>{'Welcome to Next.js!'}</h1>
            <Link href={ROUTES.ABOUT}>{'Example transition to ABOUT'}</Link>
        </div>
    );
}

export default HomePage;
