"use client";

import { motion } from "framer-motion";
import { Feather, Heart, Flame, Leaf } from "lucide-react";

const values = [
  {
    icon: Feather,
    title: "Respeito",
    description:
      "Honramos a tradição milenar e a sabedoria dos povos originários, mantendo práticas com responsabilidade e integridade.",
    color: "text-forest-light",
  },
  {
    icon: Heart,
    title: "Acolhimento",
    description:
      "Cada pessoa é recebida em sua totalidade, com escuta cuidadosa e ambiente seguro para a jornada interior.",
    color: "text-gold",
  },
  {
    icon: Flame,
    title: "Intenção",
    description:
      "Cada cerimônia é conduzida com propósito claro. O trabalho com a medicina se inicia antes e se estende após o encontro.",
    color: "text-gold-light",
  },
  {
    icon: Leaf,
    title: "Integração",
    description:
      "Oferecemos suporte contínuo para que as experiências vividas se traduzam em transformação real e duradoura.",
    color: "text-forest-light",
  },
];

export default function About() {
  return (
    <section id="sobre" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-light/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-xs tracking-[0.4em] text-gold/60 uppercase">Nossa História</span>
            <h2 className="font-display text-4xl sm:text-5xl text-white mt-3 mb-6 font-light leading-tight">
              Sobre o <span className="text-gradient-gold">Instituto</span>
            </h2>
            <div className="space-y-4 text-white/55 leading-relaxed font-light">
              <p>
                O Instituto Consciência nasce do encontro entre a sabedoria da floresta e o chamado humano por reconexão.
              </p>
              <p>
                Somos um círculo vivo, familiar e acolhedor, dedicado ao autoconhecimento e à expansão da consciência.
              </p>
              <p>
                Acreditamos em um caminho de cura com respeito, presença e responsabilidade — onde cada pessoa é convidada a olhar para dentro e acessar sua própria verdade.
              </p>
              <p>
                Não seguimos religiões e não fazemos julgamentos. Somos um espaço universalista, aberto a todas as jornadas.
              </p>
              <p>
                Aqui, você é recebido com cuidado, escuta e presença. E nunca caminha sozinho.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, description, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="glass rounded-2xl p-6 hover:border-forest-light/20 transition-all duration-500"
              >
                <Icon size={22} className={`${color} mb-4`} />
                <h3 className="font-display text-xl text-white mb-2 font-light">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed font-light">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
