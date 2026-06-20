"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/components/shared/Logo";
import CountdownTimer from "@/components/shared/CountdownTimer";
import { RitualConfig } from "@/lib/db";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  ritual: RitualConfig | null;
}

export default function Hero({ ritual }: HeroProps) {
  const targetDate = ritual?.date || "2025-08-15";
  const formUrl = ritual?.google_form_url || process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "#inscricao";

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-banner.png"
          alt="Instituto Consciência"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-deep/70 via-purple-deep/50 to-purple-deep/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/40 via-transparent to-purple-deep/40" />
      </div>

      {/* Particle glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest-light/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-light/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6"
        >
          <Logo size={96} className="drop-shadow-[0_0_30px_rgba(103,185,162,0.4)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-2"
        >
          <span className="text-xs tracking-[0.4em] text-gold/70 uppercase">Consagração da Ayahuasca</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light leading-none tracking-wide mb-6"
        >
          Instituto
          <br />
          <span className="text-gradient-gold">Consciência</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-white/60 text-lg sm:text-xl max-w-2xl leading-relaxed mb-12 font-light"
        >
          Um espaço sagrado de cura, autoconhecimento e reconexão com a sabedoria ancestral da floresta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col items-center gap-6 mb-12"
        >
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase">Próximo encontro em</p>
          <CountdownTimer targetDate={targetDate} />
        </motion.div>

        <motion.a
          href="#inscricao"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-4 bg-gradient-to-r from-gold/80 to-gold-light/80 text-purple-deep font-medium tracking-widest text-sm rounded-full hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] transition-all duration-500"
        >
          Quero viver essa experiência
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#ritual"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/30 hover:text-white/60 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.a>
    </section>
  );
}
