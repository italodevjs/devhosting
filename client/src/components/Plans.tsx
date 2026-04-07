/* DevHosting — Plans Section
   Design: Obsidian Premium — Bento-style pricing cards with amber highlight
   Toggle anual/mensal com desconto animado */

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Server, Crown, Globe } from "lucide-react";

const HOSTING_PLANS = [
  {
    name: "Starter",
    icon: <Globe className="w-5 h-5" />,
    desc: "Ideal para sites pessoais e portfólios",
    monthly: 19.90,
    annual: 14.90,
    color: "border-white/10",
    highlight: false,
    features: [
      "1 Site",
      "10 GB SSD NVMe",
      "Largura de banda ilimitada",
      "SSL Grátis",
      "1 E-mail profissional",
      "Painel cPanel",
      "Suporte via WhatsApp",
    ],
  },
  {
    name: "Pro",
    icon: <Zap className="w-5 h-5" />,
    desc: "Para desenvolvedores e pequenas empresas",
    monthly: 49.90,
    annual: 37.90,
    color: "border-amber-400/40",
    highlight: true,
    badge: "Mais Popular",
    features: [
      "Sites ilimitados",
      "50 GB SSD NVMe",
      "Largura de banda ilimitada",
      "SSL Grátis + Wildcard",
      "E-mails ilimitados",
      "Painel cPanel + SSH",
      "Backup diário automático",
      "CDN Global",
      "Suporte prioritário 24/7",
    ],
  },
  {
    name: "Business",
    icon: <Server className="w-5 h-5" />,
    desc: "Para empresas com alto tráfego",
    monthly: 99.90,
    annual: 74.90,
    color: "border-indigo-400/30",
    highlight: false,
    features: [
      "Sites ilimitados",
      "200 GB SSD NVMe",
      "Largura de banda ilimitada",
      "SSL Grátis + Wildcard",
      "E-mails ilimitados",
      "Painel cPanel + SSH + Git",
      "Backup diário + Snapshot",
      "CDN Global + WAF",
      "IP dedicado",
      "Suporte prioritário 24/7",
    ],
  },
];

const VPS_PLANS = [
  {
    name: "VPS Nano",
    specs: { cpu: "2 vCPU", ram: "2 GB RAM", disk: "40 GB SSD", bw: "2 TB/mês" },
    monthly: 59.90,
    annual: 44.90,
    color: "border-white/10",
    highlight: false,
  },
  {
    name: "VPS Power",
    specs: { cpu: "4 vCPU", ram: "8 GB RAM", disk: "100 GB SSD", bw: "5 TB/mês" },
    monthly: 129.90,
    annual: 97.90,
    color: "border-amber-400/40",
    highlight: true,
    badge: "Melhor Custo-Benefício",
  },
  {
    name: "VPS Ultra",
    specs: { cpu: "8 vCPU", ram: "16 GB RAM", disk: "200 GB SSD", bw: "10 TB/mês" },
    monthly: 249.90,
    annual: 187.90,
    color: "border-indigo-400/30",
    highlight: false,
  },
];

