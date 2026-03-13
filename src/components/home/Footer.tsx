'use client';

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=R.+Bancário+Waldemar+de+Mesquita+Accioly,+16+-+Bancários,+João+Pessoa+-+PB,+58051-420";

const Footer = () => {
    return (
        <footer className="bg-primary text-primary-foreground" id="contato">
            {/* Map Section */}
            <div className="relative">
                <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-[300px] md:h-[400px] relative group cursor-pointer"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.5!2d-34.8367!3d-7.1398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace8391e5beb4d%3A0x0!2sR.+Banc%C3%A1rio+Waldemar+de+Mesquita+Accioly%2C+16+-+Banc%C3%A1rios%2C+Jo%C3%A3o+Pessoa+-+PB!5e0!3m2!1spt-BR!2sbr"
                        className="w-full h-full border-0 pointer-events-none"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localização da Paróquia Santo Menino Jesus de Praga"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-body font-bold text-sm shadow-lg">
                            Abrir no Google Maps
                        </span>
                    </div>
                </a>
            </div>

            {/* Footer Content */}
            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-heading text-xl font-bold mb-4">
                                Paróquia Menino Jesus de Praga
                            </h3>
                            <p className="font-body text-sm text-primary-foreground/80">
                                Uma comunidade de fé, esperança e caridade ao serviço do Reino de Deus.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-heading text-lg font-bold mb-4">Contato</h4>
                            <div className="space-y-3 font-body text-sm text-primary-foreground/80">
                                <a
                                    href={GOOGLE_MAPS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-accent transition-colors"
                                >
                                    <MapPin size={16} className="text-accent" />
                                    <span>R. Bancário Waldemar de Mesquita Accioly, 16 — Bancários, João Pessoa - PB</span>
                                </a>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-accent" />
                                    <span>(83) 3235-5120</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-accent" />
                                    <span>contato@meninojesusdepraga.org.br</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-heading text-lg font-bold mb-4">Links Úteis</h4>
                            <div className="space-y-2 font-body text-sm text-primary-foreground/80">
                                <Link href="/pastorais" className="block hover:text-accent transition-colors">Pastorais e Movimentos</Link>
                                <Link href="#horarios" className="block hover:text-accent transition-colors">Horários de Missa</Link>
                                <Link href="#confissoes" className="block hover:text-accent transition-colors">Confissões</Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
                        <p className="font-body text-xs text-primary-foreground/60">
                            © {new Date().getFullYear()} Paróquia Santo Menino Jesus de Praga. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
