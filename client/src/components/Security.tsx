/* DevHosting — Security Section
   Design: Obsidian Premium — Bento grid with security features
   Highlights Google Cybersecurity certification */

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Cpu, RefreshCw, AlertTriangle } from "lucide-react";

const SECURITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663504481998/2EqK77EzANN3ZXvZMJ4rig/security_section-LMxm7RSL94SUjPWveeBe98.webp";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "DDoS Protection",
    desc: "Proteção contra ataques de negação de serviço em todas as camadas de rede.",
    color: "text-amber-400",
    bg: "bg-amber-400/8",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "SSL/TLS Grátis",
    desc: "Certificados SSL automáticos via Let's Encrypt em todos os planos.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/8",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Monitoramento 24/7",
    desc: "Sistemas de detecção de intrusão (IDS) ativos continuamente.",
    color: "text-blue-400",
    bg: "bg-blue-400/8",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Firewall Avançado",
    desc: "WAF (Web Application Firewall) com regras atualizadas em tempo real.",
    color: "text-purple-400",
    bg: "bg-purple-400/8",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Backup Automático",
    desc: "Snapshots diários com retenção de 30 dias e restauração em 1 clique.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/8",
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Detecção de Malware",
    desc: "Varredura automática e isolamento de ameaças antes que causem danos.",
    color: "text-rose-400",
    bg: "bg-rose-400/8",
  },
];

export default function Security() {
  return (
    <section id="seguranca" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-400/4 blur-3xl pointer-events-none" />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 uppercase tracking-widest mb-4">
            Segurança de Elite
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Protegido por quem <span className="gradient-text">entende</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/50 max-w-xl mx-auto">
            Nossa infraestrutura é gerenciada por um especialista certificado pela Google em Cybersecurity.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Large card: Certification */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 lg:row-span-2 glass-card rounded-2xl border border-amber-400/20 overflow-hidden flex flex-col amber-glow"
          >
            <div className="relative overflow-hidden h-52 lg:h-64">
              <img
                src={SECURITY_IMG}
                alt="Segurança DevHosting"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.09_0.005_285)] via-transparent to-transparent" />
            </div>
            <div className="p-6 flex flex-col gap-4 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 w-fit">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-amber-400 font-semibold">Google Certified</span>
              </div>
              <h3 className="text-2xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Certificação Google Cybersecurity
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Nossa equipe é certificada pelo programa profissional da Google em Cybersecurity, cobrindo fundamentos de segurança, gerenciamento de riscos, redes, SIEM, IDS e automação com Python.
              </p>
              <div className="mt-auto pt-4 border-t border-white/5">
                <div className="font-mono-data text-xs text-white/30 space-y-1">
                  <div>✓ Foundations of Cybersecurity</div>
                  <div>✓ Networks and Network Security</div>
                  <div>✓ Linux, SQL & SIEM Tools</div>
                  <div>✓ Intrusion Detection Systems</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature cards */}
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl border border-white/6 p-4 sm:p-6 flex gap-4 hover:border-white/12 transition-colors"
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center ${feat.color}`}>
                {feat.icon}
              </div>
              <div>
                <h4 className="font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{feat.title}</h4>
                <p className="text-sm text-white/45 leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
