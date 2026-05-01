"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Sun, CalendarDays, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useSession } from "next-auth/react";

/* Nav items */
const NAV = [
  { label: "Bíblia", href: "/biblia", icon: BookOpen },
  { label: "Liturgia", href: "/liturgia", icon: Sun },
  { label: "Calendário", href: "/calendario", icon: CalendarDays },
] as const;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useSession();

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
    (href: string) => pathname === href || pathname.startsWith(href + "/"),
    [pathname],
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
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/98 backdrop-blur-md shadow-sm border-b border-border"
        : "bg-background/95 backdrop-blur-sm border-b border-border/60"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          aria-label="Portal Espiritual — Página Inicial"
        >
          {/* Símbolo da cruz estilizada */}
          <div
            className="relative w-9 h-9 flex items-center justify-center rounded-sm border transition-colors duration-300"
            style={{
              borderColor: "hsl(var(--gold)/0.4)",
              background: "hsl(var(--gold)/0.06)",
            }}
            aria-hidden="true"
          >
            {/* Cruz vertical */}
            <div
              className="absolute"
              style={{
                width: "1.5px",
                height: "22px",
                background: "hsl(var(--gold))",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
            {/* Cruz horizontal */}
            <div
              className="absolute"
              style={{
                width: "14px",
                height: "1.5px",
                background: "hsl(var(--gold))",
                top: "38%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          </div>

          <div>
            <p className="font-heading text-base font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
              Portal Espiritual
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg font-body text-sm font-bold transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active
                  ? "text-primary bg-primary/8"
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary/60"
                  }`}
              >
                <Icon
                  size={15}
                  aria-hidden="true"
                  className={active ? "text-primary" : "text-muted-foreground group-hover:text-foreground transition-colors"}
                />
                {label}
                {/* Active indicator */}
                {active && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    aria-hidden="true"
                    style={{ background: "hsl(var(--gold))" }}
                  />
                )}
              </Link>
            );
          })}

          {/* Search shortcut */}
          <Link
            href="/biblia/search"
            aria-label="Pesquisar na Bíblia"
            className="ml-1 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Search size={17} aria-hidden="true" />
          </Link>

        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={22} aria-hidden="true" />
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
            className="md:hidden overflow-hidden border-t border-border bg-background"
            aria-label="Menu mobile"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV.map(({ label, href, icon: Icon }, i) => {
                const active = isActive(href);
                return (
                  <motion.div
                    key={href}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary/60"
                        }`}
                    >
                      <Icon
                        size={18}
                        aria-hidden="true"
                        className={active ? "text-primary" : "text-muted-foreground"}
                      />
                      {label}
                      {active && (
                        <span
                          className="ml-auto w-1.5 h-1.5 rounded-full"
                          aria-hidden="true"
                          style={{ background: "hsl(var(--gold))" }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Search */}
              <motion.div
                custom={NAV.length}
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                <Link
                  href="/biblia/search"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-bold text-muted-foreground hover:bg-secondary/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Search size={18} aria-hidden="true" />
                  Pesquisar na Bíblia
                </Link>
              </motion.div>

            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;