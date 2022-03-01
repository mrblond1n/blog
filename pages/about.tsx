import {ROUTES} from '@/routes';
import Link from 'next/link';
import React from 'react';

const About = () => (
    <div>
        <h1>{'About page'}</h1>
        <Link href={ROUTES.HOME}>{'Example transition to HOME'}</Link>
    </div>
);

export default About;
