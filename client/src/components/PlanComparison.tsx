/* DevHosting — PlanComparison
   Detailed feature-by-feature plan comparison table */

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

type Val = boolean | string | null;

interface Row {
  feature: string;
  starter: Val;
  pro: Val;
  business: Val;
}

const ROWS: Row[] = [
  // Hospedagem
  { feature: "Nº de sites", starter: "1", pro: "Ilimitados", business: "Ilimitados" },
  { feature: "Armazenamento NVMe", starter: "10 GB", pro: "50 GB", business: "200 GB" },
  { feature: "Largura de banda", starter: "Ilimitada", pro: "Ilimitada", business: "Ilimitada" },
  { feature: "E-mails profissionais", starter: "1", pro: "Ilimitados", business: "Ilimitados" },
  // Segurança
  { feature: "SSL grátis", starter: true, pro: true, business: true },
  { feature: "SSL Wildcard", starter: false, pro: true, business: true },
  { feature: "Proteção DDoS", starter: true, pro: true, business: true },
  { feature: "Firewall WAF", starter: false, pro: true, business: true },
  { feature: "Detecção de malware", starter: false, pro: true, business: true },
  // Painel e acesso
  { feature: "Painel cPanel", starter: true, pro: true, business: true },
  { feature: "Acesso SSH", starter: false, pro: true, business: true },
  { feature: "Git via SSH", starter: false, pro: false, business: true },
  // Performance
  { feature: "CDN Global", starter: false, pro: true, business: true },
  { feature: "Cache avançado", starter: false, pro: true, business: true },
  { feature: "IP dedicado", starter: false, pro: false, business: true },
  // Backup
  { feature: "Backup diário", starter: false, pro: true, business: true },
  { feature: "Retenção backup", starter: null, pro: "30 dias", business: "30 dias" },
  { feature: "Restauração 1 clique", starter: false, pro: true, business: true },
  // Suporte
  { feature: "Suporte IA 24/7", starter: true, pro: true, business: true },
  { feature: "Suporte prioritário", starter: false, pro: true, business: true },
  { feature: "SLA garantido", starter: "99.9%", pro: "99.9%", business: "99.9%" },
  // Migração
  { feature: "Migração gratuita", starter: false, pro: true, business: true },
];

const PLANS = [
  { name: "Starter", price: "R$ 19,90", color: "text-white/70", highlight: false },
  { name: "Pro", price: "R$ 49,90", color: "text-amber-400", highlight: true },
  { name: "Business", price: "R$ 99,90", color: "text-indigo-400", highlight: false },
];

function Cell({ val }: { val: Val }) {
  if (val === true) return <Check className="w-4 h-4 text-emerald-400 mx-auto" />;
  if (val === false) return <X className="w-3.5 h-3.5 text-white/20 mx-auto" />;
  if (val === null) return <Minus className="w-3.5 h-3.5 text-white/20 mx-auto" />;
  return <span className="text-xs sm:text-sm text-white/70 font-mono-data">{val}</span>;
}

export default function PlanComparison() {
  return (
    <section id="comparativo" className="py-16 lg:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-amber-400/4 blur-3xl pointer-events-none" />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-amber-400 border border-amber-400/20 bg-amber-400/5 uppercase tracking-widest mb-4">
            Comparativo
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Compare os{" "}
            <span className="gradient-text">planos</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">
            Veja exatamente o que cada plano inclui, sem letras miúdas.
          </p>
        </motion.div>

        {/* Table wrapper — horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <table className="w-full min-w-[480px]">
            <thead>
              <tr>
                <th className="text-left py-3 px-3 sm:px-4 text-white/40 text-xs sm:text-sm font-medium w-[40%]">
                  Recurso
                </th>
                {PLANS.map((p) => (
                  <th
                    key={p.name}
                    className={`text-center py-3 px-2 sm:px-4 w-[20%] ${p.highlight ? "relative" : ""}`}
                  >
                    {p.highlight && (
                      <div className="absolute top-0 left-1 right-1 h-0.5 bg-amber-400 rounded-full" />
                    )}
                    <div
                      className={`font-black text-sm sm:text-base ${p.color}`}
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {p.name}
                    </div>
                    <div className="text-white/40 text-[10px] sm:text-xs mt-0.5">{p.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-t border-white/5 ${i % 2 === 0 ? "bg-white/[0.015]" : ""}`}
                >
                  <td className="py-2.5 px-3 sm:px-4 text-white/60 text-xs sm:text-sm">{row.feature}</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center">
                    <Cell val={row.starter} />
                  </td>
                  <td className={`py-2.5 px-2 sm:px-4 text-center ${PLANS[1].highlight ? "bg-amber-400/[0.03]" : ""}`}>
                    <Cell val={row.pro} />
                  </td>
                  <td className="py-2.5 px-2 sm:px-4 text-center">
                    <Cell val={row.business} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/10">
                <td className="py-4 px-3 sm:px-4" />
                {PLANS.map((p) => (
                  <td key={p.name} className="py-4 px-2 sm:px-4 text-center">
                    <a
                      href="#planos"
                      className={`inline-block px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                        p.highlight
                          ? "shimmer text-black shadow-[0_0_16px_oklch(0.75_0.18_75/0.3)]"
                          : "border border-white/15 text-white/70 hover:border-white/30"
                      }`}
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      Contratar
                    </a>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
