/* DevHosting — SLA (Service Level Agreement) */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Sla() {
  const { lang } = useLang();

  const uptimeTable = [
    { plan: "Starter", uptime: "99.9%", maxDowntime: "8h 45min/ano", response: "4h" },
    { plan: "Pro", uptime: "99.9%", maxDowntime: "8h 45min/ano", response: "2h" },
    { plan: "Business", uptime: "99.95%", maxDowntime: "4h 22min/ano", response: "1h" },
    { plan: "VPS Starter", uptime: "99.9%", maxDowntime: "8h 45min/ano", response: "2h" },
    { plan: "VPS Pro", uptime: "99.95%", maxDowntime: "4h 22min/ano", response: "1h" },
    { plan: "VPS Ultra", uptime: "99.99%", maxDowntime: "52min/ano", response: "30min" },
  ];

  const credits = [
    { downtime: "99.0% – 99.9%", credit: "10%" },
    { downtime: "95.0% – 99.0%", credit: "25%" },
    { downtime: "< 95.0%", credit: "50%" },
  ];

  const titles: Record<string, { title: string; subtitle: string }> = {
    pt: { title: "Acordo de Nível de Serviço (SLA)", subtitle: "Nosso compromisso com a disponibilidade e qualidade dos serviços." },
    en: { title: "Service Level Agreement (SLA)", subtitle: "Our commitment to service availability and quality." },
    es: { title: "Acuerdo de Nivel de Servicio (SLA)", subtitle: "Nuestro compromiso con la disponibilidad y calidad del servicio." },
    ru: { title: "Соглашение об уровне обслуживания (SLA)", subtitle: "Наше обязательство по доступности и качеству услуг." },
  };

  const t = titles[lang] || titles.pt;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-3xl py-16">
        <Link href="/">
          <motion.div
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-white/40 hover:text-amber-400 transition-colors mb-10 cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar ao início</span>
          </motion.div>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{t.title}</h1>
        </div>
        <p className="text-white/40 mb-12">{t.subtitle}</p>

        {/* Uptime Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl border border-white/6 overflow-hidden mb-8"
        >
          <div className="p-5 border-b border-white/6">
            <h2 className="font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Garantia de Uptime por Plano</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-5 py-3 text-white/40 font-mono-data">Plano</th>
                  <th className="text-left px-5 py-3 text-white/40 font-mono-data">Uptime</th>
                  <th className="text-left px-5 py-3 text-white/40 font-mono-data">Inatividade máx.</th>
                  <th className="text-left px-5 py-3 text-white/40 font-mono-data">Resp. suporte</th>
                </tr>
              </thead>
              <tbody>
                {uptimeTable.map((row, i) => (
                  <tr key={i} className="border-b border-white/4 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3 text-white font-semibold">{row.plan}</td>
                    <td className="px-5 py-3">
                      <span className="text-emerald-400 font-mono-data font-bold">{row.uptime}</span>
                    </td>
                    <td className="px-5 py-3 text-white/50 font-mono-data">{row.maxDowntime}</td>
                    <td className="px-5 py-3 text-cyan-400 font-mono-data">{row.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl border border-white/6 overflow-hidden mb-8"
        >
          <div className="p-5 border-b border-white/6">
            <h2 className="font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Créditos por Indisponibilidade</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-5 py-3 text-white/40 font-mono-data">Uptime mensal</th>
                  <th className="text-left px-5 py-3 text-white/40 font-mono-data">Crédito</th>
                </tr>
              </thead>
              <tbody>
                {credits.map((row, i) => (
                  <tr key={i} className="border-b border-white/4">
                    <td className="px-5 py-3 text-white/60 font-mono-data">{row.downtime}</td>
                    <td className="px-5 py-3 text-amber-400 font-bold font-mono-data">{row.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Exclusions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-xl border border-white/6 p-6 mb-8"
        >
          <h2 className="font-bold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Exclusões do SLA</h2>
          <div className="flex flex-col gap-2">
            {[
              "Manutenções programadas (com aviso prévio de 24h)",
              "Ataques DDoS de escala excepcional",
              "Falhas causadas pelo próprio cliente",
              "Casos de força maior (desastres naturais, etc.)",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white/50">
                <CheckCircle className="w-4 h-4 text-white/20 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-xs text-white/30 text-center font-mono-data">
          Para solicitar créditos SLA: sla@devhosting.com.br
        </p>
      </div>
    </div>
  );
}
