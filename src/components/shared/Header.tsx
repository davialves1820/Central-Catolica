"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, LogOut, User, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Liturgia", path: "/liturgia" },
    { label: "Pastorais", path: "/pastorais" },
    { label: "Bíblia", path: "/biblia" },
    { label: "Horários", path: "/#horarios" },
    { label: "Confissões", path: "/#confissoes" },
    { label: "Contato", path: "/#contato" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-primary/10">
      <div className="relative container mx-auto flex items-center justify-between py-3 px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/menino-jesus-logo.png"
            alt="Menino Jesus de Praga"
            className="h-14 w-14 object-contain"
            width={56}
            height={56}
            priority
          />
          <div>
            <h1 className="text-lg font-heading font-bold text-primary leading-tight">
              Menino Jesus de Praga
            </h1>
            <p className="text-xs text-muted-foreground font-body">Paróquia</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`font-body text-sm font-medium transition-colors duration-200 hover:text-accent ${pathname === item.path
                ? "text-primary font-bold"
                : "text-foreground"
                }`}
            >
              {item.label}
            </Link>
          ))}

          {(session?.user?.role === "ADMIN") && (
            <Link
              href="/events/new"
              className="font-body text-sm font-bold text-accent hover:text-primary transition-colors flex items-center gap-1"
            >
              <Plus size={16} />
              Novo Evento
            </Link>
          )}

          <div className="h-4 w-px bg-primary/20" />

          {status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 font-body text-sm font-bold text-primary hover:text-accent transition-all bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
            >
              <LogOut size={16} />
              Sair
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 font-body text-sm font-bold text-white bg-primary hover:bg-accent px-6 py-2 rounded-full transition-all shadow-lg shadow-primary/20"
            >
              <User size={16} />
              Entrar
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-primary p-2 hover:bg-primary/5 rounded-lg transition-colors"
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-b border-primary/10"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`font-body text-base font-medium transition-colors ${pathname === item.path ? "text-primary font-bold" : "text-foreground"}`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="h-px w-full bg-primary/10 my-1" />

              {status === "authenticated" ? (
                <div className="flex flex-col gap-4">
                  {(session?.user?.role === "ADMIN") && (
                    <Link
                      href="/events/new"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 font-body text-base font-bold text-accent py-2"
                    >
                      <Plus size={20} />
                      Novo Evento
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="flex items-center gap-3 font-body text-base font-bold text-primary py-2"
                  >
                    <LogOut size={20} />
                    Sair da Conta
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 font-body text-base font-bold text-white bg-primary py-3 rounded-xl shadow-lg shadow-primary/20"
                >
                  <User size={20} />
                  Acessar Conta
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
