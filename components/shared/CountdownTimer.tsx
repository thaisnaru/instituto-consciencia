"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculate = () => {
      const diff = new Date(targetDate + "T19:00:00").getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return;
      }
      setTimeLeft({
        dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diff / (1000 * 60)) % 60),
        segundos: Math.floor((diff / 1000) % 60),
      });
    };
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) return null;

  const units = [
    { label: "Dias", value: timeLeft.dias },
    { label: "Horas", value: timeLeft.horas },
    { label: "Minutos", value: timeLeft.minutos },
    { label: "Segundos", value: timeLeft.segundos },
  ];

  return (
    <div className="flex gap-4 sm:gap-6">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="glass rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <span className="font-display text-2xl sm:text-3xl text-gold font-light">
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 text-xs text-white/40 tracking-widest uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
}
