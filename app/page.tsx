import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2l1.5 6 6 1.5-6 1.5-1.5 6-1.5-6-6-1.5 6-1.5z' fill='black'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-32 text-center">
          {/* Main Heading */}
          <div className="space-y-8">
            <div className="inline-block">
              <div className="h-px w-20 bg-black mx-auto mb-8" />
              <p className="text-sm tracking-[0.3em] uppercase text-zinc-600 mb-6">
                Welcome To
              </p>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[family-name:var(--font-italianno)] text-black mb-6 animate-[fadeIn_1s_ease-out]">
              The Beauty Vault
            </h1>

            <div className="max-w-2xl mx-auto space-y-6">
              <p className="text-xl sm:text-2xl md:text-3xl font-serif text-zinc-800 leading-relaxed">
                Where Luxury Meets Excellence
              </p>

              <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed">
                Discover the pinnacle of beauty and wellness services. From luxurious lashes to transformative aesthetics, we deliver an unparalleled experience in every detail.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <a
                href="#services"
                className="group relative px-8 py-4 bg-black text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <span className="relative z-10 text-sm tracking-wider uppercase font-medium">
                  Explore Services
                </span>
                <div className="absolute inset-0 bg-zinc-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>

              <a
                href="#book"
                className="px-8 py-4 border-2 border-black text-black rounded-full transition-all duration-300 hover:bg-black hover:text-white hover:shadow-xl hover:scale-105"
              >
                <span className="text-sm tracking-wider uppercase font-medium">
                  Book Appointment
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lashes By Shazz Section */}
      <section id="lashes" className="relative min-h-screen bg-black py-24 sm:py-32 overflow-hidden">


        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          {/* Two Column Layout on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column - Content */}
            <div className="text-center lg:text-left">


              {/* Lashes Logo */}
              <div className="mb-8 flex justify-center lg:justify-start">
                <Image
                  src="/logos/lashes.png"
                  alt="Lashes By Shazz"
                  width={300}
                  height={100}
                  className="h-16 sm:h-20 md:h-24 w-auto brightness-0 invert"
                  priority
                />
              </div>

              <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/60 font-light mb-6">
                Premier Lash Artistry
              </p>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-italianno)] text-white mb-6">
                Lashes By Shazz
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
                Experience the art of luxury lash extensions. Each set is meticulously crafted to enhance your natural beauty with precision, care, and unmatched expertise.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/lashes"
                  className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105"
                >
                  <span className="relative z-10 text-sm tracking-wider uppercase font-medium flex items-center justify-center gap-2">
                    Discover Lashes
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/90 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </a>

                <a
                  href="/lashes#services"
                  className="group px-8 py-4 border-2 border-white/30 text-white rounded-full transition-all duration-500 hover:border-white hover:bg-white/10 hover:shadow-xl hover:scale-105"
                >
                  <span className="text-sm tracking-wider uppercase font-medium flex items-center justify-center gap-2">
                    View Services
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="group p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">Premium Quality</h3>
                    <p className="text-white/60 leading-relaxed">
                      Handcrafted with the finest materials for stunning, long-lasting results
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">Expert Application</h3>
                    <p className="text-white/60 leading-relaxed">
                      Skilled artistry with years of experience in lash enhancement
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">Personalized Care</h3>
                    <p className="text-white/60 leading-relaxed">
                      Customized designs tailored to your unique eye shape and style
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Shasha Hair Wigs Section */}
      <section id="hair-wigs" className="relative min-h-screen bg-white py-24 sm:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-zinc-50">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2l1.5 6 6 1.5-6 1.5-1.5 6-1.5-6-6-1.5 6-1.5z' fill='black'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">

          {/* Centered Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="mb-8">
              <Image
                src="/logos/shash-logo.png"
                alt="Shasha Hair Wigs"
                width={3500}
                height={1200}
                className="h-20 sm:h-24 md:h-28 w-auto mx-auto"
                priority
              />
            </div>

            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-zinc-600 font-light mb-6">
              Premium Hair Solutions
            </p>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-black mb-8">
              Wigs & Accessories
            </h2>

            <p className="text-base sm:text-lg text-zinc-700 max-w-2xl mx-auto leading-relaxed">
              Transform your look with our exquisite collection of premium wigs and hair accessories. Each piece is carefully selected to provide natural beauty, comfort, and confidence.
            </p>
          </div>

          {/* Three Column Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">

            <div className="group text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-200 transition-all duration-500">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-black mb-3">Premium Quality</h3>
              <p className="text-zinc-600 leading-relaxed">
                Luxury wigs crafted from the finest materials for stunning, natural-looking results
              </p>
            </div>

            <div className="group text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-200 transition-all duration-500">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-black mb-3">Expert Styling</h3>
              <p className="text-zinc-600 leading-relaxed">
                Professional customization and personalized consultations for your perfect look
              </p>
            </div>

            <div className="group text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-200 transition-all duration-500">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-black mb-3">Endless Variety</h3>
              <p className="text-zinc-600 leading-relaxed">
                Extensive collection of styles, lengths, and colors to match every personality
              </p>
            </div>

          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/hair"
              className="group relative px-8 py-4 bg-black text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              <span className="relative z-10 text-sm tracking-wider uppercase font-medium flex items-center gap-2">
                Discover Services
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-zinc-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </a>

            <a
              href="/hair#services"
              className="group px-8 py-4 border-2 border-black/30 text-black rounded-full transition-all duration-500 hover:border-black hover:bg-black/5 hover:shadow-xl hover:scale-105"
            >
              <span className="text-sm tracking-wider uppercase font-medium flex items-center gap-2">
                View Services
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>

        </div>
      </section>

      {/* Revive Aesthetics Section */}
      <section id="aesthetics" className="relative min-h-screen bg-black py-24 sm:py-32 overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">

          {/* Header */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <Image
                src="/logos/revive.png"
                alt="Revive Aesthetics"
                width={450}
                height={150}
                className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto mx-auto"
                priority
              />
            </div>

            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/60 font-light mb-6">
              Advanced Aesthetic Treatments
            </p>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-8">
              Revive Aesthetics
            </h2>

            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Experience the future of beauty with cutting-edge aesthetic treatments designed to rejuvenate, restore, and reveal your most radiant self.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

            <div className="group">
              <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm h-full">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-white mb-3">Skin Rejuvenation</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Advanced facials and treatments for glowing, youthful skin
                </p>
              </div>
            </div>

            <div className="group">
              <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm h-full">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-white mb-3">Anti-Aging</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Turn back time with innovative wrinkle reduction techniques
                </p>
              </div>
            </div>

            <div className="group">
              <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm h-full">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-white mb-3">Body Contouring</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Sculpt and shape your body with non-invasive treatments
                </p>
              </div>
            </div>

            <div className="group">
              <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm h-full">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-white mb-3">Skin Therapy</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Medical-grade treatments for complexion and texture
                </p>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="#book"
              className="group relative inline-block px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              <span className="relative z-10 text-sm tracking-wider uppercase font-medium">
                Book Treatment
              </span>
              <div className="absolute inset-0 bg-zinc-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black text-white py-12">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-[family-name:var(--font-italianno)]">The Beauty Vault</h3>

            <div className="flex justify-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <p className="text-white/60 text-sm">
                Nairobi, Kenya
              </p>
              <p className="text-white/40 text-sm">
                © {new Date().getFullYear()} The Beauty Vault. All rights reserved.
              </p>
              <p className="text-white/30 text-xs">
                Powered by <a href="https://stdioxlabs.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">StdioX Labs</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
