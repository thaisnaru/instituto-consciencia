"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/shared/Logo";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-purple-deep flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-radial from-purple-mid/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-forest-light/5 rounded-full blur-3xl pointer-events-none" />

      <a
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-xs text-white/25 hover:text-white/60 transition-colors tracking-widest"
      >
        <ArrowLeft size={14} />
        Voltar ao site
      </a>

      <div className="relative w-full max-w-md">
        <div className="glass rounded-3xl p-10">
          <div className="flex flex-col items-center mb-10">
            <Logo size={56} className="mb-4" />
            <h1 className="font-display text-2xl text-white font-light tracking-wide">Área Administrativa</h1>
            <p className="text-white/35 text-sm mt-1 tracking-wider">Instituto Consciência</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full glass rounded-xl px-4 py-3 text-white/80 text-sm bg-transparent placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                placeholder="admin@institutoconsciencia.com.br"
              />
            </div>

            <div>
              <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">Senha</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full glass rounded-xl px-4 py-3 pr-12 text-white/80 text-sm bg-transparent placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400/80 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 bg-gradient-to-r from-gold/80 to-gold-light/80 text-purple-deep font-medium tracking-widest text-sm rounded-xl disabled:opacity-50 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-500"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-purple-deep/30 border-t-purple-deep rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={16} />
                  Entrar
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
