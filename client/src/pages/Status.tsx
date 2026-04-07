/* DevHosting — Status dos Servidores */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Activity, CheckCircle, AlertCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const services = [
  { name: "Hospedagem Compartilhada BR-01", status: "operational", uptime: "99.98%" },
  { name: "Hospedagem Compartilhada BR-02", status: "operational", uptime: "99.97%" },
  { name: "VPS Cluster BR-01", status: "operational", uptime: "99.99%" },
  { name: "VPS Cluster EU-01", status: "operational", uptime: "99.95%" },
  { name: "DNS Primário", status: "operational", uptime: "100%" },
  { name: "DNS Secundário", status: "operational", uptime: "100%" },
  { name: "CDN Global", status: "operational", uptime: "99.99%" },
  { name: "Painel cPanel", status: "operational", uptime: "99.96%" },
  { name: "E-mail (SMTP/IMAP)", status: "operational", uptime: "99.94%" },
  { name: "API DevHosting", status: "operational", uptime: "99.99%" },
  { name: "Certificados SSL", status: "operational", uptime: "100%" },
  { name: "Proteção DDoS", status: "operational", uptime: "100%" },
];

const uptimeHistory = [
  { month: "Jan", uptime: 99.98 },
  { month: "Fev", uptime: 99.99 },
  { month: "Mar", uptime: 99.97 },
  { month: "Abr", uptime: 99.99 },
];

export default function Status() {
  const { lang } = useLang();

  const titles: Record<string, { title: string; subtitle: string; allOk: string }> = {
    pt: { title: "Status dos Serviços", subtitle: "Monitoramento em tempo real da infraestrutura DevHosting.", allOk: "Todos os sistemas operacionais" },
    en: { title: "Service Status", subtitle: "Real-time monitoring of DevHosting infrastructure.", allOk: "All systems operational" },
    es: { title: "Estado de los Servicios", subtitle: "Monitoreo en tiempo real de la infraestructura DevHosting.", allOk: "Todos los sistemas operativos" },
    ru: { title: "Статус сервисов", subtitle: "Мониторинг инфраструктуры DevHosting в реальном времени.", allOk: "Все системы работают" },
  };

  const t = titles[lang] || titles.pt;
  const allOperational = services.every(s => s.status === "operational");

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
          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{t.title}</h1>
        </div>
        <p className="text-white/40 mb-8">{t.subtitle}</p>

        {/* Overall status banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl border p-5 mb-8 flex items-center gap-4 ${
            allOperational
              ? "bg-emerald-400/5 border-emerald-400/20"
              : "bg-amber-400/5 border-amber-400/20"
          }`}
        >
          {allOperational ? (
            <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
          )}
          <div>
            <p className={`font-bold ${allOperational ? "text-emerald-400" : "text-amber-400"}`} style={{ fontFamily: 'Syne, sans-serif' }}>
              {t.allOk}
            </p>
            <p className="text-xs text-white/30 font-mono-data mt-0.5">
              Atualizado: {new Date().toLocaleString("pt-BR")}
            </p>
          </div>
        </motion.div>

        {/* Services list */}
        <div className="glass-card rounded-xl border border-white/6 overflow-hidden mb-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between px-5 py-4 border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${service.status === "operational" ? "bg-emerald-400" : "bg-amber-400"}`} />
                <span className="text-sm text-white/70">{service.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/30 font-mono-data">{service.uptime}</span>
                <span className={`text-xs font-semibold ${service.status === "operational" ? "text-emerald-400" : "text-amber-400"}`}>
                  {service.status === "operational" ? "Operacional" : "Degradado"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Uptime history */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl border border-white/6 p-6"
        >
          <h2 className="font-bold text-white mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>Histórico de Uptime (2025)</h2>
          <div className="flex gap-4">
            {uptimeHistory.map((month, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="h-20 flex items-end justify-center mb-2">
                  <div
                    className="w-full rounded-t-lg bg-emerald-400/30 border-t border-emerald-400/50"
                    style={{ height: `${(month.uptime - 99) * 20 * 100}%`, minHeight: "8px" }}
                  />
                </div>
                <p className="text-xs text-white/40 font-mono-data">{month.month}</p>
                <p className="text-xs text-emerald-400 font-mono-data font-bold">{month.uptime}%</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
