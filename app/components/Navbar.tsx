'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
    { href: '/lashes', label: 'Lashes', },
    { href: '/training', label: 'Training', },
    { href: '/hair', label: 'Hair', },
    { href: '/aesthetics', label: 'Aesthetics', },
];

// Secondary pages live under the three-dots menu.
const MORE = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/our-team', label: 'Our Team' },
    { href: '/faq-page', label: 'FAQ' },
    { href: '/category/lashes', label: 'Blog' },
    { href: '/contact-us', label: 'Contact' },
    { href: '/lashes-by-shazz-investment-opporunities', label: 'Investment' },
    { href: 'https://lashtribeafrica.com/', label: 'Shop (Lash Tribe Africa)', external: true },
];

// Which nav item an old-site page belongs to, so the highlight still shows where you are.
const SECTION: Record<string, string> = {
    '/lash-extensions': '/lashes',
    '/lash-refill-services': '/lashes',
    '/category/lashes': '/lashes',
    '/peruvian-wigs': '/hair',
    '/microshading': '/aesthetics',
    '/beauty-wellness': '/aesthetics',
};

function activeHref(pathname: string) {
    if (pathname === '/') return '/';
    if (SECTION[pathname]) return SECTION[pathname];
    const more = MORE.find((l) => !('external' in l) && (pathname === l.href || pathname.startsWith(l.href + '/')));
    if (more) return 'more';
    const hit = LINKS.find((l) => pathname === l.href || pathname.startsWith(l.href + '/'));
    return hit ? hit.href : '';
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const scroller = useRef<HTMLDivElement>(null);
    const pathname = usePathname() || '/';
    const active = activeHref(pathname);
    const bookingUrl = 'https://booking.lashesbyshazz.com/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
        // On phones, slide the current page's link into view in the scroll strip.
        const el = scroller.current;
        const cur = el?.querySelector<HTMLElement>('[aria-current="page"], [data-active="true"]');
        if (el && cur && el.scrollWidth > el.clientWidth) {
            el.scrollLeft = cur.offsetLeft - el.clientWidth / 2 + cur.offsetWidth / 2;
        }
    }, [pathname]);

    useEffect(() => {
        if (!open) return;
        const close = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('[data-more-menu]')) setOpen(false);
        };
        const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('click', close);
        document.addEventListener('keydown', esc);
        return () => {
            document.removeEventListener('click', close);
            document.removeEventListener('keydown', esc);
        };
    }, [open]);

    const item = (href: string) =>
        `text-xs tracking-wider uppercase font-medium transition-colors px-3 py-1.5 -mx-1 rounded-full ${
            active === href ? 'bg-black/10 text-black' : 'text-black/60 hover:text-black'
        }`;

    return (
        <nav className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isScrolled ? 'scale-95' : ''} px-4 w-full max-w-[95vw] sm:w-auto`}>
            <div className="relative bg-white/90 backdrop-blur-xl border border-black/10 rounded-full pl-2 pr-2 sm:px-4 py-2 sm:py-2.5 shadow-2xl" data-more-menu>
                <div className="flex items-center gap-1 sm:gap-3">
                    {/* On phones this strip scrolls sideways and slides under the Book Now button. */}
                    <div
                        ref={scroller}
                        className="flex-1 min-w-0 overflow-x-auto sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,black_80%,transparent)] sm:[mask-image:none]"
                    >
                        <div className="flex items-center gap-1 sm:gap-3 w-max pr-8 sm:pr-0">
                            <Link href="/" aria-current={active === '/' ? 'page' : undefined} className={`shrink-0 whitespace-nowrap ${item('/')}`}>
                                Home
                            </Link>
                            {LINKS.map((l) => (
                                <Link key={l.href} href={l.href} aria-current={active === l.href ? 'page' : undefined} className={`shrink-0 whitespace-nowrap ${item(l.href)}`}>
                                    {l.label}
                                </Link>
                            ))}
                            <button
                                type="button"
                                aria-label="More pages"
                                aria-expanded={open}
                                data-active={active === 'more' ? 'true' : undefined}
                                onClick={() => setOpen((o) => !o)}
                                className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                                    active === 'more' || open ? 'bg-black/10 text-black' : 'text-black/60 hover:text-black'
                                }`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                    <circle cx="5" cy="12" r="1.8" />
                                    <circle cx="12" cy="12" r="1.8" />
                                    <circle cx="19" cy="12" r="1.8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <a
                        href={bookingUrl}
                        className="relative z-10 shrink-0 px-3.5 sm:px-5 py-1.5 sm:py-2 bg-black text-white rounded-full hover:bg-zinc-800 transition-all duration-300 text-[10px] sm:text-xs tracking-wider uppercase font-semibold whitespace-nowrap"
                    >
                        Book Now
                    </a>
                </div>

                {open && (
                    <div className="absolute left-0 right-0 sm:left-auto sm:right-20 top-full mt-3 sm:w-56 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/10 shadow-2xl py-2">
                        {MORE.map((l) =>
                            'external' in l ? (
                                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 text-xs tracking-wider uppercase text-black/70 hover:bg-black/5">
                                    {l.label}
                                </a>
                            ) : (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    aria-current={pathname === l.href ? 'page' : undefined}
                                    className={`block px-5 py-2.5 text-xs tracking-wider uppercase hover:bg-black/5 ${pathname === l.href ? 'text-black font-semibold' : 'text-black/70'}`}
                                >
                                    {l.label}
                                </Link>
                            ),
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
