"use client";

import { motion } from "framer-motion";
import { Leaf, Moon, Pill, Heart } from "lucide-react";

const cards = [
  {
    icon: Leaf,
    title: "Alimentação",
    subtitle: "7 dias antes",
    items: [
      "Evitar carnes vermelhas e suínas",
      "Reduzir alimentos processados e frituras",
      "Evitar álcool e substâncias",
      "Preferir alimentos naturais e leves",
      "Reduzir açúcar e cafeína",
    ],
    color: "from-forest-light/20 to-forest/10",
    border: "border-forest-light/20",
    iconColor: "text-forest-light",
  },
  {
    icon: Moon,
    title: "Descanso",
    subtitle: "Na semana do ritual",
    items: [
      "Dormir pelo menos 8 horas por noite",
      "Reduzir exposição a telas à noite",
      "Praticar momentos de silêncio",
      "Meditar ou respirar conscientemente",
      "Evitar situações de estresse intenso",
    ],
    color: "from-purple-light/20 to-purple-mid/10",
    border: "border-purple-light/20",
    iconColor: "text-purple-light",
  },
  {
    icon: Pill,
    title: "Medicamentos",
    subtitle: "Essencial verificar",
    items: [
      "Informar todos os medicamentos em uso",
      "Antidepressivos requerem protocolo especial",
      "Atenção especial a IMAOs e SSRIs",
      "Consultar nossa equipe antes da inscrição",
      "Não interromper remédios sem orientação médica",
    ],
    color: "from-gold/15 to-gold/5",
    border: "border-gold/20",
    iconColor: "text-gold",
  },
  {
    icon: Heart,
    title: "Intenção",
    subtitle: "O mais importante",
    items: [
      "Reflita sobre o que busca nesta jornada",
      "Escreva sua intenção com clareza e honestidade",
      "Venha com abertura e humildade",
      "A medicina trabalha onde há sinceridade",
      "Confie no processo, mesmo no desconhecido",
    ],
    color: "from-forest-light/10 to-gold/10",
    border: "border-white/10",
    iconColor: "text-gold-light",
  },
];

export default function Preparation() {
  return (
    <section id="preparacao" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-forest-light/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] text-gold/60 uppercase">Orientações</span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mt-3 font-light">
            Como se <span className="text-gradient-green">Preparar</span>
          </h2>
          <p className="mt-4 text-white/45 max-w-xl mx-auto leading-relaxed font-light">
            A preparação é parte essencial da jornada. Quanto mais cuidado você dedicar a ela, mais profunda poderá ser sua experiência.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(({ icon: Icon, title, subtitle, items, color, border, iconColor }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 border ${border} bg-gradient-to-b ${color} backdrop-blur-sm hover:scale-[1.02] transition-all duration-500 group`}
            >
              <div className="mb-5">
                <Icon size={28} className={`${iconColor} mb-3`} />
                <h3 className="font-display text-2xl text-white font-light">{title}</h3>
                <p className="text-xs text-white/35 tracking-widest uppercase mt-1">{subtitle}</p>
              </div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/55 font-light leading-snug">
                    <span className="text-gold/60 mt-0.5 shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
