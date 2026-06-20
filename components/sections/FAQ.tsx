"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "O que é a ayahuasca?",
    a: "Ayahuasca é uma bebida sagrada utilizada há milênios por povos indígenas da Amazônia. Preparada a partir da combinação de plantas da floresta, é utilizada como ferramenta de cura, autoconhecimento e conexão espiritual. No Brasil, seu uso ritualístico é legalizado desde 2010.",
  },
  {
    q: "Preciso ter experiência espiritual ou religiosa?",
    a: "Não. O Instituto Consciência não é uma organização religiosa. Recebemos pessoas de todas as crenças e backgrounds. O que é necessário é sinceridade na intenção e abertura para a experiência.",
  },
  {
    q: "Posso participar se uso antidepressivos?",
    a: "Alguns medicamentos, especialmente os que atuam na serotonina (SSRIs, IMAOs), exigem protocolo especial e período de suspensão. É essencial nos informar sobre todos os medicamentos em uso antes de confirmar a inscrição. Nossa equipe avaliará cada caso individualmente.",
  },
  {
    q: "Qual é a duração de uma cerimônia?",
    a: "As cerimônias costumam durar entre 6 e 10 horas, iniciando ao entardecer e encerrando na madrugada ou manhã seguinte. Recomendamos que você reserve o dia seguinte para descanso e integração.",
  },
  {
    q: "Quantas pessoas participam por cerimônia?",
    a: "Mantemos grupos pequenos, geralmente entre 10 e 20 pessoas, para garantir atenção individualizada e um ambiente seguro e acolhedor para todos.",
  },
  {
    q: "Há acompanhamento após a cerimônia?",
    a: "Sim. A integração é uma parte fundamental do processo. Oferecemos rodas de conversa e suporte individual após cada cerimônia para que as experiências possam ser assimiladas de forma saudável.",
  },
  {
    q: "Onde acontecem as cerimônias?",
    a: "As cerimônias acontecem em um espaço na natureza, com estrutura adequada para a experiência. O endereço completo é compartilhado com os participantes após a confirmação da inscrição.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-light/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] text-gold/60 uppercase">Dúvidas</span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mt-3 font-light">
            Perguntas <span className="text-gradient-gold">Frequentes</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                open === i ? "border-gold/20" : "border-white/5"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
              >
                <span className={`font-light transition-colors duration-300 ${open === i ? "text-gold-light" : "text-white/80 group-hover:text-white"}`}>
                  {faq.q}
                </span>
                <span className={`shrink-0 ml-4 transition-colors duration-300 ${open === i ? "text-gold" : "text-white/30"}`}>
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-5 text-white/50 leading-relaxed font-light text-sm">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
