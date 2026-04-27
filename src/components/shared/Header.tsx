"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, LogOut, User, Plus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

// Anchor sections tracked for scroll-spy
const ANCHOR_SECTIONS = ["horarios", "confissoes", "contato"];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Detect scroll for header bg change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy for anchor links (only on home page)
  const updateActiveAnchor = useCallback(() => {
    if (pathname !== "/") return;
    let current: string | null = null;
    for (const id of ANCHOR_SECTIONS) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100) current = id;
      }
    }
    setActiveAnchor(current);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", updateActiveAnchor, { passive: true });
    window.requestAnimationFrame(updateActiveAnchor);
    return () => window.removeEventListener("scroll", updateActiveAnchor);
  }, [updateActiveAnchor]);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navItems = [
    { label: "Início", path: "/", anchor: null },
    { label: "Liturgia", path: "/liturgia", anchor: null },
    { label: "Pastorais", path: "/pastorais", anchor: null },
    { label: "Bíblia", path: "/biblia", anchor: null },
    { label: "Horários", path: "/#horarios", anchor: "horarios" },
    { label: "Confissões", path: "/#confissoes", anchor: "confissoes" },
    { label: "Contato", path: "/#contato", anchor: "contato" },
  ];

  const isActive = (item: { path: string; anchor: string | null }) => {
    if (item.anchor && pathname === "/") return activeAnchor === item.anchor;
    if (!item.anchor) return pathname === item.path;
    return false;
  };

  const mobileMenuVariants: Variants = {
    closed: { height: 0, opacity: 0 },
    open: { height: "auto", opacity: 1 },
  };

  const mobileItemVariants: Variants = {
    closed: { x: -16, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.05, duration: 0.25 },
    }),
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/98 backdrop-blur-md shadow-sm shadow-primary/5 border-b border-primary/10"
          : "bg-white/95 backdrop-blur-sm border-b border-primary/10"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image
              src="/images/menino-jesus-logo.png"
              alt="Menino Jesus de Praga"
              className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
              width={48}
              height={48}
              priority
            />
          </div>
          <div>
            <h1 className="text-base font-heading font-bold text-primary leading-tight">
              Menino Jesus de Praga
            </h1>
            <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">
              Paróquia · João Pessoa
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-3 py-2 font-body text-sm font-medium rounded-lg transition-all duration-200 group ${active
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
              >
                {item.label}
                {/* Active indicator */}
                <span
                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-accent rounded-full transition-all duration-300 ${active ? "w-4" : "w-0 group-hover:w-3"
                    }`}
                />
              </Link>
            );
          })}

          {session?.user?.role === "ADMIN" && (
            <Link
              href="/events/new"
              className="ml-1 font-body text-sm font-bold text-accent hover:text-primary transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-accent/5"
            >
              <Plus size={15} />
              Novo Evento
            </Link>
          )}

          <div className="h-5 w-px bg-primary/15 mx-2" />

          {status === "authenticated" ? (
            <div className="relative group">
              <button className="flex items-center gap-2 font-body text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-full border border-primary/10 transition-all duration-200">
                <User size={14} />
                <span className="max-w-[100px] truncate">
                  {session.user?.name?.split(" ")[0] || "Conta"}
                </span>
                <ChevronDown size={13} className="transition-transform group-hover:rotate-180 duration-200" />
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl border border-border shadow-xl shadow-primary/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 overflow-hidden">
                <div className="p-3 border-b border-border/50">
                  <p className="text-xs font-bold text-foreground truncate">{session.user?.name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{session.user?.role}</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} />
                  Sair da conta
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 font-body text-sm font-bold text-white bg-primary hover:bg-crimson-light px-5 py-2 rounded-full transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              <User size={14} />
              Entrar
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-primary p-2 hover:bg-primary/5 rounded-lg transition-colors"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
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
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-primary/5"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => {
                const active = isActive(item);
                return (
                  <motion.div
                    key={item.path}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-body text-sm font-medium transition-all ${active
                          ? "bg-primary/5 text-primary font-bold"
                          : "text-foreground hover:bg-primary/5 hover:text-primary"
                        }`}
                    >
                      {item.label}
                      {active && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="h-px w-full bg-primary/8 my-2" />

              {status === "authenticated" ? (
                <motion.div
                  custom={navItems.length}
                  variants={mobileItemVariants}
                  initial="closed"
                  animate="open"
                  className="flex flex-col gap-2"
                >
                  {session?.user?.role === "ADMIN" && (
                    <Link
                      href="/events/new"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-bold text-accent bg-accent/5 hover:bg-accent/10 transition-all"
                    >
                      <Plus size={18} />
                      Novo Evento
                    </Link>
                  )}

                  <div className="px-4 py-3 rounded-xl bg-primary/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {session?.user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{session?.user?.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{session?.user?.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => { setMenuOpen(false); signOut(); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-all"
                  >
                    <LogOut size={18} />
                    Sair da Conta
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  custom={navItems.length}
                  variants={mobileItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 font-body text-sm font-bold text-white bg-primary py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:bg-crimson-light transition-all"
                  >
                    <User size={18} />
                    Acessar Conta
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;