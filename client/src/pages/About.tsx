/* DevHosting — Sobre Nós */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Shield, Server, Globe, Users } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function About() {
  const { lang } = useLang();

  const content = {
    pt: {
      title: "Sobre a DevHosting",
      subtitle: "Hospedagem de elite com segurança certificada pela Google.",
      story: "A DevHosting nasceu da visão de que hospedagem de qualidade não precisa ser cara ou complicada. Fundada por Italo Caetano Pires Leão, especialista certificado pela Google em Cybersecurity, a empresa combina infraestrutura dedicada de alto desempenho com práticas de segurança de nível enterprise.",
      story2: "Nossa missão é oferecer aos desenvolvedores e empresas uma plataforma de hospedagem que seja ao mesmo tempo poderosa, segura e acessível — com suporte 24/7 via IA e aceite de pagamentos em qualquer moeda, incluindo criptomoedas.",
      values: [
        { icon: <Shield className="w-5 h-5" />, title: "Segurança Primeiro", desc: "Certificação Google Cybersecurity garante práticas de segurança de nível enterprise em toda nossa infraestrutura.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
        { icon: <Server className="w-5 h-5" />, title: "Infraestrutura Própria", desc: "Não somos revenda. Operamos servidores dedicados na Hetzner e OVH com controle total sobre a stack.", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
        { icon: <Globe className="w-5 h-5" />, title: "Pagamentos Globais", desc: "Aceitamos BRL, USD, EUR e as principais criptomoedas. Sem fronteiras para nossos clientes.", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
        { icon: <Users className="w-5 h-5" />, title: "Suporte Humano + IA", desc: "Suporte técnico especializado disponível 24/7, potencializado por IA para respostas instantâneas.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
      ],
      founder: "Fundador",
      founderName: "Italo Caetano Pires Leão",
      founderDesc: "Especialista em Cybersecurity certificado pela Google (Coursera/Google, Jan/2024). Desenvolvedor full-stack com foco em infraestrutura segura e soluções de hospedagem de alta performance.",
      cert: "Google Cybersecurity Certificate",
    },
    en: {
      title: "About DevHosting",
      subtitle: "Elite hosting with Google-certified security.",
      story: "DevHosting was born from the vision that quality hosting doesn't need to be expensive or complicated. Founded by Italo Caetano Pires Leão, a Google-certified Cybersecurity specialist, the company combines high-performance dedicated infrastructure with enterprise-level security practices.",
      story2: "Our mission is to provide developers and businesses with a hosting platform that is powerful, secure and accessible — with 24/7 AI support and payment acceptance in any currency, including cryptocurrencies.",
      values: [
        { icon: <Shield className="w-5 h-5" />, title: "Security First", desc: "Google Cybersecurity certification ensures enterprise-level security practices throughout our infrastructure.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
        { icon: <Server className="w-5 h-5" />, title: "Own Infrastructure", desc: "We're not a reseller. We operate dedicated servers on Hetzner and OVH with full stack control.", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
        { icon: <Globe className="w-5 h-5" />, title: "Global Payments", desc: "We accept BRL, USD, EUR and major cryptocurrencies. No borders for our clients.", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
        { icon: <Users className="w-5 h-5" />, title: "Human + AI Support", desc: "Specialized technical support available 24/7, enhanced by AI for instant responses.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
      ],
      founder: "Founder",
      founderName: "Italo Caetano Pires Leão",
      founderDesc: "Google-certified Cybersecurity specialist (Coursera/Google, Jan/2024). Full-stack developer focused on secure infrastructure and high-performance hosting solutions.",
      cert: "Google Cybersecurity Certificate",
    },
    es: {
      title: "Sobre DevHosting",
      subtitle: "Alojamiento de élite con seguridad certificada por Google.",
      story: "DevHosting nació de la visión de que el alojamiento de calidad no tiene que ser caro ni complicado. Fundada por Italo Caetano Pires Leão, especialista certificado por Google en Ciberseguridad.",
      story2: "Nuestra misión es ofrecer a desarrolladores y empresas una plataforma de alojamiento potente, segura y accesible, con soporte 24/7 por IA y aceptación de pagos en cualquier moneda.",
      values: [
        { icon: <Shield className="w-5 h-5" />, title: "Seguridad Primero", desc: "Certificación Google Cybersecurity garantiza prácticas de seguridad de nivel enterprise.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
        { icon: <Server className="w-5 h-5" />, title: "Infraestructura Propia", desc: "No somos revendedores. Operamos servidores dedicados con control total.", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
        { icon: <Globe className="w-5 h-5" />, title: "Pagos Globales", desc: "Aceptamos BRL, USD, EUR y las principales criptomonedas.", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
        { icon: <Users className="w-5 h-5" />, title: "Soporte Humano + IA", desc: "Soporte técnico especializado disponible 24/7.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
      ],
      founder: "Fundador",
      founderName: "Italo Caetano Pires Leão",
      founderDesc: "Especialista en Ciberseguridad certificado por Google (Ene/2024). Desarrollador full-stack enfocado en infraestructura segura.",
      cert: "Google Cybersecurity Certificate",
    },
    ru: {
      title: "О DevHosting",
      subtitle: "Элитный хостинг с сертификатом безопасности Google.",
      story: "DevHosting родился из идеи, что качественный хостинг не должен быть дорогим. Основан Итало Каэтано Пирес Леао, специалистом по кибербезопасности с сертификатом Google.",
      story2: "Наша миссия — предоставить разработчикам мощную, безопасную и доступную платформу хостинга с поддержкой ИИ 24/7 и приёмом платежей в любой валюте.",
      values: [
        { icon: <Shield className="w-5 h-5" />, title: "Безопасность прежде всего", desc: "Сертификат Google Cybersecurity обеспечивает корпоративный уровень безопасности.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
        { icon: <Server className="w-5 h-5" />, title: "Собственная инфраструктура", desc: "Мы не реселлер. Мы управляем выделенными серверами с полным контролем.", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
        { icon: <Globe className="w-5 h-5" />, title: "Глобальные платежи", desc: "Принимаем BRL, USD, EUR и основные криптовалюты.", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
        { icon: <Users className="w-5 h-5" />, title: "Поддержка 24/7", desc: "Специализированная техническая поддержка, усиленная ИИ.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
      ],
      founder: "Основатель",
      founderName: "Итало Каэтано Пирес Леао",
      founderDesc: "Специалист по кибербезопасности с сертификатом Google (янв. 2024). Full-stack разработчик, специализирующийся на безопасной инфраструктуре.",
      cert: "Google Cybersecurity Certificate",
    },
  };

  const c = content[lang] || content.pt;

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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{c.title}</h1>
          <p className="text-lg text-amber-400 mb-8">{c.subtitle}</p>
          <p className="text-white/60 leading-relaxed mb-4">{c.story}</p>
          <p className="text-white/60 leading-relaxed mb-12">{c.story2}</p>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {c.values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card rounded-xl border ${v.border} ${v.bg} p-5`}
            >
              <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-3 ${v.color}`}>
                {v.icon}
              </div>
              <h3 className="font-bold text-white mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>{v.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl border border-amber-400/15 p-6 flex gap-5 items-start"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 text-2xl font-black text-black" style={{ fontFamily: 'Syne, sans-serif' }}>
            I
          </div>
          <div>
            <p className="text-xs text-amber-400 uppercase tracking-widest mb-1 font-mono-data">{c.founder}</p>
            <h3 className="font-black text-white text-lg mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{c.founderName}</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-3">{c.founderDesc}</p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-400/20 bg-emerald-400/5">
              ✓ {c.cert}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
