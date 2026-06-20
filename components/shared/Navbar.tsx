"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Próxima Vivência", href: "#ritual" },
  { label: "Sobre", href: "#sobre" },
  { label: "Preparação", href: "#preparacao" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(href: string) {
    setOpen(false);
    // Pequeno delay para o menu fechar antes de scrollar
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-white/10 py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => handleNavClick("#hero")} className="flex items-center gap-3">
          <Logo size={36} />
          <span className="font-display text-lg text-white/90 tracking-widest hidden sm:block">
            Instituto Consciência
          </span>
        </button>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm text-white/60 hover:text-gold transition-colors duration-300 tracking-wider"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#inscricao")}
            className="px-5 py-2 text-sm glass-gold text-gold-light rounded-full tracking-wider hover:bg-gold/10 transition-all duration-300"
          >
            Participar
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white/70 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-white/70 hover:text-gold py-3 tracking-wider text-left"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#inscricao")}
                className="mt-2 px-5 py-3 text-center glass-gold text-gold-light rounded-full tracking-wider"
              >
                Participar
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
