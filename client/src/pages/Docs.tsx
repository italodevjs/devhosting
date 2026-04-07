/* DevHosting — Documentação */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const docs = [
  {
    category: "Primeiros Passos",
    color: "text-amber-400",
    border: "border-amber-400/20",
    bg: "bg-amber-400/5",
    items: [
      { title: "Como criar sua conta", desc: "Passo a passo para criar e ativar sua conta DevHosting.", time: "2 min" },
      { title: "Apontando seu domínio", desc: "Configure DNS e aponte seu domínio para nossa infraestrutura.", time: "5 min" },
      { title: "Instalando SSL grátis", desc: "Ative o certificado SSL/TLS em 1 clique pelo painel.", time: "1 min" },
      { title: "Fazendo upload de arquivos", desc: "Use FTP, SFTP ou o gerenciador de arquivos do cPanel.", time: "3 min" },
    ],
  },
  {
    category: "Hospedagem",
    color: "text-cyan-400",
    border: "border-cyan-400/20",
    bg: "bg-cyan-400/5",
    items: [
      { title: "Painel cPanel — Visão geral", desc: "Conheça as principais funcionalidades do painel de controle.", time: "5 min" },
      { title: "Criando banco de dados MySQL", desc: "Crie e gerencie bancos de dados MySQL pelo cPanel.", time: "3 min" },
      { title: "Configurando e-mail profissional", desc: "Crie contas de e-mail com seu domínio.", time: "4 min" },
      { title: "Backup e restauração", desc: "Como fazer e restaurar backups do seu site.", time: "4 min" },
    ],
  },
  {
    category: "VPS",
    color: "text-purple-400",
    border: "border-purple-400/20",
    bg: "bg-purple-400/5",
    items: [
      { title: "Acessando via SSH", desc: "Conecte-se ao seu VPS usando SSH de forma segura.", time: "3 min" },
      { title: "Instalando NGINX / Apache", desc: "Configure um servidor web no seu VPS Linux.", time: "8 min" },
      { title: "Configurando firewall (UFW)", desc: "Proteja seu VPS com regras de firewall básicas.", time: "5 min" },
      { title: "Deploy de aplicação Node.js", desc: "Faça deploy de apps Node.js com PM2 e NGINX.", time: "10 min" },
    ],
  },
  {
    category: "Pagamentos & Faturamento",
    color: "text-emerald-400",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/5",
    items: [
      { title: "Como pagar com Pix", desc: "Instruções para pagamento via Pix instantâneo.", time: "1 min" },
      { title: "Pagamento com criptomoedas", desc: "Aceite Bitcoin, Ethereum, USDT e mais.", time: "2 min" },
      { title: "Gerenciando sua assinatura", desc: "Upgrade, downgrade e cancelamento de planos.", time: "3 min" },
      { title: "Emissão de nota fiscal", desc: "Solicite nota fiscal para pessoa jurídica.", time: "2 min" },
    ],
  },
];

export default function Docs() {
  const { lang } = useLang();

  const titles: Record<string, { title: string; subtitle: string; readTime: string }> = {
    pt: { title: "Documentação", subtitle: "Guias e tutoriais para começar a usar a DevHosting.", readTime: "leitura" },
    en: { title: "Documentation", subtitle: "Guides and tutorials to get started with DevHosting.", readTime: "read" },
    es: { title: "Documentación", subtitle: "Guías y tutoriales para comenzar con DevHosting.", readTime: "lectura" },
    ru: { title: "Документация", subtitle: "Руководства и учебные пособия для начала работы с DevHosting.", readTime: "чтение" },
  };

  const t = titles[lang] || titles.pt;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-4xl py-16">
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
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-amber-400" />
          </div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{t.title}</h1>
        </div>
        <p className="text-white/40 mb-12">{t.subtitle}</p>

        <div className="flex flex-col gap-10">
          {docs.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.08 }}
            >
              <h2 className={`text-sm font-bold uppercase tracking-widest mb-4 ${section.color}`} style={{ fontFamily: 'Syne, sans-serif' }}>
                {section.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    whileHover={{ y: -2 }}
                    className={`glass-card rounded-xl border ${section.border} ${section.bg} p-5 cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {item.title}
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-amber-400 transition-colors flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs text-white/40 mt-1.5 leading-relaxed">{item.desc}</p>
                    <p className="text-[10px] text-white/20 mt-3 font-mono-data">{item.time} {t.readTime}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 glass-card rounded-xl border border-amber-400/15 p-6 text-center">
          <p className="text-sm text-white/50 mb-2">Não encontrou o que procurava?</p>
          <a href="mailto:suporte@devhosting.com.br" className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold">
            suporte@devhosting.com.br
          </a>
        </div>
      </div>
    </div>
  );
}
