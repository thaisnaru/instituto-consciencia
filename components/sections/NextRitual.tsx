"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { RitualConfig } from "@/lib/db";
import { formatDate } from "@/lib/utils";

interface NextRitualProps {
  ritual: RitualConfig | null;
}

export default function NextRitual({ ritual }: NextRitualProps) {
  if (!ritual) return null;

  const infoCards = [
    { icon: Calendar, label: "Data", value: formatDate(ritual.date) },
    { icon: Clock, label: "Horário", value: ritual.time },
    { icon: MapPin, label: "Local", value: ritual.location },
    { icon: Users, label: "Vagas disponíveis", value: `${ritual.available_spots} vagas` },
  ];

  return (
    <section id="ritual" className="py-28 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-forest-light/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] text-gold/60 uppercase">Calendário</span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mt-3 font-light">
            Próxima <span className="text-gradient-green">Vivência</span>
          </h2>
          {ritual.description && (
            <p className="mt-4 text-white/50 max-w-xl mx-auto leading-relaxed">{ritual.description}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoCards.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center group hover:border-gold/20 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.2)] transition-all duration-500">
                <Icon size={20} className="text-gold" />
              </div>
              <p className="text-xs text-white/40 tracking-widest uppercase mb-2">{label}</p>
              <p className="text-white/80 font-light leading-snug capitalize">{value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#inscricao"
            className="inline-block px-10 py-4 glass-gold text-gold-light tracking-widest text-sm rounded-full hover:bg-gold/10 hover:shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-all duration-500"
          >
            Entrar na vivência
          </a>
        </motion.div>
      </div>
    </section>
  );
}
