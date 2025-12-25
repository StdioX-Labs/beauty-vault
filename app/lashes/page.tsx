'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LashesByShazz() {
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
                        <Link
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
                        </Link>

                        <a href="#services" className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-white/80 hover:text-white transition-colors">
                            Services
                        </a>
                        <a
                            href="#book"
                            className="px-3.5 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 rounded-full hover:shadow-lg hover:shadow-pink-300/50 transition-all duration-300 text-[10px] sm:text-xs tracking-wider uppercase font-semibold whitespace-nowrap"
                        >
                            Book Now
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Artistic with Image Background */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-0">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://eu2.contabostorage.com/b418dbb4d7c942e5b311c172a41d1db8:bv-kenya/9.jpg')`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
                    {/* Artistic overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/20 via-transparent to-rose-300/20 mix-blend-overlay" />
                </div>

                {/* Floating geometric shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
                    {/* Logo */}
                    <div className="mb-8 sm:mb-12 flex justify-center">
                        <Image
                            src="/logos/lashes.png"
                            alt="Lashes By Shazz"
                            width={500}
                            height={150}
                            className="h-16 sm:h-20 md:h-28 lg:h-36 w-auto drop-shadow-2xl"
                            style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(290deg)' }}
                            priority
                        />
                    </div>

                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-pink-300" />
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-300 rounded-full" />
                        <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-pink-200 font-light px-2">
                            Premier Lash Artistry & Spa
                        </p>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-300 rounded-full" />
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-pink-300" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-[family-name:var(--font-italianno)] text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
                        Where Beauty<br />Meets Artistry
                    </h1>

                    <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-4">
                        Immerse yourself in the ultimate luxury lash experience. Every extension is a brushstroke in the masterpiece of your beauty.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                        <a
                            href="#book"
                            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-pink-300/50 hover:scale-105"
                        >
                            <span className="relative z-10 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2">
                                Begin Your Journey
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-pink-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </a>

                        <a
                            href="#services"
                            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border border-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-500 hover:bg-white/10 hover:border-white/50 hover:shadow-xl hover:scale-105"
                        >
                            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
                                Explore Services
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

            {/* Services Section - Artistic with Background */}
            <section id="services" className="relative py-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://eu2.contabostorage.com/b418dbb4d7c942e5b311c172a41d1db8:bv-kenya/3.jpg')`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black/95" />
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-300/10 via-transparent to-rose-300/10" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300" />
                            <div className="w-2 h-2 bg-pink-300 rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-pink-200 font-light">
                                Signature Services
                            </p>
                            <div className="w-2 h-2 bg-pink-300 rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-4">
                            Curated Lash<br />Experiences
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
                            Each service is meticulously crafted to enhance your unique beauty
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Classic Lashes */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-300/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">Classic Lashes</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        One extension per natural lash for a natural, elegant enhancement that adds length and definition.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        From <span className="text-pink-300">KSh 3,500</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Reserve Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Volume Lashes */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-300/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">Volume Lashes</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        Multiple lightweight extensions per natural lash for dramatic fullness and glamorous volume.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        From <span className="text-pink-300">KSh 5,000</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Reserve Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Mega Volume Lashes */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-300/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">Mega Volume</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        Maximum drama with ultra-fine extensions creating the boldest, most voluminous look.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        From <span className="text-pink-300">KSh 6,500</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Reserve Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Hybrid Lashes */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-300/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">Hybrid Lashes</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        Perfect blend of classic and volume techniques for texture and fullness with natural elegance.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        From <span className="text-pink-300">KSh 4,500</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Reserve Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Lash Fill */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-300/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">Lash Fill</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        Maintain your beautiful lashes with regular fills every 2-3 weeks to keep them looking perfect.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        From <span className="text-pink-300">KSh 2,500</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Reserve Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Lash Removal */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-300/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-3 tracking-wide">Lash Removal</h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                        Safe and gentle professional removal service that protects your natural lashes.
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-6">
                                    <div className="text-3xl font-light text-white mb-4 tracking-tight">
                                        <span className="text-pink-300">KSh 1,500</span>
                                    </div>
                                    <a
                                        href="#book"
                                        className="inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        Reserve Now
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
                        className="absolute inset-0 bg-cover bg-top"
                        style={{
                            backgroundImage: `url('https://eu2.contabostorage.com/b418dbb4d7c942e5b311c172a41d1db8:bv-kenya/7.jpg')`,
                            backgroundPosition: 'center 20%',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300" />
                            <div className="w-2 h-2 bg-pink-300 rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-pink-200 font-light">
                                The Shazz Difference
                            </p>
                            <div className="w-2 h-2 bg-pink-300 rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                            Excellence<br />Redefined
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Card 1 */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-500">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-gradient-to-br from-pink-300 to-rose-300 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-light text-white mb-3 tracking-wide">Certified Excellence</h3>
                                    <p className="text-white/70 leading-relaxed text-base font-light">
                                        Expert artists with advanced international training and certification
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-500">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-gradient-to-br from-pink-300 to-rose-300 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-light text-white mb-3 tracking-wide">Premium Materials</h3>
                                    <p className="text-white/70 leading-relaxed text-base font-light">
                                        Only the finest hypoallergenic, medical-grade products
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-500">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-gradient-to-br from-pink-300 to-rose-300 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-light text-white mb-3 tracking-wide">Long-Lasting Beauty</h3>
                                    <p className="text-white/70 leading-relaxed text-base font-light">
                                        Stunning results that last 4-6 weeks with proper aftercare
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-pink-300/30 transition-all duration-500">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-gradient-to-br from-pink-300 to-rose-300 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-light text-white mb-3 tracking-wide">Personalized Care</h3>
                                    <p className="text-white/70 leading-relaxed text-base font-light">
                                        Custom designs tailored to your unique style and features
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
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://eu2.contabostorage.com/b418dbb4d7c942e5b311c172a41d1db8:bv-kenya/5.jpg')`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-300/95 via-rose-300/90 to-pink-400/95" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/50" />
                        <div className="w-2 h-2 bg-white/50 rounded-full" />
                        <p className="text-xs tracking-[0.4em] uppercase text-gray-900/80 font-light">
                            Begin Your Transformation
                        </p>
                        <div className="w-2 h-2 bg-white/50 rounded-full" />
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/50" />
                    </div>

                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-gray-900 mb-6">
                        Ready for<br />Stunning Lashes?
                    </h2>
                    <p className="text-xl mb-12 text-gray-900/90 font-light leading-relaxed max-w-2xl mx-auto">
                        Book your appointment today and experience the art of luxury lash extensions in our premier spa environment
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <a
                            href="tel:+254700000000"
                            className="group relative px-10 py-5 bg-gray-900 text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-900/30 hover:scale-105"
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
                            className="group relative px-10 py-5 border-2 border-gray-900 text-gray-900 rounded-full transition-all duration-500 hover:bg-gray-900 hover:text-white hover:shadow-2xl hover:shadow-gray-900/30 hover:scale-105"
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
                                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h4 className="font-light text-lg mb-2 text-gray-900 tracking-wide">Location</h4>
                            <p className="text-gray-900/80 text-sm">The Beauty Vault<br />Nairobi, Kenya</p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-light text-lg mb-2 text-gray-900 tracking-wide">Hours</h4>
                            <p className="text-gray-900/80 text-sm">Mon - Sat: 9AM - 7PM<br />Sunday: By Appointment</p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="font-light text-lg mb-2 text-gray-900 tracking-wide">Contact</h4>
                            <p className="text-gray-900/80 text-sm">+254 700 000 000<br />info@beautyvault.co.ke</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

