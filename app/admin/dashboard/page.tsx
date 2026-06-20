"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Participant, RitualConfig } from "@/lib/db";
import Logo from "@/components/shared/Logo";
import { LogOut, Save, Users, Calendar, RefreshCw } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [ritual, setRitual] = useState<RitualConfig | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [form, setForm] = useState<Partial<RitualConfig>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const [ritualRes, participantsRes] = await Promise.all([
      fetch("/api/ritual").then((r) => r.json()),
      fetch("/api/participants").then((r) => r.json()),
    ]);
    if (ritualRes) {
      setRitual(ritualRes);
      setForm(ritualRes);
    }
    if (Array.isArray(participantsRes)) setParticipants(participantsRes);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleSave() {
    if (!ritual?.id) return;
    setSaving(true);
    await fetch("/api/ritual", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: ritual.id }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    loadData();
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-deep flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-deep">
      <header className="glass border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div>
              <p className="font-display text-white/90 tracking-widest text-sm">Instituto Consciência</p>
              <p className="text-xs text-white/30">Painel Administrativo</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Ritual Config */}
        <div className="glass rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Calendar size={20} className="text-gold" />
            <h2 className="font-display text-2xl text-white font-light">Próximo Ritual</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { key: "date", label: "Data", type: "date" },
              { key: "time", label: "Horário", type: "time" },
              { key: "available_spots", label: "Vagas disponíveis", type: "number" },
              { key: "location", label: "Local", type: "text" },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">{label}</label>
                <input
                  type={type}
                  value={(form as Record<string, unknown>)[key] as string ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      [key]: type === "number" ? parseInt(e.target.value) : e.target.value,
                    }))
                  }
                  className="w-full glass rounded-xl px-4 py-3 text-white/80 text-sm bg-transparent focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
            ))}

            <div className="md:col-span-2 lg:col-span-3">
              <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">Descrição</label>
              <textarea
                value={form.description ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full glass rounded-xl px-4 py-3 text-white/80 text-sm bg-transparent focus:outline-none focus:border-gold/40 transition-colors resize-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gold/80 to-gold-light/80 text-purple-deep font-medium tracking-widest text-sm rounded-xl disabled:opacity-50 transition-all duration-300"
            >
              {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              {saved ? "Salvo!" : "Salvar alterações"}
            </button>
          </div>
        </div>

        {/* Participants */}
        <div className="glass rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-forest-light" />
              <h2 className="font-display text-2xl text-white font-light">Inscritos</h2>
            </div>
            <span className="glass-gold text-gold text-sm px-4 py-1.5 rounded-full">
              {participants.length} participantes
            </span>
          </div>

          {participants.length === 0 ? (
            <p className="text-white/30 text-center py-12 font-light">Nenhum inscrito ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Nome", "Idade", "Telefone", "E-mail", "Observações", "Data"].map((h) => (
                      <th key={h} className="text-left text-xs text-white/30 tracking-widest uppercase py-3 px-4 font-normal">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="py-3 px-4 text-white/70">{p.name}</td>
                      <td className="py-3 px-4 text-white/50">{p.age}</td>
                      <td className="py-3 px-4 text-white/50">{p.phone}</td>
                      <td className="py-3 px-4 text-white/50">{p.email}</td>
                      <td className="py-3 px-4 text-white/40 max-w-xs truncate">{p.notes || "—"}</td>
                      <td className="py-3 px-4 text-white/30 whitespace-nowrap">
                        {new Date(p.created_at).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
