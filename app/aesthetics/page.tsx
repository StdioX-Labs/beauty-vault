'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ReviveAesthetics() {
    const [isScrolled, setIsScrolled] = useState(false);
    const bookingUrl = 'https://booking.reveive.co.ke/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const services = [
        {
            title: 'Teeth Whitening',
            description: 'Professional teeth whitening for a brighter, more confident smile.',
            price: 'From KSh 10,000',
            icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
            title: 'Vaginal Tightening',
            description: 'Safe, consent-based intimate wellness treatment.',
            price: 'From KSh 5,500',
            icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        },
        {
            title: 'Dark Lips Lightening',
            description: 'Restore natural lip color with advanced treatments.',
            price: 'From KSh 3,500',
            icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        },
        {
            title: 'Tattoo Removal',
            description: 'Safe laser tattoo removal with visible results.',
            price: 'From KSh 3,500',
            icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
        },
        {
            title: 'Laser Hair Removal',
            description: 'Permanent hair removal for smooth skin.',
            price: 'From KSh 3,500',
            icon: 'M13 10V3L4 14h7v7l9-11h-7z'
        },
        {
            title: 'Acne Treatment',
            description: 'Advanced treatment for clear, healthy skin.',
            price: 'From KSh 7,500',
            icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
            title: 'Eyebrow Tattoo Removal',
            description: 'Precise removal for natural-looking results.',
            price: 'From KSh 3,500',
            icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
        },
        {
            title: 'Scar Removal',
            description: 'Diminish scars with laser technology.',
            price: 'From KSh 3,500',
            icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
        },
        {
            title: 'Pigmentation Treatment',
            description: 'Even skin tone and reduce pigmentation.',
            price: 'From KSh 5,000',
            icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
        },
        {
            title: 'Skin Tag Removal',
            description: 'Quick removal of unwanted skin tags.',
            price: 'From KSh 2,000',
            icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
        },
        {
            title: 'Stretch Marks Reduction',
            description: 'Reduce appearance for smoother skin.',
            price: 'From KSh 3,500',
            icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
        },
        {
            title: 'Keloid Reduction',
            description: 'Advanced keloid treatment.',
            price: 'From KSh 3,500',
            icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        },
        {
            title: 'Birthmark Removal',
            description: 'Safe birthmark removal.',
            price: 'From KSh 3,500',
            icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        },
        {
            title: 'Skin Mole Removal',
            description: 'Professional mole removal.',
            price: 'From KSh 2,000',
            icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        },
        {
            title: 'Monthly Facial',
            description: 'Regular facial for healthy skin.',
            price: 'From KSh 2,500',
            icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
            title: 'Hydro Facial',
            description: 'Deep cleansing hydration facial.',
            price: 'From KSh 3,500',
            icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
        },
        {
            title: 'Carbon Facial',
            description: 'Carbon laser facial for rejuvenation.',
            price: 'From KSh 5,000',
            icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        },
        {
            title: 'Skin Tightening',
            description: 'RF/HIFU for firmer skin.',
            price: 'Contact for pricing',
            icon: 'M13 10V3L4 14h7v7l9-11h-7z'
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Launch Announcement Banner */}
            <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-white/10 py-2 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                    <span className="text-xs sm:text-sm tracking-wider uppercase text-white/90 font-light">
                        🚀 LAUNCHING FEBRUARY 28TH | REVIVE AESTHETICS - Where Your Transformation Begins | LAUNCHING FEBRUARY 28TH 🚀
                    </span>
                </div>
            </div>

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

                        <a href="#services" className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-white/80 hover:text-white transition-colors">
                            Services
                        </a>
                        <a href="/about" className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-white/80 hover:text-white transition-colors">
                            About
                        </a>
                        <a
                            href={bookingUrl}
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
                    {/* Artistic overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 mix-blend-overlay" />
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
                            src="/logos/revive.png"
                            alt="REVIVE Aesthetics"
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
                            Afro-Urban Beauty & Wellbeing Redefined
                        </p>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-white" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-[family-name:var(--font-italianno)] text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
                        Glow from<br />Within
                    </h1>

                    <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 font-light px-4">
                        Where science meets self-care. Where your confidence is restored.
                    </p>
                    <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-4">
                        Where your transformation begins.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                        <a
                            href={bookingUrl}
                            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-white to-gray-200 text-gray-900 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/50 hover:scale-105"
                        >
                            <span className="relative z-10 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2">
                                Book Consultation
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </a>

                        <a
                            href="#services"
                            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border border-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-500 hover:bg-white/10 hover:border-white/50 hover:shadow-xl hover:scale-105"
                        >
                            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
                                View Services
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
            <section id="about" className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white" />
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-gray-300 font-light">
                                About REVIVE
                            </p>
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                            Your Safe Space<br />to Glow
                        </h2>
                        <p className="text-lg text-white/70 max-w-4xl mx-auto font-light leading-relaxed">
                            REVIVE Aesthetics is an Afro-urban beauty and wellness studio created for the modern woman (and men who value grooming). 
                            We combine advanced aesthetic technology, certified professionals, and medical-grade products to deliver results that are 
                            safe, transformative, restorative, luxurious yet affordable, and confidence-boosting.
                        </p>
                        <p className="text-lg text-white/70 max-w-4xl mx-auto font-light leading-relaxed mt-6">
                            At REVIVE, every client is seen, valued, understood, and pampered — without judgement, intimidation, or fear of bad results.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {[
                            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Safe & Certified', desc: 'Certified professionals & clinical-grade equipment' },
                            { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Fast Results', desc: 'Advanced technology for visible transformation' },
                            { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Affordable Luxury', desc: 'Premium treatments at accessible prices' },
                            { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Afro-Urban Touch', desc: 'Tailored for African skin with care' }
                        ].map((feature, index) => (
                            <div key={index} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500 text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-light text-white mb-3 tracking-wide">{feature.title}</h3>
                                <p className="text-white/60 text-sm font-light">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Brand Promise */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center max-w-4xl mx-auto">
                        <h3 className="text-3xl font-[family-name:var(--font-italianno)] text-white mb-6">Our Brand Promise</h3>
                        <p className="text-xl text-white/80 font-light leading-relaxed">
                            We promise professional-grade results, painless treatments, and visible transformation you can trust. 
                            Whether you're struggling with acne, dealing with pigmentation, chasing flawless bridal skin, or simply 
                            investing in yourself — <span className="font-semibold text-white">REVIVE is your safe space to glow.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white" />
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-gray-300 font-light">
                                Our Services
                            </p>
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-4">
                            Transform Your<br />Beauty Journey
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
                            From laser treatments to rejuvenating facials — experience the REVIVE difference
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div key={index} className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-white/20">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                                <div className="relative">
                                    <div className="mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-light text-white mb-3 tracking-wide">{service.title}</h3>
                                        <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className="border-t border-white/10 pt-6">
                                        <div className="text-2xl font-light text-white mb-4">
                                            {service.price}
                                        </div>
                                        <a
                                            href={bookingUrl}
                                            className="inline-flex items-center gap-2 text-white hover:text-gray-300 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                        >
                                            Book Now
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who We Serve Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
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
                            Created for<br />You
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            'Women dealing with acne',
                            'Corporate professionals',
                            'Brides and bridal teams',
                            'Men seeking grooming',
                            'Influencers & media personalities',
                            'Wellness lovers',
                            'High-end yet value-conscious clientele',
                            'Anyone seeking transformation'
                        ].map((client, index) => (
                            <div key={index} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-500 text-center">
                                <div className="text-3xl mb-3">💛</div>
                                <p className="text-white/80 font-light text-sm">{client}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <section id="book" className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 sm:p-16">
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                            Begin Your<br />Transformation
                        </h2>
                        <p className="text-xl text-white/70 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
                            Book your consultation and discover how REVIVE can help you achieve the confident, radiant look you deserve.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                            <a
                                href="tel:+254"
                                className="group px-10 py-5 bg-gradient-to-r from-white to-gray-200 text-gray-900 rounded-full hover:shadow-2xl hover:shadow-white/50 transition-all duration-500 hover:scale-105"
                            >
                                <span className="text-sm tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call Now
                                </span>
                            </a>
                            
                            <a
                                href="https://wa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-10 py-5 border border-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-500 hover:bg-white/10 hover:border-white/50 hover:shadow-xl hover:scale-105"
                            >
                                <span className="text-sm tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    WhatsApp
                                </span>
                            </a>
                        </div>

                        <div className="border-t border-white/10 pt-8">
                            <p className="text-white/60 font-light mb-4">Visit us in Nairobi</p>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
                                <span>📍 Nairobi, Kenya</span>
                                <span>•</span>
                                <span>Mon - Sat: 9AM - 7PM</span>
                            </div>
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
                            REVIVE Aesthetics © 2026. All rights reserved.
                        </p>
                        <p className="text-white/40 font-light text-xs italic">
                            Glow from within.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

