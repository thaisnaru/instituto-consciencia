"use client";

import { motion } from "framer-motion";
import { Instagram, MessageCircle, MapPin } from "lucide-react";

export default function Contact() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/instituto.consciencia/";

  const contacts = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Fale com a gente",
      href: `https://wa.me/${whatsapp}?text=Olá! Tenho interesse em participar de uma cerimônia do Instituto Consciência.`,
      color: "text-forest-light",
      border: "hover:border-forest-light/30",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@instituto.consciencia",
      href: instagram,
      color: "text-gold",
      border: "hover:border-gold/30",
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Apucarana, Paraná – Brasil",
      href: "#",
      color: "text-purple-light/80",
      border: "hover:border-purple-light/30",
    },
  ];

  return (
    <section id="contato" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-forest-light/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] text-gold/60 uppercase">Fale Conosco</span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mt-3 font-light">
            Entre em <span className="text-gradient-green">Contato</span>
          </h2>
          <p className="mt-4 text-white/45 max-w-md mx-auto leading-relaxed font-light">
            Estamos aqui para responder suas dúvidas e acolher você nesta jornada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {contacts.map(({ icon: Icon, label, value, href, color, border }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`glass rounded-2xl p-8 text-center group border border-white/5 ${border} transition-all duration-500`}
            >
              <Icon size={28} className={`${color} mx-auto mb-4`} />
              <p className="text-xs text-white/35 tracking-widest uppercase mb-2">{label}</p>
              <p className="text-white/70 font-light">{value}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
