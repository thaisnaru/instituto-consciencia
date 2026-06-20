"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RitualConfig } from "@/lib/db";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface RegistrationProps {
  ritual: RitualConfig | null;
}

type Status = "idle" | "loading" | "success" | "error";

export default function Registration({ ritual }: RegistrationProps) {
  const [form, setForm] = useState({ name: "", age: "", phone: "", email: "", notes: "" });
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, age: parseInt(form.age) || null }),
    });

    if (res.ok) {
      setStatus("success");
      setForm({ name: "", age: "", phone: "", email: "", notes: "" });
    } else {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full glass rounded-xl px-4 py-3 text-white/80 text-sm bg-transparent placeholder-white/20 focus:outline-none focus:border-gold/40 border border-white/10 transition-colors";

  return (
    <section id="inscricao" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-mid/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.4em] text-gold/60 uppercase">Participe</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mt-3 mb-4 font-light leading-tight">
            Inicie sua<br />
            <span className="text-gradient-gold">Jornada</span>
          </h2>
          <p className="text-white/50 leading-relaxed font-light max-w-md mx-auto">
            Preencha o formulário abaixo. Nossa equipe entrará em contato para confirmar sua vaga e passar as orientações.
          </p>

          {ritual && (
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="text-center">
                <p className="text-2xl font-display text-gold font-light">{ritual.available_spots}</p>
                <p className="text-xs text-white/35 tracking-widest uppercase mt-0.5">Vagas</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-base font-display text-white/70 font-light capitalize">
                  {new Date(ritual.date + "T12:00:00").toLocaleDateString("pt-BR", { day: "numeric", month: "long" })}
                </p>
                <p className="text-xs text-white/35 tracking-widest uppercase mt-0.5">Próxima data</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-base font-display text-white/70 font-light">{ritual.time}</p>
                <p className="text-xs text-white/35 tracking-widest uppercase mt-0.5">Horário</p>
              </div>
            </div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-12 text-center"
            >
              <CheckCircle size={48} className="text-forest-light mx-auto mb-4" />
              <h3 className="font-display text-2xl text-white font-light mb-2">Inscrição recebida!</h3>
              <p className="text-white/50 font-light leading-relaxed">
                Obrigada pelo seu interesse. Nossa equipe entrará em contato em breve para confirmar sua participação e passar todas as orientações.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 text-xs text-white/30 hover:text-white/60 transition-colors tracking-widest"
              >
                Fazer nova inscrição
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 sm:p-10 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">Nome completo *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">Idade *</label>
                  <input
                    name="age"
                    type="number"
                    min="18"
                    max="99"
                    value={form.age}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 32"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">Telefone / WhatsApp *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="(43) 99999-9999"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">E-mail *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">
                    Observações <span className="text-white/20 normal-case tracking-normal">(uso de medicamentos, condições de saúde, intenção)</span>
                  </label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Compartilhe o que achar relevante..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400/80 text-sm">
                  <AlertCircle size={16} />
                  Ocorreu um erro. Tente novamente ou entre em contato pelo WhatsApp.
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-gold/80 to-gold-light/80 text-purple-deep font-medium tracking-widest text-sm rounded-xl disabled:opacity-60 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] transition-all duration-500"
              >
                {status === "loading" ? (
                  <div className="w-5 h-5 border-2 border-purple-deep/30 border-t-purple-deep rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    Solicitar minha vaga
                  </>
                )}
              </motion.button>

              <p className="text-xs text-white/20 text-center leading-relaxed">
                Seus dados são confidenciais e usados apenas para contato e organização do evento.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
