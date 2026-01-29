'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function AboutBeautyVault() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Floating Navigation */}
            <nav className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isScrolled ? 'scale-95' : ''} px-4 w-full max-w-[95vw] sm:w-auto`}>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl">
                    <div className="flex items-center justify-between sm:justify-center gap-3 sm:gap-8">
                        <a
                            href="/"
                            className="flex items-center gap-1.5 sm:gap-2 text-white/80 hover:text-white transition-colors group"
                        >
                            <svg
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-[10px] sm:text-xs tracking-wider uppercase font-medium">Home</span>
                        </a>

                        <a href="#brands" className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-white/80 hover:text-white transition-colors">
                            Our Brands
                        </a>
                        <a href="#training" className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-white/80 hover:text-white transition-colors">
                            Training
                        </a>
                        <a
                            href="#book"
                            className="px-3.5 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-white to-gray-200 text-gray-900 rounded-full hover:shadow-lg hover:shadow-white/50 transition-all duration-300 text-[10px] sm:text-xs tracking-wider uppercase font-semibold whitespace-nowrap"
                        >
                            Book Now
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-0">
                {/* Background with Overlay */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 mix-blend-overlay" />
                </div>

                {/* Floating geometric shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
                    {/* Logo */}
                    <div className="mb-8 sm:mb-12 flex justify-center">
                        <Image
                            src="/logos/vault.png"
                            alt="The Beauty Vault"
                            width={500}
                            height={150}
                            className="h-16 sm:h-20 md:h-28 lg:h-36 w-auto drop-shadow-2xl"
                            priority
                        />
                    </div>

                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-white" />
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                        <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gray-300 font-light px-2">
                            Your All-in-One Beauty Home
                        </p>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-white" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-[family-name:var(--font-italianno)] text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
                        Fast. Smooth.<br />Beautiful.
                    </h1>

                    <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-4">
                        Kenya's bold, modern beauty ecosystem designed to give you a faster, smoother, and more enjoyable beauty experience.
                        Four powerful brands under one roof — creating a centralized beauty home where quality, convenience, and confidence are guaranteed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                        <a
                            href="#brands"
                            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-white to-gray-200 text-gray-900 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/50 hover:scale-105"
                        >
                            <span className="relative z-10 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2">
                                Explore Our Brands
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </a>

                        <a
                            href="#book"
                            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border border-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-500 hover:bg-white/10 hover:border-white/50 hover:shadow-xl hover:scale-105"
                        >
                            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
                                Book Your Experience
                            </span>
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5 sm:p-2">
                        <div className="w-0.5 sm:w-1 h-1.5 sm:h-2 bg-white/50 rounded-full" />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white" />
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-gray-300 font-light">
                                About The Beauty Vault
                            </p>
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                            Where Every<br />Beauty Need Lives
                        </h2>
                    </div>

                    <div className="space-y-8 text-lg text-white/70 font-light leading-relaxed max-w-4xl mx-auto mb-20">
                        <p>
                            Welcome to <span className="text-white font-medium">THE BEAUTY VAULT</span> — Kenya's bold, modern beauty ecosystem
                            designed to give you a faster, smoother, and more enjoyable beauty experience.
                        </p>
                        <p>
                            We bring together four powerful brands under one roof — <span className="text-pink-300">Lashes by Shazz</span>,
                            <span className="text-amber-300"> Shasha Hair</span>, <span className="text-white">Revive Aesthetics</span>,
                            and <span className="text-purple-300"> LBS Beauty</span> — creating a centralized beauty home where quality,
                            convenience, and confidence are guaranteed.
                        </p>
                        <p className="text-xl text-white font-medium">
                            We exist to eliminate beauty stress.
                        </p>
                        <p>
                            No more running around town. No more inconsistent results. No more complicated beauty routines.
                        </p>
                        <p>
                            At The Beauty Vault, everything is engineered for speed, ease, and exceptional results — supported by expert professionals,
                            high-end products, and an Afro-urban touch that makes every visit unforgettable.
                        </p>
                    </div>

                    {/* Why Choose Us */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', text: 'All your beauty needs in one place' },
                            { icon: 'M13 10V3L4 14h7v7l9-11h-7z', text: 'Faster appointments & smoother processes' },
                            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: 'Certified experts across all departments' },
                            { icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', text: 'Consistent results every time' },
                            { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', text: 'A premium Afro-urban experience' },
                            { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', text: 'A safe, warm, customer-centered environment' },
                            { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', text: 'Access to curated beauty products & aftercare' },
                            { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', text: 'Training opportunities for beginners & pros' }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-500 text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                                    </svg>
                                </div>
                                <p className="text-white/80 font-light text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Brands Section */}
            <section id="brands" className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white" />
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-gray-300 font-light">
                                Our Brands
                            </p>
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-4">
                            Four Brands.<br />One Home.
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Lashes by Shazz */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-500">
                            <div className="mb-6">
                                <Image
                                    src="/logos/lashes.png"
                                    alt="Lashes By Shazz"
                                    width={200}
                                    height={60}
                                    className="h-12 w-auto opacity-80"
                                    style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(290deg)' }}
                                />
                            </div>
                            <p className="text-white/70 font-light mb-6 leading-relaxed">
                                Premier lash artistry and spa experience.
                            </p>
                            <ul className="space-y-3 text-white/60 font-light text-sm mb-8">
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-300">•</span>
                                    <span>Classic | Hybrid | Volume | Mega Volume</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-300">•</span>
                                    <span>Fills | Removals</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-300">•</span>
                                    <span>Masterclasses</span>
                                </li>
                            </ul>
                            <a href="/lashes" className="inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300">
                                Explore Lashes
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>

                        {/* Shasha Hair */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:bg-white/10 hover:border-amber-300/30 transition-all duration-500">
                            <div className="mb-6">
                                <Image
                                    src="/logos/shash-logo.png"
                                    alt="Shasha Hair"
                                    width={200}
                                    height={60}
                                    className="h-12 w-auto opacity-80"
                                />
                            </div>
                            <p className="text-white/70 font-light mb-6 leading-relaxed">
                                Ready-to-wear wigs. No stress, just good hair.
                            </p>
                            <ul className="space-y-3 text-white/60 font-light text-sm mb-8">
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-300">•</span>
                                    <span>Peruvian-quality lace wigs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-300">•</span>
                                    <span>Wig styling | Wig maintenance</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-300">•</span>
                                    <span>Wig fittings</span>
                                </li>
                            </ul>
                            <a href="/hair" className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300">
                                Explore Hair
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>

                        {/* Revive Aesthetics */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:bg-white/10 hover:border-white/30 transition-all duration-500">
                            <div className="mb-6">
                                <Image
                                    src="/logos/revive.png"
                                    alt="Revive Aesthetics"
                                    width={200}
                                    height={60}
                                    className="h-12 w-auto opacity-80"
                                />
                            </div>
                            <p className="text-white/70 font-light mb-6 leading-relaxed">
                                Afro-urban beauty and wellbeing redefined.
                            </p>
                            <ul className="space-y-3 text-white/60 font-light text-sm mb-8">
                                <li className="flex items-start gap-2">
                                    <span className="text-white">•</span>
                                    <span>Laser hair removal | Teeth whitening | Facials</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-white">•</span>
                                    <span>Acne care | Pigmentation | Tattoo removal</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-white">•</span>
                                    <span>Skin tightening | Stretch marks | Keloids</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-white">•</span>
                                    <span>Dark lips lightening | Aftercare</span>
                                </li>
                            </ul>
                            <a href="/aesthetics" className="inline-flex items-center gap-2 text-white hover:text-gray-300 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300">
                                Explore Aesthetics
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>

                        {/* LBS Beauty */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:bg-white/10 hover:border-purple-300/30 transition-all duration-500">
                            <div className="mb-6">
                                <h3 className="text-3xl font-[family-name:var(--font-italianno)] text-white">LBS Beauty</h3>
                            </div>
                            <p className="text-white/70 font-light mb-6 leading-relaxed">
                                Professional makeup for every moment.
                            </p>
                            <ul className="space-y-3 text-white/60 font-light text-sm mb-8">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-300">•</span>
                                    <span>Simple glam | Full glam</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-300">•</span>
                                    <span>Events | Birthdays | Corporate</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-300">•</span>
                                    <span>Bridal</span>
                                </li>
                            </ul>
                            <a href="#book" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300">
                                Book Makeup
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Training & Masterclasses Section */}
            <section id="training" className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white" />
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-gray-300 font-light">
                                Training & Masterclasses
                            </p>
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                            Empower Your<br />Beauty Career
                        </h2>
                        <p className="text-lg text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                            We empower upcoming beauty professionals with practical, expert-led training.
                        </p>
                        <p className="text-white font-medium mt-4">
                            Hands-on. Real results. Industry-level skills.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Lash Artistry', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
                            { title: 'Wig Styling', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                            { title: 'Professional Makeup', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
                            { title: 'Aesthetics Fundamentals', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' }
                        ].map((course, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center mb-6 mx-auto">
                                    <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={course.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-light text-white mb-3">{course.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who We Serve Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white" />
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-gray-300 font-light">
                                Who We Serve
                            </p>
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-4">
                            Built For<br />Everyone
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            'Working professionals',
                            'Students',
                            'Brides',
                            'Corporate clients',
                            'Beauty lovers',
                            'Event clients',
                            'Wellness-focused men',
                            'Anyone seeking convenience'
                        ].map((client, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-500 text-center">
                                <div className="text-3xl mb-3">✨</div>
                                <p className="text-white/80 font-light text-sm">{client}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-xl text-white font-light">
                            Anyone seeking convenience, quality, and consistent beauty results — all in one home.
                        </p>
                    </div>
                </div>
            </section>

            {/* Book Section */}
            <section id="book" className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 sm:p-16">
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                            Ready to<br />Glow?
                        </h2>
                        <p className="text-xl text-white/70 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
                            Book your next appointment with any of our departments and experience the future of beauty in Nairobi.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                            <a
                                href="https://wa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-10 py-5 bg-gradient-to-r from-white to-gray-200 text-gray-900 rounded-full hover:shadow-2xl hover:shadow-white/50 transition-all duration-500 hover:scale-105"
                            >
                                <span className="text-sm tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    Book via WhatsApp
                                </span>
                            </a>

                            <a
                                href="tel:+254"
                                className="px-10 py-5 border border-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-500 hover:bg-white/10 hover:border-white/50 hover:shadow-xl hover:scale-105"
                            >
                                <span className="text-sm tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call Us
                                </span>
                            </a>
                        </div>

                        <div className="border-t border-white/10 pt-8">
                            <p className="text-white/60 font-light mb-4">Visit us in Nairobi, Kenya</p>
                            <p className="text-white/80 font-light italic text-lg">
                                You deserve beauty made easy — and we engineered it.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative border-t border-white/10 py-12">
                <div className="absolute inset-0 bg-black" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center">
                        <p className="text-white/60 font-light text-sm mb-4">
                            The Beauty Vault © 2026. All rights reserved.
                        </p>
                        <p className="text-white/40 font-light text-xs italic mb-2">
                            Fast. Smooth. Beautiful.
                        </p>
                        <p className="text-white/40 font-light text-xs italic">
                            Where every beauty need lives.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

