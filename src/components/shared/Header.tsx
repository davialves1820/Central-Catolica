"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Church, Menu, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const NAV = [
  { label: "Início", href: "/" },
  { label: "Bíblia", href: "/biblia" },
  { label: "Liturgia", href: "/liturgia" },
  { label: "Orações", href: "/oracoes" },
  { label: "Notícias", href: "/noticias" },
  { label: "Calendário", href: "/calendario" },
  { label: "Santos", href: "/santos" },
] as const;

const subscribe = () => () => { };

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (!mounted) return false;
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname, mounted],
  );

  const mobileVariants: Variants = {
    closed: { height: 0, opacity: 0 },
    open: { height: "auto", opacity: 1 },
  };
  const itemVariants: Variants = {
    closed: { x: -12, opacity: 0 },
    open: (i: number) => ({ x: 0, opacity: 1, transition: { delay: i * 0.06, duration: 0.22 } }),
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled
        ? "bg-[#fbf9f4]/98 backdrop-blur-md shadow-sm border-[#755b00]/20"
        : "bg-[#fbf9f4]/95 backdrop-blur-sm border-[#755b00]/10"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-5 md:px-16">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none rounded-lg"
          aria-label="Central Católica — Página Inicial"
        >
          <Church size={24} className="text-[#000000]" />
          <h1 className="font-sans text-[14px] leading-[20px] tracking-[0.2em] font-bold uppercase text-[#000000]">CENTRAL CATÓLICA</h1>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Navegação principal">
          {NAV.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-[12px] uppercase tracking-widest font-bold transition-all duration-300 focus-visible:outline-none ${active
                  ? "text-[#000000] border-b-2 border-[#755b00]"
                  : "text-[#4d4540] font-medium hover:text-[#755b00]"
                  }`}
              >
                {label}
              </Link>
            );
          })}

        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden p-2 rounded-lg text-[#1b1c19] hover:bg-[#f0eee9] transition-colors focus-visible:outline-none"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={24} aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={24} aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            key="mobile-menu"
            variants={mobileVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-[#d0c4be] bg-[#fbf9f4]"
            aria-label="Menu mobile"
          >
            <div className="container mx-auto px-5 py-6 flex flex-col gap-4">
              {NAV.map(({ label, href }, i) => {
                const active = isActive(href);
                return (
                  <motion.div key={href} custom={i} variants={itemVariants} initial="closed" animate="open">
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block py-3 text-[14px] uppercase tracking-widest font-bold transition-all ${active ? "text-[#755b00]" : "text-[#1b1c19] hover:text-[#755b00]"
                        }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
