'use client';
import React from 'react';
import { useRouter } from 'next/router';

const page = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>{id}</div>
    );
}

export default page;