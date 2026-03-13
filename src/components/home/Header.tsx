'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { label: "Início", path: "/" },
    { label: "Pastorais", path: "/pastorais" },
    { label: "Horários", path: "/#horarios" },
    { label: "Confissões", path: "/#confissoes" },
    { label: "Contato", path: "/#contato" },
    { label: "Entrar", path: "/login" },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="relative container mx-auto flex items-center justify-between py-3 px-4">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/images/menino-jesus-logo.png" alt="Menino Jesus de Praga" className="h-14 w-14 object-contain" width={56} height={56} priority />
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
                            className={`font-body text-sm font-medium transition-colors duration-200 hover:text-accent ${pathname === item.path ? "text-primary" : "text-foreground"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-foreground p-2"
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
                        className="md:hidden overflow-hidden bg-background border-b border-border"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setMenuOpen(false)}
                                    className="font-body text-sm font-medium text-foreground hover:text-accent transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;