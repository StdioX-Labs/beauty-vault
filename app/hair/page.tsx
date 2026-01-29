'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ShashaHairSalon() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const wigStyles = [
        {
            title: 'Sleek Bobs',
            description: 'Pre-styled, ready-to-wear bob units.',
            icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        },
        {
            title: 'Straight Units',
            description: 'Sleek straight styles, ready to wear.',
            icon: 'M13 10V3L4 14h7v7l9-11h-7z'
        },
        {
            title: 'Soft Curls',
            description: 'Pre-styled curl patterns.',
            icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
        },
        {
            title: 'Body Wave & Textured',
            description: 'Natural wave and texture styles.',
            icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        },
        {
            title: 'Natural Everyday Styles',
            description: 'Versatile everyday wear.',
            icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
            title: 'Glam Statement Wigs',
            description: 'Limited drops & seasonal styles.',
            icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        }
    ];

    const features = [
        {
            title: 'Ready to Wear',
            description: 'No customization needed — unbox and go',
            icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
            title: 'Beginner-Friendly',
            description: 'Easy to wear, even for first-timers',
            icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        },
        {
            title: 'Natural Finish',
            description: 'Pre-plucked hairlines that look real',
            icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        },
        {
            title: 'Quality-Checked',
            description: 'Every wig inspected before delivery',
            icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
        },
        {
            title: 'Comfortable',
            description: 'Secure, breathable, all-day wear',
            icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
        },
        {
            title: 'Honest Pricing',
            description: 'No surprises, just fair value',
            icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        }
    ];

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

                        <a href="#collection" className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-white/80 hover:text-white transition-colors">
                            Collection
                        </a>
                        <a href="/about" className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-white/80 hover:text-white transition-colors">
                            About
                        </a>
                        <a
                            href="#shop"
                            className="px-3.5 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-amber-200 to-yellow-300 text-gray-900 rounded-full hover:shadow-lg hover:shadow-amber-300/50 transition-all duration-300 text-[10px] sm:text-xs tracking-wider uppercase font-semibold whitespace-nowrap"
                        >
                            Shop Now
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
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/10 via-transparent to-yellow-300/10 mix-blend-overlay" />
                </div>

                {/* Floating geometric shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-amber-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
                    {/* Logo */}
                    <div className="mb-8 sm:mb-12 flex justify-center">
                        <Image
                            src="/logos/shash-logo.png"
                            alt="SHASHA HAIR"
                            width={500}
                            height={150}
                            className="h-16 sm:h-20 md:h-28 lg:h-36 w-auto drop-shadow-2xl"
                            priority
                        />
                    </div>

                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-amber-300" />
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-300 rounded-full" />
                        <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-amber-200 font-light px-2">
                            Ready-to-Wear Wigs | No Stress, Just Good Hair
                        </p>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-300 rounded-full" />
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-amber-300" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-[family-name:var(--font-italianno)] text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
                        Good Hair<br />Shouldn't Be Hard
                    </h1>

                    <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 font-light px-4">
                        Modern ready-to-wear wigs for women who want to look polished, confident,
                        and put-together — without spending hours in the salon.
                    </p>
                    <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-amber-200 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-4">
                        Unbox it. Put it on. Step out.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                        <a
                            href="#shop"
                            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-amber-200 to-yellow-300 text-gray-900 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-amber-300/50 hover:scale-105"
                        >
                            <span className="relative z-10 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2">
                                Shop Ready-to-Wear Wigs
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-amber-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </a>

                        <a
                            href="#about"
                            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border border-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-500 hover:bg-white/10 hover:border-white/50 hover:shadow-xl hover:scale-105"
                        >
                            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
                                Learn More
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
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300" />
                            <div className="w-2 h-2 bg-amber-300 rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-amber-200 font-light">
                                Who We Are
                            </p>
                            <div className="w-2 h-2 bg-amber-300 rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                            Effortless Hair.<br />Instant Confidence.
                        </h2>
                        <p className="text-lg text-white/70 max-w-4xl mx-auto font-light leading-relaxed">
                            SHASHA HAIR was created to solve one problem: Women love wigs — but hate the process.
                            From glue stress to bad fittings and wigs that don't match photos, the experience can be
                            frustrating and expensive.
                        </p>
                        <p className="text-lg text-white/70 max-w-4xl mx-auto font-light leading-relaxed mt-6">
                            We decided to do it differently.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {features.map((feature, index) => (
                            <div key={index} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-amber-300/30 transition-all duration-500 text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-light text-white mb-3 tracking-wide">{feature.title}</h3>
                                <p className="text-white/60 text-sm font-light">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Philosophy */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center max-w-4xl mx-auto">
                        <h3 className="text-3xl font-[family-name:var(--font-italianno)] text-white mb-6">Our Philosophy</h3>
                        <p className="text-2xl text-amber-200 font-light mb-6">GOOD + COST-EFFECTIVE = VALUE</p>
                        <p className="text-lg text-white/80 font-light leading-relaxed">
                            We believe beauty should fit into your life, respect your time, be consistent in quality,
                            and feel worth every shilling. Our focus is not luxury for show — but luxury that works.
                        </p>
                    </div>
                </div>
            </section>

            {/* Collection Section */}
            <section id="collection" className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300" />
                            <div className="w-2 h-2 bg-amber-300 rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-amber-200 font-light">
                                Our Collection
                            </p>
                            <div className="w-2 h-2 bg-amber-300 rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-4">
                            Ready-to-Wear<br />Perfection
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
                            Each SHASHA HAIR wig is professionally pre-styled, pre-plucked for natural hairlines,
                            pre-cut where necessary, and quality-checked before delivery.
                        </p>
                        <p className="text-amber-200 mt-4 font-medium">
                            You don't need a stylist to wear our wigs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wigStyles.map((style, index) => (
                            <div key={index} className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-amber-300/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-300/20">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                                <div className="relative">
                                    <div className="mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={style.icon} />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-light text-white mb-3 tracking-wide">{style.title}</h3>
                                        <p className="text-white/60 mb-6 leading-relaxed text-sm font-light">
                                            {style.description}
                                        </p>
                                    </div>
                                    <a
                                        href="#shop"
                                        className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 font-light tracking-wider uppercase text-xs group-hover:gap-3 transition-all duration-300"
                                    >
                                        View Styles
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Special Note */}
                    <div className="mt-12 text-center">
                        <p className="text-white/60 font-light text-sm">
                            Limited drops & seasonal styles available
                        </p>
                    </div>
                </div>
            </section>

            {/* Who We Serve Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300" />
                            <div className="w-2 h-2 bg-amber-300 rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-amber-200 font-light">
                                Who We Serve
                            </p>
                            <div className="w-2 h-2 bg-amber-300 rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-4">
                            For Women Who<br />Value Their Time
                        </h2>
                        <p className="text-lg text-white/70 max-w-3xl mx-auto font-light">
                            SHASHA HAIR is for women who want to look good without doing the most.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            'Busy professionals',
                            'University & college students',
                            'First-time wig wearers',
                            'Women on protective styles',
                            'Travelers & on-the-go lifestyles',
                            'Glam girls who value convenience',
                            'Career women',
                            'Style enthusiasts'
                        ].map((client, index) => (
                            <div key={index} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-amber-300/30 transition-all duration-500 text-center">
                                <div className="text-3xl mb-3">✨</div>
                                <p className="text-white/80 font-light text-sm">{client}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-xl text-amber-200 font-light italic">
                            If time matters to you, this brand is for you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Care & Support Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                            The SHASHA HAIR<br />Experience
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-amber-300/30 transition-all duration-500">
                            <h3 className="text-2xl font-light text-white mb-6">Every Client Deserves</h3>
                            <ul className="space-y-4 text-white/70 font-light">
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-300 text-xl">✓</span>
                                    <span>Clear communication</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-300 text-xl">✓</span>
                                    <span>Honest expectations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-300 text-xl">✓</span>
                                    <span>Support before and after purchase</span>
                                </li>
                            </ul>
                            <p className="text-white/60 font-light text-sm mt-6 italic">
                                Whether it's your first wig or your fifth, we guide you every step.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-amber-300/30 transition-all duration-500">
                            <h3 className="text-2xl font-light text-white mb-6">Care & Maintenance</h3>
                            <p className="text-white/70 font-light mb-6">
                                We don't just sell wigs — we help you maintain them.
                            </p>
                            <ul className="space-y-4 text-white/70 font-light">
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-300 text-xl">✓</span>
                                    <span>Basic wig care guidance</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-300 text-xl">✓</span>
                                    <span>Styling tips</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-300 text-xl">✓</span>
                                    <span>Maintenance recommendations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-amber-300 text-xl">✓</span>
                                    <span>Optional in-house wig servicing</span>
                                </li>
                            </ul>
                            <p className="text-white/60 font-light text-sm mt-6 italic">
                                Your wig should last — and still look good.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beauty Vault Ecosystem */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
                        <div className="mb-8">
                            <Image
                                src="/logos/vault.png"
                                alt="The Beauty Vault"
                                width={200}
                                height={80}
                                className="h-16 w-auto mx-auto opacity-80"
                            />
                        </div>
                        <h3 className="text-3xl font-[family-name:var(--font-italianno)] text-white mb-6">
                            Part of The Beauty Vault Ecosystem
                        </h3>
                        <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
                            SHASHA HAIR is proudly part of The Beauty Vault — a beauty and wellness ecosystem designed
                            to offer convenient, bundled, and value-driven beauty solutions under one roof.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                            {['Hair', 'Lashes', 'Makeup', 'Aesthetics', 'Beauty Bundles'].map((service, index) => (
                                <div key={index} className="bg-white/5 rounded-full px-4 py-2">
                                    <p className="text-white/80 font-light text-sm">{service}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-amber-200 font-light italic">
                            One ecosystem. One standard. One experience.
                        </p>
                    </div>
                </div>
            </section>

            {/* Shop Section */}
            <section id="shop" className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 sm:p-16">
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                            Your Next Good<br />Hair Day Starts Here
                        </h2>
                        <p className="text-xl text-white/70 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
                            Ready to experience effortless hair? Browse our collection and find your perfect wig.
                        </p>

                        {/* How to Shop */}
                        <div className="grid md:grid-cols-4 gap-6 mb-12">
                            {[
                                { num: '1', text: 'Browse our Ready-to-Wear Collection' },
                                { num: '2', text: 'Select your preferred style' },
                                { num: '3', text: 'Order online or via WhatsApp' },
                                { num: '4', text: 'Receive your wig — ready to wear' }
                            ].map((step, index) => (
                                <div key={index} className="bg-white/5 rounded-2xl p-6 text-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-gray-900 font-bold text-xl">{step.num}</span>
                                    </div>
                                    <p className="text-white/70 font-light text-sm">{step.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                            <a
                                href="https://wa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-10 py-5 bg-gradient-to-r from-amber-200 to-yellow-300 text-gray-900 rounded-full hover:shadow-2xl hover:shadow-amber-300/50 transition-all duration-500 hover:scale-105"
                            >
                                <span className="text-sm tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    Order via WhatsApp
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
                            <p className="text-white/60 font-light mb-4">
                                <span className="text-amber-300">📦</span> Nationwide delivery available
                            </p>
                            <p className="text-white/60 font-light mb-4">
                                <span className="text-amber-300">📍</span> Visit us in Nairobi, Kenya
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
                            SHASHA HAIR © 2026. All rights reserved.
                        </p>
                        <p className="text-white/40 font-light text-xs italic">
                            Effortless Hair. Instant Confidence.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

