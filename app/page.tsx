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
            backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
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

            {/* Decorative Elements */}
            <div className="pt-16 flex justify-center gap-12 opacity-30">
              <div className="w-px h-24 bg-black" />
              <div className="w-px h-24 bg-black" />
              <div className="w-px h-24 bg-black" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-black rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-black rounded-full animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}
