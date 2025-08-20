"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    const { smoothScrollTo } = useSmoothScroll();

    const navigationLinks = [
        { id: "sobre-nos", label: "Sobre Nós" },
        { id: "servicos", label: "Serviços" },
        { id: "contato", label: "Contato" },
    ];

    const services = [
        "Desenvolvimento Web",
        "Aplicativos Mobile",
        "Design UI/UX",
        "Marketing Digital",
        "Soluções E-Commerce"
    ];

    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
                    {/* Coluna da Empresa */}
                    <div className="space-y-4 md:col-span-1 lg:pr-8">
                        <h3 className="text-xl font-bold text-primary">BrevlyDigital</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Criamos experiências digitais que impulsionam o crescimento dos negócios
                            e o engajamento dos usuários.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Facebook"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Twitter"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.218-3.323 1.218zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.875-.875-1.365-2.026-1.365-3.323s.49-2.448 1.365-3.323c.875-.926 2.026-1.416 3.323-1.416s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.218-3.323 1.218z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Coluna de Serviços */}
                    <div className="space-y-4 md:col-span-1">
                        <h4 className="text-lg font-semibold">Serviços</h4>
                        <ul className="space-y-2">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => smoothScrollTo("servicos")}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {service}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna de Contato */}
                    <div className="space-y-4 md:col-span-1">
                        <h4 className="text-lg font-semibold">Entre em Contato</h4>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-sm leading-relaxed">
                                    Rua Juiz Ari Castilho, 17, Pedro Leopoldo, MG 33250-012
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                                <a
                                    href="tel:+5511987654321"
                                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                >
                                    (31) 99740-3252
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                                <a
                                    href="mailto:contato@brevlydigital.com"
                                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                >
                                    contato@brevlydigital.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navegação Principal */}
                <div className="border-t mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <nav className="flex flex-wrap justify-center md:justify-start gap-6">
                            {navigationLinks.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => smoothScrollTo(link.id)}
                                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </nav>
                        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                            <a href="#" className="hover:text-primary transition-colors">
                                Política de Privacidade
                            </a>
                            <a href="#" className="hover:text-primary transition-colors">
                                Termos de Serviço
                            </a>
                            <a href="#" className="hover:text-primary transition-colors">
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t mt-6 pt-6 text-center">
                    <p className="text-xs text-muted-foreground">
                        © 2025 BrevlyDigital. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}