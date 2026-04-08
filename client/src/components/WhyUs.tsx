/* DevHosting — WhyUs
   "Por que nos escolher" — real differentials with animated counters */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, HeadphonesIcon, Globe, Clock, CreditCard, Server, Lock } from "lucide-react";

function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const STATS = [
  { value: 99.9, suffix: "%", label: "Uptime garantido", icon: Clock, color: "text-emerald-400" },
  { value: 24, suffix: "/7", label: "Suporte via IA", icon: HeadphonesIcon, color: "text-amber-400" },
  { value: 3, suffix: " DCs", label: "Data Centers globais", icon: Globe, color: "text-indigo-400" },
  { value: 10, suffix: " Gbps", label: "Uplink dedicado", icon: Zap, color: "text-amber-400" },
];

const FEATURES = [
  {
    icon: Server,
    title: "Infraestrutura própria",
    desc: "Não somos revenda. Operamos servidores dedicados com AMD EPYC e NVMe Gen 4.",
    color: "text-amber-400",
    bg: "bg-amber-400/8",
  },
  {
    icon: Shield,
    title: "Segurança certificada",
    desc: "Fundador certificado pelo Google em Cybersecurity. DDoS, WAF, IDS e SSL automático em todos os planos.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/8",
  },
  {
    icon: CreditCard,
    title: "Pagamentos flexíveis",
    desc: "Pix, cartão, Bitcoin, Ethereum, USDT e PayPal. Você escolhe como pagar, sem taxas escondidas.",
    color: "text-indigo-400",
    bg: "bg-indigo-400/8",
  },
  {
    icon: Lock,
    title: "SSL grátis em tudo",
    desc: "Certificados SSL via Let's Encrypt ativados automaticamente em todos os planos, sem custo adicional.",
    color: "text-amber-400",
    bg: "bg-amber-400/8",
  },
  {
    icon: Globe,
    title: "CDN global incluso",
    desc: "Conteúdo entregue de data centers no Brasil, EUA e Europa para menor latência em qualquer lugar.",
    color: "text-indigo-400",
    bg: "bg-indigo-400/8",
  },
  {
    icon: Zap,
    title: "Ativação imediata",
    desc: "Seu serviço fica online em minutos após a confirmação do pagamento, sem burocracia.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/8",
  },
];

function StatCard({ value, suffix, label, icon: Icon, color, started }: any) {
  const isDecimal = value % 1 !== 0;
  const intPart = Math.floor(value);
  const decPart = isDecimal ? (value - intPart).toFixed(1).slice(1) : "";
  const count = useCounter(intPart, 1600, started);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl border border-white/8 p-4 sm:p-6 text-center"
    >
      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color} mx-auto mb-2 sm:mb-3`} />
      <div
        className={`text-2xl sm:text-3xl lg:text-4xl font-black ${color} mb-1 leading-tight`}
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {count}{decPart}{suffix}
      </div>
      <p className="text-white/50 text-xs sm:text-sm leading-snug">{label}</p>
    </motion.div>
  );
}

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="por-que-nos" className="py-16 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-amber-400/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-amber-400 border border-amber-400/20 bg-amber-400/5 uppercase tracking-widest mb-4">
            Por que nos escolher
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Infraestrutura real,{" "}
            <span className="gradient-text">sem atalhos</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto">
            Cada detalhe foi pensado para desenvolvedores e empresas que precisam de performance e confiabilidade de verdade.
          </p>
        </motion.div>

        {/* Animated stats */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} started={inView} />
          ))}
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl border border-white/8 p-4 sm:p-6 flex gap-3 sm:gap-4 hover:border-white/15 transition-colors"
            >
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${f.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <f.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${f.color}`} />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1 text-sm sm:text-base" style={{ fontFamily: "Syne, sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
