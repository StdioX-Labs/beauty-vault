'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ReviveAesthetics() {
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
                <div className="bg-white/10 backdrop-blur-xl border border-rose-400/20 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl shadow-rose-500/10">
                    <div className="flex items-center justify-between sm:justify-center gap-3 sm:gap-8">
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 sm:gap-2 text-white/80 hover:text-rose-300 transition-colors group"
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
                        </Link>

                        <a href="#services" className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-white/80 hover:text-rose-300 transition-colors">
                            Treatments
                        </a>
                        <a
                            href="#book"
                            className="px-3.5 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-full hover:shadow-lg hover:shadow-rose-500/50 transition-all duration-300 text-[10px] sm:text-xs tracking-wider uppercase font-semibold whitespace-nowrap"
                        >
                            Book Now
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Artistic with Image Background */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-0">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-black">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('https://eu2.contabostorage.com/b418dbb4d7c942e5b311c172a41d1db8:bv-kenya/5.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 40%',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                    {/* Smooth edge blending with vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
                    {/* Subtle side darkening */}
                    <div className="absolute inset-0"
                         style={{
                             background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.5) 100%)'
                         }}
                    />
                    {/* Artistic overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/15 via-transparent to-red-600/15 mix-blend-overlay" />
                </div>

                {/* Floating geometric shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
                    {/* Logo */}
                    <div className="mb-8 sm:mb-12 flex justify-center">
                        <Image
                            src="/logos/revive.png"
                            alt="Revive Aesthetics"
                            width={900}
                            height={250}
                            className="h-32 sm:h-36 md:h-44 lg:h-52 w-auto drop-shadow-2xl"
                            style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(320deg)' }}
                            priority
                        />
                    </div>

                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-rose-400" />
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-400 rounded-full" />
                        <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-rose-200 font-light px-2">
                            Advanced Aesthetic Medicine
                        </p>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-400 rounded-full" />
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-rose-400" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-[family-name:var(--font-italianno)] text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
                        Revive Your<br />Natural Beauty
                    </h1>

                    <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-4">
                        Experience the art of aesthetic medicine with our premium treatments designed to enhance and restore your natural radiance.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                        <a
                            href="#book"
                            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/50 hover:scale-105"
                        >
                            <span className="relative z-10 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2">
                                Book Consultation
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </a>

                        <a
                            href="#services"
                            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border border-rose-400/30 backdrop-blur-sm text-white rounded-full transition-all duration-500 hover:bg-rose-500/10 hover:border-rose-400/50 hover:shadow-xl hover:scale-105"
                        >
                            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
                                View Treatments
                            </span>
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-rose-400/30 rounded-full flex items-start justify-center p-1.5 sm:p-2">
                        <div className="w-0.5 sm:w-1 h-1.5 sm:h-2 bg-rose-400/50 rounded-full" />
                    </div>
                </div>
            </section>

            {/* Services Section - Artistic with Background */}
            <section id="services" className="relative py-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <div 
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('https://eu2.contabostorage.com/b418dbb4d7c942e5b311c172a41d1db8:bv-kenya/6.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 45%',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black/95" />
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 via-transparent to-red-600/10" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400" />
                            <div className="w-2 h-2 bg-rose-400 rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-rose-200 font-light">
                                Premium Treatments
                            </p>
                            <div className="w-2 h-2 bg-rose-400 rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-4">
                            Aesthetic<br />Treatments
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
                            Advanced procedures performed by certified aesthetic medicine specialists
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Dermal Fillers */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-rose-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">Dermal Fillers</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        Premium hyaluronic acid fillers to restore volume, smooth wrinkles, and enhance facial contours naturally.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        From <span className="text-rose-400">KSh 15,000</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Book Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Botox / Anti-Wrinkle */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-rose-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">Botox / Anti-Wrinkle</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        Reduce fine lines and wrinkles with precision botulinum toxin treatments for a refreshed, youthful appearance.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        From <span className="text-rose-400">KSh 12,000</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Book Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Skin Rejuvenation */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-rose-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">Skin Rejuvenation</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        Advanced skin treatments including chemical peels, microneedling, and laser therapy for radiant skin.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        From <span className="text-rose-400">KSh 8,000</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Book Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Lip Enhancement */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-rose-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">Lip Enhancement</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        Achieve fuller, perfectly shaped lips with our expert lip filler treatments for natural-looking results.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        From <span className="text-rose-400">KSh 18,000</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Book Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Thread Lift */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-rose-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">Thread Lift</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        Non-surgical facelift using PDO threads to lift and tighten sagging skin for instant rejuvenation.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        From <span className="text-rose-400">KSh 35,000</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Book Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* PRP Treatment */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-rose-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">PRP Treatment</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        Platelet-Rich Plasma therapy for skin rejuvenation, hair restoration, and natural collagen production.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        From <span className="text-rose-400">KSh 20,000</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Book Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section with Background */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover"
                        style={{
                            backgroundImage: `url('https://eu2.contabostorage.com/b418dbb4d7c942e5b311c172a41d1db8:bv-kenya/11.jpg')`,
                            backgroundPosition: 'center 40%',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400" />
                            <div className="w-2 h-2 bg-rose-400 rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-rose-200 font-light">
                                Why Choose Revive
                            </p>
                            <div className="w-2 h-2 bg-rose-400 rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                            Medical Grade<br />Excellence
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Card 1 */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-rose-500/30 transition-all duration-500">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-light text-white mb-3 tracking-wide">Certified Specialists</h3>
                                    <p className="text-white/70 leading-relaxed text-base font-light">
                                        Board-certified aesthetic doctors with extensive training in cosmetic procedures
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-rose-500/30 transition-all duration-500">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-light text-white mb-3 tracking-wide">Premium Products</h3>
                                    <p className="text-white/70 leading-relaxed text-base font-light">
                                        FDA-approved products from leading global brands for safety and efficacy
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-rose-500/30 transition-all duration-500">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-light text-white mb-3 tracking-wide">Natural Results</h3>
                                    <p className="text-white/70 leading-relaxed text-base font-light">
                                        Subtle enhancements that preserve your unique features and natural beauty
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-rose-500/30 transition-all duration-500">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-light text-white mb-3 tracking-wide">Safety First</h3>
                                    <p className="text-white/70 leading-relaxed text-base font-light">
                                        Stringent safety protocols and sterile environment for your peace of mind
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking CTA Section */}
            <section id="book" className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('https://eu2.contabostorage.com/b418dbb4d7c942e5b311c172a41d1db8:bv-kenya/10.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 45%',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/70 via-red-600/60 to-rose-600/70" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/50" />
                        <div className="w-2 h-2 bg-white/50 rounded-full" />
                        <p className="text-xs tracking-[0.4em] uppercase text-white/80 font-light">
                            Start Your Journey
                        </p>
                        <div className="w-2 h-2 bg-white/50 rounded-full" />
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/50" />
                    </div>

                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                        Ready to<br />Revive Your Beauty?
                    </h2>
                    <p className="text-xl mb-12 text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
                        Schedule a personalized consultation with our aesthetic specialists today
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <a
                            href="tel:+254700000000"
                            className="group relative px-10 py-5 bg-white text-gray-900 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/30 hover:scale-105"
                        >
                            <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-medium flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call to Book
                            </span>
                        </a>

                        <a
                            href="https://wa.me/254700000000"
                            className="group relative px-10 py-5 border-2 border-white text-white rounded-full transition-all duration-500 hover:bg-white hover:text-gray-900 hover:shadow-2xl hover:shadow-white/30 hover:scale-105"
                        >
                            <span className="text-sm tracking-[0.2em] uppercase font-medium flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                WhatsApp Us
                            </span>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h4 className="font-light text-lg mb-2 text-white tracking-wide">Location</h4>
                            <p className="text-white/80 text-sm">The Beauty Vault<br />Nairobi, Kenya</p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-light text-lg mb-2 text-white tracking-wide">Hours</h4>
                            <p className="text-white/80 text-sm">Mon - Sat: 9AM - 7PM<br />Sunday: By Appointment</p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="font-light text-lg mb-2 text-white tracking-wide">Contact</h4>
                            <p className="text-white/80 text-sm">+254 700 000 000<br />info@beautyvault.co.ke</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

