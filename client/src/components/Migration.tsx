/* DevHosting — Migration
   Free migration section */

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, RefreshCw, Headphones, Clock } from "lucide-react";

const STEPS = [
  {
    icon: Headphones,
    title: "1. Abra um chamado",
    desc: "Informe seu provedor atual e as credenciais de acesso ao servidor (cPanel, FTP ou SSH).",
  },
  {
    icon: RefreshCw,
    title: "2. Nós migramos",
    desc: "Nossa equipe copia todos os arquivos, bancos de dados e e-mails para o novo servidor.",
  },
  {
    icon: Clock,
    title: "3. Validação",
    desc: "Você valida o site no novo servidor antes de apontar o DNS. Zero downtime.",
  },
  {
    icon: CheckCircle2,
    title: "4. Pronto",
    desc: "Apontamos o DNS e seu site está no ar na nova infraestrutura. Processo completo em até 24h.",
  },
];

const INCLUDED = [
  "Arquivos e pastas do site",
  "Bancos de dados MySQL/MariaDB",
  "Contas de e-mail e mensagens",
  "Configurações do cPanel",
  "Certificados SSL",
  "Registros DNS",
];

export default function Migration() {
  return (
    <section id="migracao" className="py-16 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-500/4 blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 uppercase tracking-widest mb-4">
              Migração Gratuita
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
              Traga seu site{" "}
              <span className="text-emerald-400">sem pagar nada</span>
            </h2>
            <p className="text-white/50 text-lg mb-8 leading-relaxed">
              Migramos seu site, banco de dados e e-mails do seu provedor atual para a DevHosting sem custo e sem downtime. Você só precisa abrir um chamado.
            </p>

            {/* What's included */}
            <div className="glass-card rounded-2xl border border-white/8 p-6 mb-8">
              <p className="text-white/70 text-sm font-semibold mb-4 uppercase tracking-widest">O que migramos</p>
              <div className="grid grid-cols-2 gap-2">
                {INCLUDED.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/contato"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl shimmer text-black font-bold text-sm shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)]"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Solicitar migração gratuita
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right — steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl border border-white/8 p-5 flex gap-4 hover:border-emerald-400/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-400/8 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