function PlanCard({ plan, isAnnual }: { plan: typeof HOSTING_PLANS[0]; isAnnual: boolean }) {
  const price = isAnnual ? plan.annual : plan.monthly;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative rounded-2xl border ${plan.color} p-6 flex flex-col gap-5 ${
        plan.highlight
          ? "bg-gradient-to-b from-amber-400/8 to-transparent amber-glow"
          : "glass-card"
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-wide" style={{ fontFamily: 'Syne, sans-serif' }}>
          {plan.badge}
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <div className={`inline-flex p-2 rounded-xl mb-3 ${plan.highlight ? "bg-amber-400/15 text-amber-400" : "bg-white/5 text-white/60"}`}>
            {plan.icon}
          </div>
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.name}</h3>
          <p className="text-sm text-white/40 mt-1">{plan.desc}</p>
        </div>
      </div>

      <div>
        <div className="flex items-end gap-1">
          <span className="text-xs text-white/40 font-mono-data">R$</span>
          <span className="text-4xl font-black text-white font-mono-data">{price.toFixed(2).replace(".", ",")}</span>
          <span className="text-sm text-white/40 mb-1">/mês</span>
        </div>
        {isAnnual && (
          <p className="text-xs text-emerald-400 mt-1">
            Economize R$ {((plan.monthly - plan.annual) * 12).toFixed(2).replace(".", ",")} por ano
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-2.5 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm text-white/70">
            <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-amber-400" : "text-emerald-400"}`} />
            {f}
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
          plan.highlight
            ? "shimmer text-black shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)]"
            : "border border-white/10 text-white hover:border-amber-400/30 hover:text-amber-400"
        }`}
        style={{ fontFamily: 'Syne, sans-serif' }}
        onClick={() => window.open("https://wa.me/5500000000000?text=Olá!%20Quero%20contratar%20o%20plano%20" + plan.name, "_blank")}
      >
        Contratar via WhatsApp
      </motion.button>
    </motion.div>
  );
}

function VpsCard({ plan, isAnnual }: { plan: typeof VPS_PLANS[0]; isAnnual: boolean }) {
  const price = isAnnual ? plan.annual : plan.monthly;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative rounded-2xl border ${plan.color} p-6 flex flex-col gap-5 ${
        plan.highlight ? "bg-gradient-to-b from-amber-400/8 to-transparent amber-glow" : "glass-card"
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-wide" style={{ fontFamily: 'Syne, sans-serif' }}>
          {plan.badge}
        </div>
      )}
      <div>
        <div className={`inline-flex p-2 rounded-xl mb-3 ${plan.highlight ? "bg-amber-400/15 text-amber-400" : "bg-white/5 text-white/60"}`}>
          <Server className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.name}</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(plan.specs).map(([key, val]) => (
          <div key={key} className="bg-white/4 rounded-xl p-3">
            <div className="text-xs text-white/40 uppercase tracking-wide mb-1">{key.toUpperCase()}</div>
            <div className="text-sm font-semibold text-white font-mono-data">{val}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-end gap-1">
          <span className="text-xs text-white/40 font-mono-data">R$</span>
          <span className="text-4xl font-black text-white font-mono-data">{price.toFixed(2).replace(".", ",")}</span>
          <span className="text-sm text-white/40 mb-1">/mês</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
          plan.highlight
            ? "shimmer text-black shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)]"
            : "border border-white/10 text-white hover:border-amber-400/30 hover:text-amber-400"
        }`}
        style={{ fontFamily: 'Syne, sans-serif' }}
        onClick={() => window.open("https://wa.me/5500000000000?text=Olá!%20Quero%20contratar%20o%20" + plan.name, "_blank")}
      >
        Contratar via WhatsApp
      </motion.button>
    </motion.div>
  );
}

export default function Plans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [tab, setTab] = useState<"hosting" | "vps">("hosting");

  return (
    <section id="planos" className="py-24 lg:py-32">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-amber-400 border border-amber-400/20 bg-amber-400/5 uppercase tracking-widest mb-4">
            Planos & Preços
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Escolha seu <span className="gradient-text">Plano</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Infraestrutura de alta performance com preços acessíveis. Aceite pagamentos em qualquer moeda.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {/* Tab */}
          <div className="flex items-center glass-card rounded-xl p-1 border border-white/8">
            {(["hosting", "vps"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === t ? "bg-amber-400 text-black" : "text-white/50 hover:text-white"
                }`}
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {t === "hosting" ? "Hospedagem" : "VPS"}
              </button>
            ))}
          </div>

          {/* Toggle anual */}
          <div className="flex items-center gap-3">
            <span className={`text-sm ${!isAnnual ? "text-white" : "text-white/40"}`}>Mensal</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${isAnnual ? "bg-amber-400" : "bg-white/10"}`}
            >
              <motion.div
                animate={{ x: isAnnual ? 24 : 2 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
              />
            </button>
            <span className={`text-sm ${isAnnual ? "text-white" : "text-white/40"}`}>
              Anual
              <span className="ml-1.5 text-xs text-emerald-400 font-semibold">-25%</span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tab === "hosting"
            ? HOSTING_PLANS.map((plan, i) => <PlanCard key={i} plan={plan} isAnnual={isAnnual} />)
            : VPS_PLANS.map((plan, i) => <VpsCard key={i} plan={plan} isAnnual={isAnnual} />)
          }
        </div>

        {/* Domains note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-white/40 text-sm">
            Registro de domínios a partir de <span className="text-amber-400 font-semibold">R$ 39,90/ano</span>.
            {" "}Extensões: .com.br, .com, .net, .org, .io, .dev e mais.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
