'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const bookingUrl = 'https://booking.reveive.co.ke/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isScrolled ? 'scale-95' : ''} px-4 w-full max-w-[95vw] sm:w-auto`}>
            <div className="bg-white/90 backdrop-blur-xl border border-black/10 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl">
                <div className="flex items-center justify-between sm:justify-center gap-3 sm:gap-8">
                    <Link
                        href="/"
                        className="text-xs tracking-wider uppercase font-medium text-black/70 hover:text-black transition-colors"
                    >
                        Home
                    </Link>

                    <Link
                        href="/lashes"
                        className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-black/70 hover:text-black transition-colors"
                    >
                        Lashes
                    </Link>

                    <Link
                        href="/hair"
                        className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-black/70 hover:text-black transition-colors"
                    >
                        Hair
                    </Link>

                    <Link
                        href="/aesthetics"
                        className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-black/70 hover:text-black transition-colors"
                    >
                        Aesthetics
                    </Link>

                    <Link
                        href="/about"
                        className="hidden md:inline text-xs tracking-wider uppercase font-medium text-black/70 hover:text-black transition-colors"
                    >
                        About
                    </Link>

                    <a
                        href={bookingUrl}
                        className="px-3.5 sm:px-5 py-1.5 sm:py-2 bg-black text-white rounded-full hover:bg-zinc-800 transition-all duration-300 text-[10px] sm:text-xs tracking-wider uppercase font-semibold whitespace-nowrap"
                    >
                        Book Now
                    </a>
                </div>
            </div>
        </nav>
    );
}
