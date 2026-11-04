'use client';

import Image from 'next/image';
import Navbar from '../components/Navbar';
import BlendBg from '@/lib/BlendBg';
import { SiteFooter } from '@/lib/old-site/SiteShell';
import { useState, useEffect } from 'react';

export default function ReviveAesthetics() {
    const [isScrolled, setIsScrolled] = useState(false);
    const bookingUrl = 'https://booking.revive.co.ke/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Revive Aesthetics price list (KES). "from" = starting price, "pack" = price for 3 sessions.
    const OFFER_PERCENT = 20; // current offer: 20% off all Revive services
    const sale = (n: number) => Math.round(n * (100 - OFFER_PERCENT) / 100);
    const offerOn = OFFER_PERCENT > 0;
    const fmt = (n: number) => `KES ${n.toLocaleString('en-KE')}`;
    const treatments = [
        { name: 'Teeth whitening', price: 10000, note: 'per session', pack: 25000 },
        { name: 'Permanent vaginal tightening', price: 5500, note: 'per session', pack: 15000 },
        { name: 'Dark lips removal', price: 3500, note: 'per session', pack: 9000 },
        { name: 'Tattoo removal', price: 3500, from: true },
        { name: 'Permanent laser hair removal', price: 3500, from: true },
        { name: 'Pimple / acne treatment', price: 7500, note: 'per session', pack: 20000 },
        { name: 'Eyebrows tattoo removal', price: 3500, note: 'per session', pack: 9000 },
        { name: 'Scar removal', price: 3500, from: true },
        { name: 'Sun burn / pigmentation treatment', price: 5000, note: 'per session', pack: 12000 },
        { name: 'Skin tag removal', price: 2000, from: true },
        { name: 'Stretch marks removal', price: 3500, from: true },
        { name: 'Keloids removal', price: 3500, from: true },
        { name: 'Birthmark removal', price: 3500, from: true },
        { name: 'Skin mole removal', price: 2000, from: true },
    ];
    const facials = [
        { name: 'Monthly facial', price: 3500, pack: 9000 },
        { name: 'Hydra facial', price: 5000, pack: 12000 },
        { name: 'Carbon facial', price: 7500, pack: 19500 },
        { name: 'Eye spa', price: 2500 },
        { name: 'Skin analysis', price: 500 },
    ];

    return (
        <div className="min-h-screen bg-[#04210d] text-white overflow-hidden">
            {/* Floating Navigation */}
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-0">
                {/* Background with Overlay */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#031a0a] via-[#0b3d1e] to-[#031a0a]" />
                    <BlendBg src="/bg/home-aesthetics.webp" side="right" opacity={0.55} />
                    <BlendBg src="/bg/about-hero.webp" side="left" opacity={0.3} className="hidden sm:block" />
                    {/* Artistic overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1d7a3e]/30 via-transparent to-[#1d7a3e]/15 mix-blend-overlay" />
                </div>

                {/* Floating geometric shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#1d7a3e]/25 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1d7a3e]/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#1d7a3e]/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#c08a35]" />
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#c08a35] rounded-full" />
                        <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#e0bd74] font-light px-2">
                            Afro-Urban Beauty & Wellbeing Redefined
                        </p>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#c08a35] rounded-full" />
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#c08a35]" />
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

                    {offerOn && (<a href="#services" className="inline-block mb-8 px-5 py-2 rounded-full border border-[#e0bd74]/60 bg-[#0b3d1e]/70 backdrop-blur text-xs tracking-[0.25em] uppercase text-white">
                        {OFFER_PERCENT}% off all services
                    </a>)}

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                        <a
                            href={bookingUrl}
                            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#f7f9ee] to-[#e9d9a8] text-[#052b10] rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/50 hover:scale-105"
                        >
                            <span className="relative z-10 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2">
                                Book Consultation
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#e9d9a8] to-[#f7f9ee] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
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
                <div className="absolute inset-0 bg-gradient-to-b from-[#031a0a] via-[#0b3d1e] to-[#031a0a]" />
                <BlendBg src="/bg/page-package.webp" side="left" opacity={0.3} />

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c08a35]" />
                            <div className="w-2 h-2 bg-[#c08a35] rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-[#e0bd74] font-light">
                                About REVIVE
                            </p>
                            <div className="w-2 h-2 bg-[#c08a35] rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c08a35]" />
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
                                <div className="w-12 h-12 bg-gradient-to-br from-[#e9c27a] to-[#c08a35] rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-[#052b10]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="absolute inset-0 bg-gradient-to-b from-[#031a0a] via-[#0b3d1e] to-[#031a0a]" />
                <BlendBg src="/bg/page-post.webp" side="right" opacity={0.22} />

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c08a35]" />
                            <div className="w-2 h-2 bg-[#c08a35] rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-[#e0bd74] font-light">
                                Our Services
                            </p>
                            <div className="w-2 h-2 bg-[#c08a35] rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c08a35]" />
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-4">
                            Transform Your<br />Beauty Journey
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
                            From laser treatments to rejuvenating facials — experience the REVIVE difference
                        </p>
                    </div>

                    {/* Offer banner */}
                    {offerOn && (
                    <div className="relative mb-14 overflow-hidden rounded-3xl border border-[#e0bd74]/60 bg-gradient-to-r from-[#0f5a2a] via-[#18823f] to-[#0f5a2a] px-6 py-8 sm:px-12 sm:py-10 text-center shadow-[0_20px_60px_-15px_rgba(24,130,63,0.6)]">
                        <div aria-hidden className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-[#e9c27a]/25 blur-3xl" />
                        <div aria-hidden className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#e9c27a]/25 blur-3xl" />
                        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
                            <p className="font-[family-name:var(--font-italianno)] text-7xl sm:text-8xl leading-none text-[#f6e3b0]">{OFFER_PERCENT}% off</p>
                            <div className="text-center sm:text-left">
                                <p className="text-xs tracking-[0.35em] uppercase text-[#f6e3b0]">Special offer</p>
                                <p className="mt-2 text-xl sm:text-2xl font-light text-white">On all Revive Aesthetics services</p>
                                <p className="mt-1 text-sm text-white/85">The prices below already include the discount.</p>
                            </div>
                        </div>
                    </div>
                    )}

                    <div className="grid gap-12 lg:grid-cols-5">
                        <div className="lg:col-span-3">
                            <h3 className="text-xs tracking-[0.3em] uppercase text-[#e0bd74] mb-6">Treatments</h3>
                            <ul className="divide-y divide-white/10 border-y border-white/10">
                                {treatments.map((t) => (
                                    <li key={t.name} className="flex items-baseline justify-between gap-6 py-4">
                                        <span className="text-white font-light">{t.name}</span>
                                        <span className="text-right whitespace-nowrap">
                                            {offerOn && <span className="text-white/40 line-through text-sm mr-2">{t.from ? 'From ' : ''}{fmt(t.price)}</span>}
                                            <span className="text-white">{t.from ? 'From ' : ''}{fmt(sale(t.price))}</span>
                                            {t.note && <span className="text-white/45 text-xs"> {t.note}</span>}
                                            {t.pack && (
                                                <span className="block text-xs text-white/55">
                                                    {offerOn && <span className="line-through text-white/35 mr-1">{fmt(t.pack)}</span>}
                                                    {fmt(sale(t.pack))} for 3 sessions
                                                </span>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:col-span-2">
                            <h3 className="text-xs tracking-[0.3em] uppercase text-[#e0bd74] mb-6">Facials</h3>
                            <ul className="divide-y divide-white/10 border-y border-white/10">
                                {facials.map((f) => (
                                    <li key={f.name} className="flex items-baseline justify-between gap-6 py-4">
                                        <span className="text-white font-light">{f.name}</span>
                                        <span className="text-right whitespace-nowrap">
                                            {offerOn && <span className="text-white/40 line-through text-sm mr-2">{fmt(f.price)}</span>}
                                            <span className="text-white">{fmt(sale(f.price))}</span>
                                            {f.pack && (
                                                <span className="block text-xs text-white/55">
                                                    {offerOn && <span className="line-through text-white/35 mr-1">{fmt(f.pack)}</span>}
                                                    {fmt(sale(f.pack))} for 3 sessions
                                                </span>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={bookingUrl}
                                className="mt-8 inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#f7f9ee] to-[#e9d9a8] text-[#052b10] text-xs tracking-[0.2em] uppercase font-semibold"
                            >
                                Book Consultation
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Serve Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#031a0a] via-[#0b3d1e] to-[#031a0a]" />
                <BlendBg src="/bg/page-service.webp" side="right" opacity={0.3} />

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c08a35]" />
                            <div className="w-2 h-2 bg-[#c08a35] rounded-full" />
                            <p className="text-xs tracking-[0.4em] uppercase text-[#e0bd74] font-light">
                                Who We Serve
                            </p>
                            <div className="w-2 h-2 bg-[#c08a35] rounded-full" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c08a35]" />
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
                <div className="absolute inset-0 bg-gradient-to-b from-[#031a0a] via-[#0b3d1e] to-[#031a0a]" />
                <BlendBg src="/bg/home-aesthetics.webp" side="left" opacity={0.3} />

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
                                href="tel:+254799715196"
                                className="group px-10 py-5 bg-gradient-to-r from-[#f7f9ee] to-[#e9d9a8] text-[#052b10] rounded-full hover:shadow-2xl hover:shadow-white/50 transition-all duration-500 hover:scale-105"
                            >
                                <span className="text-sm tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call 0799 715 196
                                </span>
                            </a>
                            
                            <a
                                href="https://wa.me/254799715196"
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
                                <span>B12, Silverpool Suite, Jabavu Lane, Nairobi</span>
                                <span>•</span>
                                <span>Mon - Sat: 9AM - 7PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <SiteFooter />
        </div>
    );
}

