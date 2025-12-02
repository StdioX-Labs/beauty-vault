'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-between">
                    {/* Fancy Double Line Border Bottom */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="h-[1px] bg-black opacity-30" />
                        <div className="h-[1px] bg-black opacity-20 mt-[2px]" />
                    </div>
                    {/* Spacer for layout balance on mobile */}
                    <div className="w-10 sm:w-0" />

                    {/* Centered Logo */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Image
                            src="/logos/vault.png"
                            alt="The Beauty Vault"
                            width={2000}
                            height={600}
                            className="h-49 sm:h-49 w-auto invert"
                            priority
                        />
                    </div>

                    {/* Hamburger Menu */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex flex-col gap-1.5 p-2 sm:p-2.5 md:p-3 hover:bg-zinc-100 rounded-lg transition-colors group z-10"
                        aria-label="Toggle menu"
                    >
                        <span className={`w-5 sm:w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-5 sm:w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-5 sm:w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Side Menu */}
            <div
                className={`fixed inset-0 w-full h-full bg-black z-50 transform transition-all duration-700 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
            >
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '60px 60px'
                }} />

                <div className="relative h-full flex items-center justify-center p-8 sm:p-16 overflow-y-auto">
                    {/* Close Button - Prominent */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed top-8 right-8 sm:top-12 sm:right-12 p-3 sm:p-4 hover:bg-white/10 rounded-full transition-all duration-500 group border border-white/20 backdrop-blur-sm z-10"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-all duration-700 group-hover:rotate-180 group-hover:scale-110"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Centered Content Container */}
                    <div className="flex flex-col items-center justify-center w-full">
                        {/* Header Section */}
                        <div className="mb-8 sm:mb-10 md:mb-12 text-center animate-[fadeIn_0.8s_ease-out]">


                            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-italianno)] text-white mb-2 sm:mb-3">
                                Menu
                            </h2>

                            <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] text-white/60 uppercase font-light">
                                Explore Our Services
                            </p>
                        </div>

                        {/* Navigation Links - Centered */}
                        <nav className="flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3 max-w-2xl w-full mb-8 sm:mb-10 md:mb-12">
                            <a
                                href="#lashes"
                                className="group relative w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 hover:text-white transition-all duration-500 text-center overflow-hidden"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="relative z-10 tracking-wide font-light">Lashes By Shazz</span>
                                <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-white/30 transition-all duration-500" />
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-lg" />
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-[1px] bg-white/40 group-hover:w-12 transition-all duration-500" />
                            </a>

                            <a
                                href="#hair"
                                className="group relative w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 hover:text-white transition-all duration-500 text-center overflow-hidden"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="relative z-10 tracking-wide font-light">Shash Hair Salon</span>
                                <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-white/30 transition-all duration-500" />
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-lg" />
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-[1px] bg-white/40 group-hover:w-12 transition-all duration-500" />
                            </a>

                            <a
                                href="#aesthetics"
                                className="group relative w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 hover:text-white transition-all duration-500 text-center overflow-hidden"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="relative z-10 tracking-wide font-light">Revive Aesthetics</span>
                                <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-white/30 transition-all duration-500" />
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-lg" />
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-[1px] bg-white/40 group-hover:w-12 transition-all duration-500" />
                            </a>

                            <a
                                href="#contact"
                                className="group relative w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 hover:text-white transition-all duration-500 text-center overflow-hidden mt-3 sm:mt-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="relative z-10 tracking-wide font-light">Contact Us</span>
                                <div className="absolute inset-0 border border-white/20 rounded-lg group-hover:border-white/40 transition-all duration-500" />
                                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-all duration-500 rounded-lg" />
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-[1px] bg-white/50 group-hover:w-12 transition-all duration-500" />
                            </a>
                        </nav>


                    </div>
                </div>
            </div>
        </>
    );
}
