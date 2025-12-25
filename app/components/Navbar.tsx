'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {/* Announcement Banner - Horizontal Scrolling */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-zinc-900 via-black to-zinc-900 text-white py-2.5 sm:py-3 overflow-hidden border-b border-white/10">
                <div className="flex animate-scroll whitespace-nowrap">
                    <div className="flex items-center gap-6 sm:gap-10 md:gap-12 px-4">
                        <span className="text-xs sm:text-sm md:text-base font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                            ✨ New Bundle Offers Available
                        </span>
                        <span className="text-white/30 text-lg">•</span>
                        <span className="text-xs sm:text-sm md:text-base font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/90">
                            Save Up To 30% on Combo Packages
                        </span>
                        <span className="text-white/30 text-lg">•</span>
                        <span className="text-xs sm:text-sm md:text-base font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                            ✨ New Bundle Offers Available
                        </span>
                        <span className="text-white/30 text-lg">•</span>
                        <span className="text-xs sm:text-sm md:text-base font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/90">
                            Save Up To 30% on Combo Packages
                        </span>
                        <span className="text-white/30 text-lg">•</span>
                        <span className="text-xs sm:text-sm md:text-base font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                            ✨ New Bundle Offers Available
                        </span>
                        <span className="text-white/30 text-lg">•</span>
                        <span className="text-xs sm:text-sm md:text-base font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/90">
                            Save Up To 30% on Combo Packages
                        </span>
                        <span className="text-white/30 text-lg">•</span>
                    </div>
                </div>
            </div>

            <nav className="fixed top-10 sm:top-12 left-0 right-0 z-50 bg-white backdrop-blur-sm">
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
                                href="/lashes"
                                className="group relative w-full sm:min-w-[400px] md:min-w-[480px] px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 hover:text-white transition-all duration-500 text-center overflow-hidden"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="relative z-10 tracking-wide font-light">Lashes By Shazz</span>
                                <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-white/30 transition-all duration-500" />
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-lg" />
                                {/* Twinkling stars background - visible by default on mobile */}
                                <div className="absolute inset-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-700">
                                    <span className="absolute top-[12%] left-[8%] text-white/30 text-[6px] animate-pulse" style={{ animationDelay: '0s' }}>✦</span>
                                    <span className="absolute top-[28%] left-[19%] text-white/20 text-[7px] animate-pulse" style={{ animationDelay: '0.3s' }}>✦</span>
                                    <span className="absolute top-[47%] left-[6%] text-white/25 text-[5px] animate-pulse" style={{ animationDelay: '0.6s' }}>✦</span>
                                    <span className="absolute top-[71%] left-[23%] text-white/30 text-[8px] animate-pulse" style={{ animationDelay: '0.9s' }}>✦</span>
                                    <span className="absolute top-[19%] right-[12%] text-white/25 text-[6px] animate-pulse" style={{ animationDelay: '0.2s' }}>✦</span>
                                    <span className="absolute top-[56%] right-[8%] text-white/30 text-[7px] animate-pulse" style={{ animationDelay: '0.5s' }}>✦</span>
                                    <span className="absolute top-[84%] right-[17%] text-white/20 text-[5px] animate-pulse" style={{ animationDelay: '0.8s' }}>✦</span>
                                    <span className="absolute top-[37%] right-[24%] text-white/25 text-[8px] animate-pulse" style={{ animationDelay: '1.1s' }}>✦</span>
                                    <span className="absolute top-[63%] left-[42%] text-white/30 text-[6px] animate-pulse" style={{ animationDelay: '0.4s' }}>✦</span>
                                    <span className="absolute top-[91%] left-[67%] text-white/20 text-[7px] animate-pulse" style={{ animationDelay: '0.7s' }}>✦</span>
                                </div>
                            </a>

                            <a
                                href="/hair"
                                className="group relative w-full sm:min-w-[400px] md:min-w-[480px] px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 hover:text-white transition-all duration-500 text-center overflow-hidden"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="relative z-10 tracking-wide font-light">Shasha Hair Salon</span>
                                <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-white/30 transition-all duration-500" />
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-lg" />
                                {/* Twinkling stars background - visible by default on mobile */}
                                <div className="absolute inset-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-700">
                                    <span className="absolute top-[9%] left-[14%] text-white/25 text-[7px] animate-pulse" style={{ animationDelay: '0.1s' }}>✦</span>
                                    <span className="absolute top-[34%] left-[7%] text-white/30 text-[6px] animate-pulse" style={{ animationDelay: '0.4s' }}>✦</span>
                                    <span className="absolute top-[61%] left-[21%] text-white/20 text-[5px] animate-pulse" style={{ animationDelay: '0.7s' }}>✦</span>
                                    <span className="absolute top-[88%] left-[11%] text-white/25 text-[8px] animate-pulse" style={{ animationDelay: '1s' }}>✦</span>
                                    <span className="absolute top-[16%] right-[9%] text-white/30 text-[6px] animate-pulse" style={{ animationDelay: '0.3s' }}>✦</span>
                                    <span className="absolute top-[52%] right-[19%] text-white/20 text-[7px] animate-pulse" style={{ animationDelay: '0.6s' }}>✦</span>
                                    <span className="absolute top-[77%] right-[13%] text-white/25 text-[5px] animate-pulse" style={{ animationDelay: '0.9s' }}>✦</span>
                                    <span className="absolute top-[43%] right-[26%] text-white/30 text-[8px] animate-pulse" style={{ animationDelay: '1.2s' }}>✦</span>
                                    <span className="absolute top-[25%] left-[48%] text-white/20 text-[6px] animate-pulse" style={{ animationDelay: '0.5s' }}>✦</span>
                                    <span className="absolute top-[69%] left-[73%] text-white/25 text-[7px] animate-pulse" style={{ animationDelay: '0.8s' }}>✦</span>
                                </div>
                            </a>

                            <a
                                href="/aesthetics"
                                className="group relative w-full sm:min-w-[400px] md:min-w-[480px] px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 hover:text-white transition-all duration-500 text-center overflow-hidden"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="relative z-10 tracking-wide font-light">Revive Aesthetics</span>
                                <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-white/30 transition-all duration-500" />
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-lg" />
                                {/* Twinkling stars background - visible by default on mobile */}
                                <div className="absolute inset-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-700">
                                    <span className="absolute top-[14%] left-[11%] text-white/30 text-[6px] animate-pulse" style={{ animationDelay: '0.2s' }}>✦</span>
                                    <span className="absolute top-[38%] left-[5%] text-white/20 text-[5px] animate-pulse" style={{ animationDelay: '0.5s' }}>✦</span>
                                    <span className="absolute top-[66%] left-[18%] text-white/25 text-[7px] animate-pulse" style={{ animationDelay: '0.8s' }}>✦</span>
                                    <span className="absolute top-[82%] left-[9%] text-white/30 text-[8px] animate-pulse" style={{ animationDelay: '1.1s' }}>✦</span>
                                    <span className="absolute top-[23%] right-[14%] text-white/20 text-[6px] animate-pulse" style={{ animationDelay: '0.4s' }}>✦</span>
                                    <span className="absolute top-[49%] right-[7%] text-white/25 text-[7px] animate-pulse" style={{ animationDelay: '0.7s' }}>✦</span>
                                    <span className="absolute top-[74%] right-[21%] text-white/30 text-[5px] animate-pulse" style={{ animationDelay: '1s' }}>✦</span>
                                    <span className="absolute top-[91%] right-[16%] text-white/20 text-[8px] animate-pulse" style={{ animationDelay: '1.3s' }}>✦</span>
                                    <span className="absolute top-[57%] left-[44%] text-white/25 text-[6px] animate-pulse" style={{ animationDelay: '0.6s' }}>✦</span>
                                    <span className="absolute top-[31%] left-[79%] text-white/30 text-[7px] animate-pulse" style={{ animationDelay: '0.9s' }}>✦</span>
                                </div>
                            </a>

                            <a
                                href="#bundles"
                                className="group relative w-full sm:min-w-[400px] md:min-w-[480px] px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 hover:text-white transition-all duration-500 text-center overflow-hidden"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="relative z-10 tracking-wide font-light">Bundle Offers</span>
                                <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-white/30 transition-all duration-500" />
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-lg" />
                                {/* Twinkling stars background - visible by default on mobile */}
                                <div className="absolute inset-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-700">
                                    <span className="absolute top-[17%] left-[13%] text-white/25 text-[7px] animate-pulse" style={{ animationDelay: '0.3s' }}>✦</span>
                                    <span className="absolute top-[44%] left-[8%] text-white/30 text-[6px] animate-pulse" style={{ animationDelay: '0.6s' }}>✦</span>
                                    <span className="absolute top-[68%] left-[19%] text-white/20 text-[5px] animate-pulse" style={{ animationDelay: '0.9s' }}>✦</span>
                                    <span className="absolute top-[86%] left-[24%] text-white/25 text-[8px] animate-pulse" style={{ animationDelay: '1.2s' }}>✦</span>
                                    <span className="absolute top-[21%] right-[11%] text-white/30 text-[6px] animate-pulse" style={{ animationDelay: '0.5s' }}>✦</span>
                                    <span className="absolute top-[53%] right-[22%] text-white/20 text-[7px] animate-pulse" style={{ animationDelay: '0.8s' }}>✦</span>
                                    <span className="absolute top-[79%] right-[8%] text-white/25 text-[5px] animate-pulse" style={{ animationDelay: '1.1s' }}>✦</span>
                                    <span className="absolute top-[93%] right-[18%] text-white/30 text-[8px] animate-pulse" style={{ animationDelay: '1.4s' }}>✦</span>
                                    <span className="absolute top-[35%] left-[51%] text-white/20 text-[6px] animate-pulse" style={{ animationDelay: '0.7s' }}>✦</span>
                                    <span className="absolute top-[62%] left-[76%] text-white/25 text-[7px] animate-pulse" style={{ animationDelay: '1s' }}>✦</span>
                                </div>
                            </a>

                            <a
                                href="#contact"
                                className="group relative w-full sm:min-w-[400px] md:min-w-[480px] px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 hover:text-white transition-all duration-500 text-center overflow-hidden"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="relative z-10 tracking-wide font-light">Contact Us</span>
                                <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-white/30 transition-all duration-500" />
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-lg" />
                                {/* Twinkling stars background - visible by default on mobile */}
                                <div className="absolute inset-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-700">
                                    <span className="absolute top-[11%] left-[16%] text-white/30 text-[6px] animate-pulse" style={{ animationDelay: '0.4s' }}>✦</span>
                                    <span className="absolute top-[41%] left-[22%] text-white/20 text-[5px] animate-pulse" style={{ animationDelay: '0.7s' }}>✦</span>
                                    <span className="absolute top-[72%] left-[7%] text-white/25 text-[7px] animate-pulse" style={{ animationDelay: '1s' }}>✦</span>
                                    <span className="absolute top-[89%] left-[19%] text-white/30 text-[8px] animate-pulse" style={{ animationDelay: '1.3s' }}>✦</span>
                                    <span className="absolute top-[27%] right-[10%] text-white/20 text-[6px] animate-pulse" style={{ animationDelay: '0.6s' }}>✦</span>
                                    <span className="absolute top-[54%] right-[23%] text-white/25 text-[7px] animate-pulse" style={{ animationDelay: '0.9s' }}>✦</span>
                                    <span className="absolute top-[78%] right-[15%] text-white/30 text-[5px] animate-pulse" style={{ animationDelay: '1.2s' }}>✦</span>
                                    <span className="absolute top-[95%] right-[8%] text-white/20 text-[8px] animate-pulse" style={{ animationDelay: '1.5s' }}>✦</span>
                                    <span className="absolute top-[46%] left-[58%] text-white/25 text-[6px] animate-pulse" style={{ animationDelay: '0.8s' }}>✦</span>
                                    <span className="absolute top-[18%] left-[83%] text-white/30 text-[7px] animate-pulse" style={{ animationDelay: '1.1s' }}>✦</span>
                                </div>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

