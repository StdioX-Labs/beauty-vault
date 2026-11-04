'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LashMenu from './LashMenu';
import Navbar from '../components/Navbar';
import { SiteFooter } from '@/lib/old-site/SiteShell';

export default function LashesByShazz() {
    const [isScrolled, setIsScrolled] = useState(false);
    const lashesBookingUrl = 'https://booking.lashesbyshazz.com/';

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
            <Navbar />

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
                            Lashes by Shazz · UV Lash Specialists
                        </p>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-300 rounded-full" />
                        <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-pink-300" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-italianno)] text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
                        The #1 UV Lash Parlour<br />&amp; Trainers in Kenya
                    </h1>

                    <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-4">
                        Instant curing, no irritation, no fumes and 4 to 6 weeks retention. Discover UV lashes in Nairobi.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                        <a
                            href={lashesBookingUrl}
                            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-pink-300/50 hover:scale-105"
                            target="_blank"
                            rel="noopener noreferrer"
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
                            href="#uv-lashes"
                            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border border-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-500 hover:bg-white/10 hover:border-white/50 hover:shadow-xl hover:scale-105"
                        >
                            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
                                Why UV Lashes
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

            <LashMenu bookingUrl={lashesBookingUrl} />

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
                            href="tel:+254769781771"
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
                            href="https://wa.me/254769781771"
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
                            <h4 className="font-light text-lg mb-2 text-gray-900 tracking-wide">Contact Us</h4>
                            <p className="text-gray-900/80 text-sm">Hurlingham +254 769 781 771<br />CBD +254 792 066 140</p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-light text-lg mb-2 text-gray-900 tracking-wide">Email</h4>
                            <p className="text-gray-900/80 text-sm">lashesbyshazz001@gmail.com</p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6">
                            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="font-light text-lg mb-2 text-gray-900 tracking-wide">Address</h4>
                            <p className="text-gray-900/80 text-sm">Silverpool Suite, Jabavu Lane · Absa Towers, Lower Ground (Loita Street)</p>
                        </div>
                    </div>
                </div>
            </section>
            <SiteFooter />
        </div>
    );
}

